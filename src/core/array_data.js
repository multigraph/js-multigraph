window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var ArrayData,
        Data = ns.Data,
        DataValue = ns.DataValue;

    var textToDataValuesArray = function (dataVariableArray, text) {
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
                        dataValuesThisRow.push(DataValue.parse(dataVariableArray[j].type(), stringValuesThisRow[j]));
                    }
                    dataValues.push( dataValuesThisRow );
                } else {
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

    var getArrayDataIterator = function (arrayData, columnIds, min, max, buffer) {
        var iter = {},
            arraySlice = [],
            curr = 0,
            i, j,
            projection,
            array = arrayData.array();

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
                    projection.push(array[i][arrayData.columnIdToColumnNumber(columnIds[j])]);
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


    ArrayData = window.jermaine.Model(function () {
        this.isA(Data);
        this.hasAn("array");
        this.isBuiltWith("columns", "array", function() {
            Data.initializeColumns(this);
        });

        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            return getArrayDataIterator(this, columnIds, min, max, buffer);
        });

        this.respondsTo("onReady", function (callback) {
            this.readyCallback(callback);
            callback(this.array()[0][0], this.array()[this.array().length-1][0]);
        });

    });

    ArrayData.getArrayDataIterator = getArrayDataIterator;
    ArrayData.textToDataValuesArray = textToDataValuesArray;

    ns.ArrayData = ArrayData;
});
