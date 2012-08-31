window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var ArrayData = ns.ArrayData,
        DataValue = ns.DataValue;

    /*var CSVData = function (filename) {

    };*/

    var CSVData = window.jermaine.Model(function () {
        this.isA(ArrayData);
        this.hasA("filename").which.isA("string");
        this.hasA("dataIsReady").which.isA("boolean").and.defaultsTo(false);

        this.respondsTo("onReady", function (callback) {
            this.readyCallback(callback);
            if (this.dataIsReady()) {
                callback(/* to be defined */);
            }
        });

        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            if (this.dataIsReady()) {
                return ArrayData.getArrayDataIterator(this, columnIds, min, max, buffer);
            } else {
                return {
                    'next'    : function() {},
                    'hasNext' : function() { return false; }
                };
            }
        });

        this.isBuiltWith("columns", "filename", function () {
            var that = this;

            if (that.filename() !== undefined) {
                $.ajax({url:that.filename(), success:function (data) {
                    var i, j,
                        lines,
                        stringValues,
                        dataValues = [],
                        dataValuesRow;

                    //parse the data
                    var lines = data.split("\n");
                    for (i = 0; i < lines.length; ++i) {
                        stringValues = lines[i].split(",");
                        if (stringValues.length === that.columns().size()) {
                            dataValuesRow = [];
                            for (j = 0; j < stringValues.length; ++j) {
                                dataValuesRow.push(DataValue.parse(that.columns().at(j).type(), stringValues[j]));
                            }
                            dataValues.push(dataValuesRow);
                        } else {
                            // we get here if the number of comma-separated values on the current line
                            // (lines[i]) is not the same as the number of columns in the metadata.  This
                            // should probably throw an error, or something like that.  For now, though, we
                            // just ignore it.
                            //console.log('bad line: ' + lines[i]);
                        }
                    }

                    //in the callback to the request, we need to call onReady
                    that.dataIsReady(true);
                    // populate arraydata
                    if (that.readyCallback() !== undefined) {
                        that.readyCallback()();
                    }
                }});
            };
        });
    });

    ns.CSVData = CSVData;
});
