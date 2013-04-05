window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule core
     */

    /**
     * @class PeriodicArrayData
     * @for PeriodicArrayData
     * @constructor
     * @param {array} columns A array of DataVariables
     * @param {array} stringArray A array of strings which will later be parsed into DataValues
     */
    ns.PeriodicArrayData = window.jermaine.Model(function () {
        var PeriodicArrayData = this,
            emptyIterator = {
                "next"    : function () {},
                "hasNext" : function () { return false; }
            };

        this.isA(ns.ArrayData);
        this.hasA("period").which.validatesWith(ns.DataMeasure.isInstance);
        //this.hasA("column0RelativeRealValues").which.defaultsTo(null);
        this.isBuiltWith("columns", "stringArray", "period", function () {
            this.init();
            this.addListener("listenerAdded", function (event) {
                var data = this.array();
                if (event.targetType === "dataReady") {
                    event.listener(data[0][0], data[data.length-1][0]);
                }
            });
        });

/*
        this.respondsTo("initializeColumn0RelativeRealValues", function() {
            var array = this.array(),
                column0RelativeRealValues = [],
                i;
            for (i=0; i<array.length; ++i) {
                column0RelativeRealValues[i] = array[i][0] - array[0][0];
            }
            this.column0RelativeRealValues(column0RelativeRealValues);
        });
*/

        /**
         * @method getIterator
         * @param {string array} columnIDs
         * @param {DataValue} min
         * @param {DataValue} max
         * @param {Integer} buffer
         * @author jrfrimme
         */
        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            return PeriodicArrayData.getArrayDataIterator(this, columnIds, min, max, buffer);
        });

        /**
         * @method getArrayDataIterator
         * @static
         * @param {ArrayData} arrayData
         * @param {string array} columnIDs
         * @param {DataValue} min
         * @param {DataValue} max
         * @param {Integer} buffer
         * @return iter
         * @author jrfrimme
         */
        PeriodicArrayData.getArrayDataIterator = function (periodicArrayData, columnIds, min, max, buffer) {
            var DataValue = ns.DataValue,
                iter = {},
                arraySlice = [],
                curr = 0,
                i, j,
                currentIndex,
                columnIndices,
                array = periodicArrayData.array();

            buffer = buffer || 0;

            // columnIds argument should be an array of strings
            if (Object.prototype.toString.apply(columnIds) !== "[object Array]") {
                throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings");
            } else {
                for (i = 0; i < columnIds.length; ++i) {
                    if (typeof(columnIds[i]) !== "string") {
                        throw new Error("ArrayData: getIterator method requires that the first parameter be an array of strings");
                    }
                }
            }

            //min,max arguments should be data values
            if (!DataValue.isInstance(min) || !DataValue.isInstance(max)) {
                throw new Error("ArrayData: getIterator method requires the second and third argument to be number values");
            }

            //buffer argument should be an integer
            if (typeof(buffer) !== "number") {
                throw new Error("ArrayData: getIterator method requires last argument to be an integer");
            }

            // if we have no data, return an empty iterator
            if (array.length === 0) {
                return emptyIterator;
            }

/*
            // populate the column0RelativeRealValues array if it hasn't yet been populated
            if (this.column0RelativeRealValues() === null) {
                this.initializeColumn0RelativeRealValues();
            }
*/

            // Let `baseValue` be the location of the first data point in the array
            var baseValue = array[0][0];

            // In the regular lattice of spacing `period` aligned with baseValue,
            // find the last point that is less than or equal to `min`.  Call this point `b`.
            var b = periodicArrayData.period().lastSpacingLocationAtOrBefore(min, baseValue);

            // Let `offsetRealValue` be the difference between b and baseValue, as a real value:
            var offsetRealValue = b.getRealValue() - baseValue.getRealValue();

            // Let `baseMin` be `min` shifted 'backward' by offsetRealValue; this is `min`
            // relative to the same period cycle as baseValue:
            var baseMin = DataValue.create(min.type, min.getRealValue() - offsetRealValue);

            // find the index of the first row in the array whose column0 value is >= baseMin;
            // this is the data point we start with
            for (currentIndex = 0; currentIndex < array.length; ++currentIndex) {
                if (array[currentIndex][0].ge(baseMin)) {
                    break;
                }
            }
            if (currentIndex === array.length) {
                return emptyIterator;
            }

            //
            //TODO later: back up 'buffer' steps
            //

            // set the current value to be the column0 value at this first index, shifted
            // 'forward' by offsetRealValue
            var currentValue = DataValue.create(array[currentIndex][0].type, array[currentIndex][0].getRealValue() + offsetRealValue);

            columnIndices = [];
            for (j = 0; j < columnIds.length; ++j) {
                var k = periodicArrayData.columnIdToColumnNumber(columnIds[j]);
                columnIndices.push( k );
            }

            return {
                next : function () {
                    var projection = [],
                        i, x;
                    if (currentIndex < 0) {
                        return null;
                    }
                    for (i = 0; i < columnIndices.length; ++i) {
                        if (columnIndices[i] === 0) {
                            projection.push(currentValue);
                        } else {
                            projection.push(array[currentIndex][columnIndices[i]]);
                        }
                    }
                    ++currentIndex;
                    if (currentIndex >= array.length) {
                        currentIndex = 0;
                        b = b.add(periodicArrayData.period());
                        offsetRealValue = b.getRealValue() - baseValue.getRealValue();
                    }
                    currentValue = ns.DataValue.create(array[currentIndex][0].type, array[currentIndex][0].getRealValue() + offsetRealValue);
                    if (currentValue.gt(max)) {
                        //TODO: actually need to figure out how to move forward `buffer` steps, but for
                        // now skip that part.
                        currentIndex = -1;
                    }
                    return projection;
                },
                hasNext : function () {
                    return (currentIndex >= 0);
                }
            };
            
        };

    });
});
