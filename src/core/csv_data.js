window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var ArrayData = ns.ArrayData,
        DataValue = ns.DataValue,
        Data = ns.Data;

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
                    "next"    : function () {},
                    "hasNext" : function () { return false; }
                };
            }
        });

        this.isBuiltWith("columns", "filename", function () {
            var that = this;

            this.initializeColumns();

            if (that.filename() !== undefined) {
                $.ajax({url:that.filename(), success:function (data) {
                    var i, j,
                        lines,
                        stringValues,
                        dataValues = [],
                        dataValuesRow;

                    //parse the data
                    dataValues = ArrayData.textToDataValuesArray(that.getColumns(), data);
                    that.array(dataValues);

                    //in the callback to the request, we need to call onReady
                    that.dataIsReady(true);
                    // populate arraydata
                    if (that.readyCallback() !== undefined) {
                        that.readyCallback()();
                    }
                }});
            }
        });
    });

    ns.CSVData = CSVData;
});
