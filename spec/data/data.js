/*global describe, it, beforeEach, expect, xit, jasmine */

describe("data", function () {
    "use strict";

    var Data = window.multigraph.TEMP.Data,
        testData;

    beforeEach(function () {
        testData = new Data(["column1", "column2", "column3", "column4"]);
    });


    describe("constructor", function () {
        xit("should throw an error if the parameter is not an array of strings", function () {
            
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
            expect(testData.columnIdToColumnNumber("column1")).toBe(0);
        });
    });

    describe("columnIdToDataVariable method", function () {
        xit("should throw an error if the parameter is not a string", function () {

        });

        xit("should return a data value associated with the column id", function () {

        });
    });

    describe("getBounds method", function () {
        
    });

    describe("getColumnsId method", function () {

    });

    describe("getColumns method", function () {

    });

    describe("getIterator method", function () {

    });

    describe("onReady method", function () {

    });

});