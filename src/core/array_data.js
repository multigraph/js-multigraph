window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var ArrayData,
        Data = ns.Data;

    ArrayData = window.jermaine.Model(function () {
        this.isA(Data);
        this.hasAn("array");
        this.isBuiltWith("columns", "array");

        this.respondsTo("onReady", function (callback) {
            this.readyCallback(callback);
            callback(this.array()[0][0], this.array()[this.array().length-1][0]);
        });

        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            var iter = {},
                arraySlice = [],
                curr = 0,
                i, j,
                projection,
                array = this.array();


            buffer = buffer || 0;

            //first argument should be an array of strings
            if(Object.prototype.toString.apply(columnIds) !== "[object Array]") {
                throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings");
            } else {
                for (i = 0; i < columnIds.length; ++i) {
                    if (typeof(columnIds[i]) !== "string") {
                        throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings");
                    }
                }
            }

            //second argument should be number value
            /*if (!(min instanceof NumberValue)) {
                throw new Error("ArrayData: getIterator method requires the second and third argument to be number values");
;
            }*/

            //buffer argument should be an integer
            if (typeof(buffer) !== "number") {
                throw new Error("ArrayData: getIterator method requires last argument to be an integer");
            }

            for (i = buffer; i < array.length-buffer; ++i) {
                if (array[i+buffer][0].ge(min) && array[i+buffer][0].le(max) ||
                    array[i-buffer][0].ge(min) && array[i-buffer][0].le(max)) {
                    projection = [];
                    //build the projection
                    for (j = 0;j < columnIds.length; ++j) {
                        projection.push(array[i][this.columnIdToColumnNumber(columnIds[j])]);
                    }
                    //push projected data
                    arraySlice.push(projection);
                }
            }

            iter.next = function () {
                return arraySlice[curr++];
            };

            iter.hasNext = function () {
                return curr < arraySlice.length;
            };

            return iter;
            
        });
    });

    ns.ArrayData = ArrayData;
});
