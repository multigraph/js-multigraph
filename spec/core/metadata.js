/*global describe, it, beforeEach, expect, xit, jasmine */

describe("MetaData", function () {
    "use strict";

    var MetaData = window.multigraph.core.MetaData,
        DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue,
        dataVariables,
        testMetaData;

    beforeEach(function () {
        dataVariables = [new DataVariable("column1", 1, DataValue.NUMBER),
                         new DataVariable("column2", 2, DataValue.NUMBER),
                         new DataVariable("column3", 3, DataValue.NUMBER),
                         new DataVariable("column4", 4, DataValue.NUMBER)
                        ];

        testMetaData = new MetaData(dataVariables);
    });


    describe("constructor", function () {
        it("should throw an error if the parameter is not an array of strings", function () {
            expect(function () {
                testMetaData = new MetaData(["hello", "world", "hi", "planet"]);
            }).toThrow("MetaData: constructor parameter should be an array of DataVariable objects");
        });
    });

    describe("columnIdToColumnNumber method", function () {
        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                testMetaData.columnIdToColumnNumber(1);
            }).toThrow("MetaData: columnIdToColumnNumber expects parameter to be a string");
        });

        it("should throw an error if the column id doesn't exist", function () {
            expect(function () {
                testMetaData.columnIdToColumnNumber("column100");
            }).toThrow("MetaData: no column with the label column100");
        });

        it("should return the column number associated with the string id", function () {
            expect(testMetaData.columnIdToColumnNumber("column1")).toBe(1);
        });
    });

    describe("columnIdToDataVariable method", function () {
        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                testMetaData.columnIdToDataVariable(1);
            }).toThrow("MetaData: columnIdToDataVariable requires a string parameter");
        });

        it("should throw an error if the column id doesn't exist", function () {
            expect(function () {
                testMetaData.columnIdToDataVariable("column100");
            }).toThrow("MetaData: no column with the label column100");
        });

        it("should return a DataValue associated with the column id", function () {
            var result = testMetaData.columnIdToDataVariable("column2");
            expect(result instanceof DataVariable).toBe(true);
            expect(result.id()).toBe("column2");
        });
    });

    describe("getColumnId method", function () {
        it("should throw an error if the parameter is not an integer", function () {
            expect(function () {
                testMetaData.getColumnId("hello");
            }).toThrow("MetaData: getColumnId method expects an integer");
        });

        it("should throw an error if the column does not exist", function () {
            expect(function () {
                testMetaData.getColumnId(100);
            }).toThrow("MetaData: column 100 does not exist");
        });

        it("should return the ID associated with the column number", function () {
            expect(testMetaData.getColumnId(3)).toBe("column3");
        });
    });

    describe("getColumns method", function () {
        var i,
            columns;

        it("should return the metadata", function () {
            columns = testMetaData.getColumns();
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