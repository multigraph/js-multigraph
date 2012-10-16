window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
        @name ArrayData
        @constructor
        @param {array} columns
    */
    ns.ArrayData = window.jermaine.Model(function () {
        var ArrayData = this;

        this.isA(ns.Data);
        this.hasAn("array");
        this.hasA("stringArray");
        this.isBuiltWith("columns", "array", function () {
            this.initializeColumns();
        });

        /**
            @method ArrayData#getIterator
            @param columnIDs
            @param min
            @param max
            @param buffer
            @return ArrayData
        */
        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            return ArrayData.getArrayDataIterator(this, columnIds, min, max, buffer);
        });

        /**
            @method ArrayData#onReady
            @param callback
        */

        this.respondsTo("onReady", function (callback) {
            this.readyCallback(callback);
            callback(this.array()[0][0], this.array()[this.array().length-1][0]);
        });


       /**
            @method ArrayData#getArrayDataIterator
            @param {string array} arrayData
            @param columnIDs
            @param min
            @param max
            @param buffer
            @throws {error} Throws error if arrayData is not an array of strings
            @return iter
       */
        ArrayData.getArrayDataIterator = function (arrayData, columnIds, min, max, buffer) {
            var iter = {},
                arraySlice = [],
                curr = 0,
                i, j,
                projection,
                firstIndex,
                lastIndex,
                currentIndex,
                columnIndices,
                array = arrayData.array();

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
            if (!ns.DataValue.isInstance(min) || !ns.DataValue.isInstance(max)) {
                throw new Error("ArrayData: getIterator method requires the second and third argument to be number values");
            }

            //buffer argument should be an integer
            if (typeof(buffer) !== "number") {
                throw new Error("ArrayData: getIterator method requires last argument to be an integer");
            }

            // if we have no data, return an empty iterator
            if (array.length === 0) {
                return {
                    "next"    : function () {},
                    "hasNext" : function () { return false; }
                };
            }

            // find the index of the first row in the array whose column0 value is >= min
            for (firstIndex=0; firstIndex<array.length; ++firstIndex) {
                if (array[firstIndex][0].ge(min)) {
                    break;
                }
            }
            // back up 'buffer' steps
            firstIndex = firstIndex - buffer;
            if (firstIndex < 0) {
                firstIndex = 0;
            }
            
            // find the index of the last row in the array whose column0 value is <= max
            if (firstIndex === array.length-1) {
                lastIndex = firstIndex;
            } else {
                for (lastIndex=firstIndex; lastIndex<array.length-1; ++lastIndex) {
                    if (array[lastIndex+1][0].gt(max)) {
                        break;
                    }
                }
            }
            // move forward 'buffer' steps
            lastIndex = lastIndex + buffer;
            if (lastIndex > array.length-1) {
                lastIndex = array.length-1;
            }

            columnIndices = [];
            for (j = 0;j < columnIds.length; ++j) {
                var k = arrayData.columnIdToColumnNumber(columnIds[j]);
                columnIndices.push( k );
            }

            currentIndex = firstIndex;
                
            return {
                next : function() {
                    var projection = [],
                        i;
                    if (currentIndex > lastIndex) {
                        return null;
                    }
                    for (i=0; i<columnIndices.length; ++i) {
                        projection.push(array[currentIndex][columnIndices[i]]);
                    }
                    ++currentIndex;
                    return projection;
                },
                hasNext : function() {
                    return currentIndex <= lastIndex;
                }
            };
            
        };

        /**
            IMPORTANT NOTE: dataVariableArray is a plain javascript array of DataVariable instances; it is NOT a jermaine attr_list.
            @method ArrayData#textToDataValuesArray
            @param dataVariableArray
            @param text
            @return {array} dataValues
            @todo If the number of comma-separated values on the current line is not the same as the number of columns in the metadata, should throw an error.
       */
        ArrayData.textToDataValuesArray = function (dataVariableArray, text) {
            //IMPORTANT NOTE: dataVariableArray is a plain javascript array of DataVariable instances; it
            //is NOT a jermaine attr_list.
            var dataValues = [],
                lines = text.split("\n"),
                i;
            for (i=0; i<lines.length; ++i) {
                if (/\d/.test(lines[i])) { // skip line unless it contains a digit
                    var stringValuesThisRow = lines[i].split(/\s*,\s*/),
                        dataValuesThisRow = [],
                        j;
                    if (stringValuesThisRow.length === dataVariableArray.length) {
                        for (j=0; j<stringValuesThisRow.length; ++j) {
                            dataValuesThisRow.push(ns.DataValue.parse(dataVariableArray[j].type(), stringValuesThisRow[j]));
                        }
                        dataValues.push( dataValuesThisRow );
                    //} else {
                        // we get here if the number of comma-separated values on the current line
                        // (lines[i]) is not the same as the number of columns in the metadata.  This
                        // should probably throw an error, or something like that.  For now, though, we
                        // just ignore it.
                        //console.log('bad line: ' + lines[i]);
                    }
                }
            }
            return dataValues;
        };

        ArrayData.textToStringArray = function (text) {
            var stringValues = [],
                lines = text.split("\n"),
                stringValuesThisRow,
                numColumns,
                i;

            for (i = 0; i < lines.length; ++i) {
                if (/\d/.test(lines[i])) { // skip line unless it contains a digit
                    numColumns = lines[i].split(/\s*,\s*/).length;
                    break;
                }
            }

            for (i = 0; i < lines.length; ++i) {
                if (/\d/.test(lines[i])) { // skip line unless it contains a digit
                    stringValuesThisRow = lines[i].split(/\s*,\s*/);
                    if (stringValuesThisRow.length === numColumns) {
                        stringValues.push( stringValuesThisRow );
                        } else {
                            throw new Error("Data Parsing: The line '" + lines[i] + "' does not contain exactly " + numColumns + " columns");
                    }
                }
            }
            return stringValues;
        };

        /**
           IMPORTANT NOTE: dataVariableArray is a plain javascript array of DataVariable instances; it is NOT a jermaine attr_list.
        */
        ArrayData.stringArrayToDataValuesArray = function (dataVariableArray, stringArray) {
            //IMPORTANT NOTE: dataVariableArray is a plain javascript array of DataVariable instances; it
            //is NOT a jermaine attr_list.
            var dataValues = [],
                dataValuesThisRow,
                i,
                j;

            for (i = 0; i < stringArray.length; ++i) {
                dataValuesThisRow = [];
                for (j = 0; j < stringArray[i].length; ++j) {
                    dataValuesThisRow.push(ns.DataValue.parse(dataVariableArray[j].type(), stringArray[i][j]));
                }
                dataValues.push( dataValuesThisRow );
            }
            return dataValues;
        };

    });
});
