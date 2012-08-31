/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data", function () {
    "use strict";

    var Data = window.multigraph.core.Data,
        DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue,
        dataVariables,
        testData;

    beforeEach(function () {
        dataVariables = [new DataVariable("column1", 1, DataValue.NUMBER),
                         new DataVariable("column2", 2, DataValue.NUMBER),
                         new DataVariable("column3", 3, DataValue.NUMBER),
                         new DataVariable("column4", 4, DataValue.NUMBER)
                        ];

        testData = new Data(dataVariables);
    });


    describe("constructor", function () {
        it("should throw an error if the parameter is not an array of strings", function () {
            expect(function () {
                testData = new Data(["hello", "world", "hi", "planet"]);
            }).toThrow("Data: constructor parameter should be an array of DataVariable objects");
        });
    });

    describe("columnIdToColumnNumber method", function () {
        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                testData.columnIdToColumnNumber(1);
            }).toThrow("Data: columnIdToColumnNumber expects parameter to be a string");
        });

        it("should throw an error if the column id doesn't exist", function () {
            expect(function () {
                testData.columnIdToColumnNumber("column100");
            }).toThrow("Data: no column with the label column100");
        });

        it("should return the column number associated with the string id", function () {
            expect(testData.columnIdToColumnNumber("column1")).toBe(1);
        });
    });

    describe("columnIdToDataVariable method", function () {
        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                testData.columnIdToDataVariable(1);
            }).toThrow("Data: columnIdToDataVariable requires a string parameter");
        });

        it("should throw an error if the column id doesn't exist", function () {
            expect(function () {
                testData.columnIdToDataVariable("column100");
            }).toThrow("Data: no column with the label column100");
        });

        it("should return a DataValue associated with the column id", function () {
            var result = testData.columnIdToDataVariable("column2");
            expect(result instanceof DataVariable).toBe(true);
            expect(result.id()).toBe("column2");
        });
    });

    describe("getColumnId method", function () {
        it("should throw an error if the parameter is not an integer", function () {
            expect(function () {
                testData.getColumnId("hello");
            }).toThrow("Data: getColumnId method expects an integer");
        });

        it("should throw an error if the column does not exist", function () {
            expect(function () {
                testData.getColumnId(100);
            }).toThrow("Data: column 100 does not exist");
        });

        it("should return the ID associated with the column number", function () {
            expect(testData.getColumnId(3)).toBe("column3");
        });
    });

    describe("getColumns method", function () {
        var i,
            columns;

        it("should return the metadata", function () {
            columns = testData.getColumns();
            for (i = 0; i < dataVariables.length; ++i) {
                expect(columns.indexOf(dataVariables[i])).not.toBe(-1);
            }
        });
    });

    describe("getBounds method", function () {
        //no op, should be in subobject
    });

    describe("getIterator method", function () {
        //no op, should be in subobject
    });

    describe("onReady method", function () {
        xit("should throw an error if the parameter is not a function", function () {

        });
    });

});