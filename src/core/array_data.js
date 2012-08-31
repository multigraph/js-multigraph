window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var ArrayData,
        Data = ns.Data;


    ArrayData = window.jermaine.Model(function () {
        this.isA(Data);
        this.hasAn("array");
        this.isBuiltWith("columns", "array");

        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            var iter = {},
                arraySlice = [],
                curr = 0,
                i, j,
                projection;


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

            for (i = buffer; i < this.array().length-buffer; ++i) {
                if (this.array()[i+buffer][0].ge(min) && this.array()[i+buffer][0].le(max) ||
                    this.array()[i-buffer][0].ge(min) && this.array()[i-buffer][0].le(max)) {
                    projection = [];
                    //build the projection
                    for (j = 0;j < columnIds.length; ++j) {
                        projection.push(this.array()[i][this.columnIdToColumnNumber(columnIds[j])]);
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
