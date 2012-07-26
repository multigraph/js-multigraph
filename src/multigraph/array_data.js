if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.TEMP) {
    window.multigraph.TEMP = {};
}

(function (ns) {
    "use strict";

    var Data = window.multigraph.TEMP.Data,
        ArrayData;

    ArrayData = function (m, d) {

        var that = this,
            actualData = d,
            metaData = new Data(m),
            prop, 
            delegate;

        delegate = function (obj, func) {
            return function () { return obj[func].apply(that, arguments); };
        };

        for (prop in metaData) {
            if (metaData.hasOwnProperty(prop)) {
                this[prop] = delegate(metaData, prop);
            }
        }

        this.getIterator = function (columnIds, min, max, buffer) {
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

            for (i = buffer; i < actualData.length-buffer; ++i) {
                if (actualData[i+buffer][0].ge(min) && actualData[i+buffer][0].le(max) ||
                    actualData[i-buffer][0].ge(min) && actualData[i-buffer][0].le(max)) {
                    projection = [];
                    //build the projection
                    for (j = 0;j < columnIds.length; ++j) {
                        projection.push(actualData[i][this.columnIdToColumnNumber(columnIds[j])]);
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
            
        };
    };


    ns.ArrayData = ArrayData;
}(window.multigraph.TEMP));