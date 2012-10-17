/*global describe, it, beforeEach, expect, xit, jasmine */

describe("ArrayData", function () {
    "use strict";

    var ArrayData = window.multigraph.core.ArrayData,
        NumberValue = window.multigraph.core.NumberValue,
        DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue,
        testArrayData,
        numberValueData,
        rawData,
        dataVariables,
        numValueRow, numValueCol,
        row, col;

    beforeEach(function () {
        numberValueData = [];

        dataVariables = [new DataVariable("column1", 0, DataValue.NUMBER),
                         new DataVariable("column2", 1, DataValue.NUMBER),
                         new DataVariable("column3", 2, DataValue.NUMBER),
                         new DataVariable("column4", 3, DataValue.NUMBER)
                        ];

        rawData = [[1900,-0.710738,-0.501011,-0.291284],
                   [1901,-0.709837,-0.488806,-0.267776],
                   [1902,-0.738885,-0.505620,-0.272355],
                   [1903,-0.822017,-0.591622,-0.361227],
                   [1904,-0.828376,-0.562089,-0.295802],
                   [1905,-0.748973,-0.544255,-0.339537],
                   [1906,-0.670167,-0.523723,-0.377279],
                   [1907,-0.717963,-0.510749,-0.303535],
                   [1908,-0.757014,-0.477469,-0.197924]];


        for (row = 0; row < rawData.length; ++row) {
            numValueRow = [];
            for (col = 0; col < rawData[row].length; ++col) {
                numValueRow.push(new NumberValue(rawData[row][col]));
            }
            numberValueData.push(numValueRow);
        }

        testArrayData = new ArrayData(dataVariables, numberValueData);
        testArrayData.array(numberValueData);
    });

    describe("constructor", function () {
        xit("should throw an error if the first parameter is not a list of DataVariable objects", function () {

        });

        xit("should throw an error if the second parameter is not an array of arrays of NumberValue objects", function () {

        });
    });


    describe("getIterator method", function () {
        var iterator0,
            iterator1,
            iterator2,
            row;

        beforeEach(function () {
            iterator0 = testArrayData.getIterator(['column1', 'column2', 'column3', 'column4'],new NumberValue(1903), new NumberValue(1905));
            iterator1 = testArrayData.getIterator(['column1', 'column2', 'column3', 'column4'],new NumberValue(1903), new NumberValue(1905), 0);
            iterator2 = testArrayData.getIterator(['column1', 'column2', 'column3', 'column4'],new NumberValue(1903), new NumberValue(1905), 1);
        });

        it("should throw an error if the first parameter is not a string", function () {
            expect(function () {
                iterator0 = testArrayData.getIterator("?",new NumberValue(1903), new NumberValue(1905));
            }).toThrow("ArrayData: getIterator method requires that the first parameter be an array of strings");
        });


        /***** CANNOT WRITE THESE TWO TESTS UNTIL DEPENDENCIES GET RESOLVED *******/
        xit("should throw an error if the second parameter is not a number value", function () {
            expect(function () {
                iterator0 = testArrayData.getIterator(['column1','column2','column3','column4'], 1903, new NumberValue(1905));
            }).toThrow("ArrayData: getIterator method requires the second and third argument to be number values");
        });

        xit("should throw an error if the third parameter is not a number value", function () {

        });
        /***** CANNOT WRITE THESE TWO TESTS UNTIL DEPENDENCIES GET RESOLVED *******/

        it("should throw an error if the last parameter is not an integer", function () {
            expect(function () {
                iterator1 = testArrayData.getIterator(['column1', 'column2', 'column3', 'column4'],new NumberValue(1903), new NumberValue(1905), "hello");
            }).toThrow("ArrayData: getIterator method requires last argument to be an integer");
        });


        it("should return an Data.Iterator object", function () {
            expect(iterator1.next).not.toBeUndefined();
            expect(typeof(iterator1.next)).toBe("function");
            expect(iterator1.hasNext).not.toBeUndefined();
            expect(typeof(iterator1.hasNext)).toBe("function");            
        });

        it("should return data in the specified range when buffer is non-existent", function () {
            expect(iterator0.hasNext()).toBe(true);
            row = iterator0.next();
            expect(row[0] instanceof NumberValue).toBe(true);
            expect(row[0].getRealValue()).toBe(1903);
            expect(iterator0.hasNext()).toBe(true);
            row = iterator0.next();
            expect(row[0].getRealValue()).toBe(1904);
            expect(iterator0.hasNext()).toBe(true);
            row = iterator0.next();
            expect(row[0].getRealValue()).toBe(1905);
            expect(iterator0.hasNext()).toBe(false);
        });

        it("should return data in the specified range when buffer 0", function () {
            expect(iterator1.hasNext()).toBe(true);
            row = iterator1.next();
            expect(row[0] instanceof NumberValue).toBe(true);
            expect(row[0].getRealValue()).toBe(1903);
            expect(iterator1.hasNext()).toBe(true);
            row = iterator1.next();
            expect(row[0].getRealValue()).toBe(1904);
            expect(iterator1.hasNext()).toBe(true);
            row = iterator1.next();
            expect(row[0].getRealValue()).toBe(1905);
            expect(iterator1.hasNext()).toBe(false);
        });

        it("should return data in the specified range when buffer is non-zero", function () {
            expect(iterator2.hasNext()).toBe(true);
            row = iterator2.next();
            expect(row[0] instanceof NumberValue).toBe(true);
            expect(row[0].getRealValue()).toBe(1902);
            expect(iterator2.hasNext()).toBe(true);
            row = iterator2.next();
            expect(row[0].getRealValue()).toBe(1903);
            expect(iterator2.hasNext()).toBe(true);
            row = iterator2.next();
            expect(row[0].getRealValue()).toBe(1904);
            expect(iterator2.hasNext()).toBe(true);
            row = iterator2.next();
            expect(row[0].getRealValue()).toBe(1905);
            expect(iterator2.hasNext()).toBe(true);
            row = iterator2.next();
            expect(row[0].getRealValue()).toBe(1906);
            expect(iterator2.hasNext()).toBe(false);
       });

        it("should project onto the specified column values", function () {
            iterator1 = testArrayData.getIterator(['column1', 'column4'],new NumberValue(1903), new NumberValue(1905));
            expect(iterator1.hasNext()).toBe(true);
            row = iterator1.next();
            expect(row.length).toBe(2);
        });


    });

    describe("columnIdToColumnNumber method", function () {
        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                testArrayData.columnIdToColumnNumber(1);
            }).toThrow("Data: columnIdToColumnNumber expects parameter to be a string");
        });

        it("should throw an error if the column id doesn't exist", function () {
            expect(function () {
                testArrayData.columnIdToColumnNumber("column100");
            }).toThrow("Data: no column with the label column100");
        });

        it("should return the column number associated with the string id", function () {
            expect(testArrayData.columnIdToColumnNumber("column1")).toBe(0);
        });
    });

    describe("columnIdToDataVariable method", function () {
        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                testArrayData.columnIdToDataVariable(1);
            }).toThrow("Data: columnIdToDataVariable requires a string parameter");
        });

        it("should throw an error if the column id doesn't exist", function () {
            expect(function () {
                testArrayData.columnIdToDataVariable("column100");
            }).toThrow("Data: no column with the label column100");
        });

        it("should return a DataValue associated with the column id", function () {
            var result = testArrayData.columnIdToDataVariable("column2");
            expect(result instanceof DataVariable).toBe(true);
            expect(result.id()).toBe("column2");
        });
    });

    describe("getColumnId method", function () {
        it("should throw an error if the parameter is not an integer", function () {
            expect(function () {
                testArrayData.getColumnId("hello");
            }).toThrow("Data: getColumnId method expects an integer");
        });

        it("should throw an error if the column does not exist", function () {
            expect(function () {
                testArrayData.getColumnId(100);
            }).toThrow("Data: column 100 does not exist");
        });

        it("should return the ID associated with the column number", function () {
            expect(testArrayData.getColumnId(3)).toBe("column4");
        });
    });

    describe("getColumns method", function () {
        var i,
            columns;

        it("should return the metadata", function () {
            columns = testArrayData.getColumns();
            for (i = 0; i < dataVariables.length; ++i) {
                expect(columns.indexOf(dataVariables[i])).not.toBe(-1);
            }
        });
    });


    describe("onReady method", function () {
        var callback;

        beforeEach(function () {
            callback = jasmine.createSpy();
            numberValueData = [];

            dataVariables = [new DataVariable("column1", 0, DataValue.NUMBER),
                             new DataVariable("column2", 1, DataValue.NUMBER),
                             new DataVariable("column3", 2, DataValue.NUMBER),
                             new DataVariable("column4", 3, DataValue.NUMBER)
                            ];

            rawData = [[1900,-0.710738,-0.501011,-0.291284],
                       [1901,-0.709837,-0.488806,-0.267776],
                       [1902,-0.738885,-0.505620,-0.272355],
                       [1903,-0.822017,-0.591622,-0.361227],
                       [1904,-0.828376,-0.562089,-0.295802],
                       [1905,-0.748973,-0.544255,-0.339537],
                       [1906,-0.670167,-0.523723,-0.377279],
                       [1907,-0.717963,-0.510749,-0.303535],
                       [1908,-0.757014,-0.477469,-0.197924]];


            for (row = 0; row < rawData.length; ++row) {
                numValueRow = [];
                for (col = 0; col < rawData[row].length; ++col) {
                    numValueRow.push(new NumberValue(rawData[row][col]));
                }
                numberValueData.push(numValueRow);
            }
            
            testArrayData = new ArrayData(dataVariables, numberValueData);
            testArrayData.array(numberValueData);
            testArrayData.onReady(callback);            
        });

        it("should set the readyCallback", function () {
            expect(testArrayData.readyCallback()).toBe(callback);
        });

        it("should call the callback", function () {
            expect(callback).toHaveBeenCalled();
        });
        
        it("should call the callback with the correct arguments", function () {
            expect(callback).toHaveBeenCalledWith(numberValueData[0][0], numberValueData[numberValueData.length-1][0]);
        });
    });
});
