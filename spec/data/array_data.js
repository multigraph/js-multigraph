/*global describe, it, beforeEach, expect, xit, jasmine */

describe("data", function () {
    "use strict";

    var ArrayData = window.multigraph.TEMP.ArrayData,
        NumberValue = window.multigraph.NumberValue,
        testArrayData,
        numberValueData,
        rawData,
        numValueRow, numValueCol,
        row, col;

    beforeEach(function () {
        numberValueData = [];

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

        testArrayData = new ArrayData(numberValueData);
    });

    describe("constructor", function () {
        xit("should throw an error if the parameter is not an array of arrays of NumberValue objects", function () {

        });
    });


    describe("getIterator method", function () {
        var iterator0,
            iterator1,
            iterator2,
            row;

        beforeEach(function () {
            iterator0 = testArrayData.getIterator("?",new NumberValue(1903), new NumberValue(1905));
            iterator1 = testArrayData.getIterator("?",new NumberValue(1903), new NumberValue(1905), 0);
            iterator2 = testArrayData.getIterator("?",new NumberValue(1903), new NumberValue(1905), 1);
        });

        xit("should throw an error if the first parameter is not a string", function () {
 
        });

        xit("should throw an error if the second parameter is not a number value", function () {

        });

        xit("should throw an error if the third parameter is not a number value", function () {

        });

        xit("should throw an error if the last parameter is not an integer", function () {

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
    });


    describe("columnIdToColumnNumber method", function () {

    });

    describe("columnIdToDataVariable method", function () {

    });

    describe("getBounds method", function () {
        
    });

    describe("getColumnsId method", function () {
        
    });

    describe("getColumns method", function () {
        
    });



    describe("onReady method", function () {

    });
    
});