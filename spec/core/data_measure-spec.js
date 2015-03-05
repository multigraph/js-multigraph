/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DataMeasure", function () {
    "use strict";

    var DataMeasure = require('../../src/core/data_measure.js'),
        DataValue = require('../../src/core/data_value.js'),
        NumberMeasure = require('../../src/core/number_measure.js'),
        DatetimeMeasure = require('../../src/core/datetime_measure.js');

    describe("DataMeasure.isInstance", function () {
        it("should return true for a NumberMeasure instance", function () {
            var x = new NumberMeasure(13.2);
            expect(DataMeasure.isInstance(x)).toBe(true);
        });
        it("should return false for a number", function () {
            var x = 13.2;
            expect(DataMeasure.isInstance(x)).toBe(false);
        });
        it("should return false for a string", function () {
            var x = "13.2";
            expect(DataMeasure.isInstance(x)).toBe(false);
        });
    });


    describe("parse() method", function () {

        it("should be able to parse '13.2' and get the correct NumberMeasure", function () {
            var x = DataMeasure.parse(require('../../src/core/data_value.js').NUMBER, "13.2");
            expect(x instanceof NumberMeasure).toBe(true);
            expect(x.getRealValue()).toEqual(13.2);
        });

        var testParse = function (string, ms) {
            it("should correctly parse the DatetimeMeasure '"+string+"'", function () {
                var m = DataMeasure.parse(DataValue.DATETIME,string);
                expect(m.getRealValue()).toEqual(ms);
            });
            it("should correctly parse the DatetimeMeasure '-"+string+"'", function () {
                var m = DataMeasure.parse(DataValue.DATETIME,"-"+string);
                expect(m.getRealValue()).toEqual(-ms);
            });
        };
        
        testParse("1ms",                  1);
        testParse("281ms",              281);
        testParse("1s",                1000);
        testParse("281s",            281000);
        testParse("0.5s",               500);
        testParse("1m",               60000);
        testParse("12m",           12*60000);
        testParse("12.3m",       12.3*60000);
        testParse("1H",             3600000);
        testParse("1.5H",       1.5*3600000);
        testParse("1D",          24*3600000);
        testParse("12.2D",  12.2*24*3600000);
        testParse("1W",        7*24*3600000);
        testParse("1.4W",  1.4*7*24*3600000);
        testParse("1M",       30*24*3600000);
        testParse("1.5M", 1.5*30*24*3600000);
        testParse("1Y",         31536000000);
        testParse("12.3Y", 12.3*31536000000);

    });



});
