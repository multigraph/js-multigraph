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

        this.isBuiltWith("columns", "filename", function () {
            var that = this;

            if (that.filename() !== undefined) {
                $.ajax({url:that.filename(), success:function (data) {
                    var i, j,
                        lines,
                        stringValues,
                        dataValues = [];

                    //parse the data
                    var lines = data.split("\n");
                    for (i = 0; i < lines.length; ++i) {
                        stringValues = lines[i].split(",");
                        dataValues[i] = [];
                        for (j = 0; j < stringValues.length; ++j) {
                            //dataValues[i].push(DataValue.parse(that.columns().at(j).type(), stringValues[j]));
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
