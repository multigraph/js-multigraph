if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.TEMP) {
    window.multigraph.TEMP = {};
}

(function (ns) {
    "use strict";

    var ArrayData = function (d) {
        var actualData = d;


        this.getIterator = function (columnIds, min, max, buffer) {
            var iter = {},
                arraySlice = [],
                curr = 0,
                i;

            buffer = buffer || 0;

            for (i = buffer; i < actualData.length-buffer; ++i) {
                if (actualData[i+buffer][0].ge(min) && actualData[i+buffer][0].le(max) ||
                    actualData[i-buffer][0].ge(min) && actualData[i-buffer][0].le(max)) {
                    //build the projection
                    //push projected data
                    arraySlice.push(actualData[i]);
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