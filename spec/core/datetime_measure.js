/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DatetimeMeasure", function () {
    "use strict";

    var DatetimeMeasure = window.multigraph.core.DatetimeMeasure,
    DatetimeValue = window.multigraph.core.DatetimeValue;

    describe("time unit constants", function () {

        it("SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, and YEAR should be distinct enum-style constants", function () {
            expect(DatetimeMeasure.MILLISECOND).not.toBeUndefined();
            expect(DatetimeMeasure.SECOND).not.toBeUndefined();
            expect(DatetimeMeasure.MINUTE).not.toBeUndefined();
            expect(DatetimeMeasure.HOUR).not.toBeUndefined();
            expect(DatetimeMeasure.DAY).not.toBeUndefined();
            expect(DatetimeMeasure.WEEK).not.toBeUndefined();
            expect(DatetimeMeasure.MONTH).not.toBeUndefined();
            expect(DatetimeMeasure.YEAR).not.toBeUndefined();

            expect(DatetimeMeasure.MILLISECOND).not.toEqual(DatetimeMeasure.SECOND);
            expect(DatetimeMeasure.MILLISECOND).not.toEqual(DatetimeMeasure.MINUTE);
            expect(DatetimeMeasure.MILLISECOND).not.toEqual(DatetimeMeasure.HOUR);
            expect(DatetimeMeasure.MILLISECOND).not.toEqual(DatetimeMeasure.DAY);
            expect(DatetimeMeasure.MILLISECOND).not.toEqual(DatetimeMeasure.WEEK);
            expect(DatetimeMeasure.MILLISECOND).not.toEqual(DatetimeMeasure.MONTH);
            expect(DatetimeMeasure.MILLISECOND).not.toEqual(DatetimeMeasure.YEAR);

            expect(DatetimeMeasure.SECOND).not.toEqual(DatetimeMeasure.MINUTE);
            expect(DatetimeMeasure.SECOND).not.toEqual(DatetimeMeasure.HOUR);
            expect(DatetimeMeasure.SECOND).not.toEqual(DatetimeMeasure.DAY);
            expect(DatetimeMeasure.SECOND).not.toEqual(DatetimeMeasure.WEEK);
            expect(DatetimeMeasure.SECOND).not.toEqual(DatetimeMeasure.MONTH);
            expect(DatetimeMeasure.SECOND).not.toEqual(DatetimeMeasure.YEAR);

            expect(DatetimeMeasure.MINUTE).not.toEqual(DatetimeMeasure.HOUR);
            expect(DatetimeMeasure.MINUTE).not.toEqual(DatetimeMeasure.DAY);
            expect(DatetimeMeasure.MINUTE).not.toEqual(DatetimeMeasure.WEEK);
            expect(DatetimeMeasure.MINUTE).not.toEqual(DatetimeMeasure.MONTH);
            expect(DatetimeMeasure.MINUTE).not.toEqual(DatetimeMeasure.YEAR);

            expect(DatetimeMeasure.HOUR).not.toEqual(DatetimeMeasure.DAY);
            expect(DatetimeMeasure.HOUR).not.toEqual(DatetimeMeasure.WEEK);
            expect(DatetimeMeasure.HOUR).not.toEqual(DatetimeMeasure.MONTH);
            expect(DatetimeMeasure.HOUR).not.toEqual(DatetimeMeasure.YEAR);

            expect(DatetimeMeasure.DAY).not.toEqual(DatetimeMeasure.WEEK);
            expect(DatetimeMeasure.DAY).not.toEqual(DatetimeMeasure.MONTH);
            expect(DatetimeMeasure.DAY).not.toEqual(DatetimeMeasure.YEAR);

            expect(DatetimeMeasure.WEEK).not.toEqual(DatetimeMeasure.MONTH);
            expect(DatetimeMeasure.WEEK).not.toEqual(DatetimeMeasure.YEAR);

            expect(DatetimeMeasure.MONTH).not.toEqual(DatetimeMeasure.YEAR);
        });

        it("isUnit() function should return true for time unit constants, false for anything else", function () {
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.MILLISECOND)).toBe(true);
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.SECOND)).toBe(true);
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.MINUTE)).toBe(true);
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.HOUR)).toBe(true);
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.DAY)).toBe(true);
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.WEEK)).toBe(true);
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.MONTH)).toBe(true);
            expect(DatetimeMeasure.isUnit(DatetimeMeasure.YEAR)).toBe(true);
            expect(DatetimeMeasure.isUnit("fred")).toBe(false);
            expect(DatetimeMeasure.isUnit("alice")).toBe(false);
            expect(DatetimeMeasure.isUnit(0)).toBe(false);
            expect(DatetimeMeasure.isUnit(1)).toBe(false);
            expect(DatetimeMeasure.isUnit(3.14159)).toBe(false);
            expect(DatetimeMeasure.isUnit({})).toBe(false);
        });

    });

    describe("constructor", function () {

        it("should be able to create a DatetimeMeasure", function () {
            var m = new DatetimeMeasure(2, DatetimeMeasure.DAY);
            expect(m instanceof DatetimeMeasure).toBe(true);
        });

        it("constructor should throw an error if first argument is not a number", function () {
            expect(function () {
                new DatetimeMeasure("foo", DatetimeMeasure.DAY);
            }).toThrow("Improper input for Datetime Measure's constructor");
            expect(function () {
                new DatetimeMeasure({}, DatetimeMeasure.DAY);
            }).toThrow("Improper input for Datetime Measure's constructor");
        });

        it("constructor should throw an error if second argument is not a time unit", function () {
            expect(function () {
                new DatetimeMeasure(2, "foo");
            }).toThrow("Improper input for Datetime Measure's constructor");
            expect(function () {
                new DatetimeMeasure(2, {});
            }).toThrow("Improper input for Datetime Measure's constructor");
            expect(function () {
                new DatetimeMeasure(2);
            }).toThrow("Improper input for Datetime Measure's constructor");
        });

        it("constructor should throw an error if not called with two arguments", function () {
            expect(function () {
                new DatetimeMeasure(2);
            }).toThrow("Improper input for Datetime Measure's constructor");
            expect(function () {
                new DatetimeMeasure(2, DatetimeMeasure.DAY, 3);
            }).toThrow("Datetime Measure's contructor requires exactly two arguments");
            expect(function () {
                new DatetimeMeasure(2, DatetimeMeasure.DAY, 3, 4);
            }).toThrow("Datetime Measure's contructor requires exactly two arguments");
        });

    });

    describe("getRealValue() method", function () {

        it("should exist", function () {
            expect(typeof((new DatetimeMeasure(1,DatetimeMeasure.MILLISECOND)).getRealValue)).toEqual("function");
        });

        describe("should return the correct number of milliseconds ...", function () {
            it("... in one millisecond", function () {
                expect((new DatetimeMeasure(1,DatetimeMeasure.MILLISECOND)).getRealValue()).toEqual(1);
            });
            it("... in one second", function () {
                expect((new DatetimeMeasure(1,DatetimeMeasure.SECOND)).getRealValue()).toEqual(1000);
            });
            it("... in one minute", function () {
                expect((new DatetimeMeasure(1,DatetimeMeasure.MINUTE)).getRealValue()).toEqual(60000);
            });
            it("... in one hour", function () {
                expect((new DatetimeMeasure(1,DatetimeMeasure.HOUR)).getRealValue()).toEqual(3600000);
            });
            it("... in one day", function () {
                expect((new DatetimeMeasure(1,DatetimeMeasure.DAY)).getRealValue()).toEqual(86400000);
            });
            it("... in one week", function () {
                expect((new DatetimeMeasure(1,DatetimeMeasure.WEEK)).getRealValue()).toEqual(604800000);
            });
            it("... in one month", function () {
                //NOTE: DatetimeMeasure should assume, for getRealValue() purposes, that one month
                //      always exactly equals 30 days
                expect((new DatetimeMeasure(1,DatetimeMeasure.MONTH)).getRealValue()).toEqual(2592000000);
            });
            it("... in one year", function () {
                //NOTE: DatetimeMeasure should assume, for getRealValue() purposes, that one year
                //      always exactly equals 365 days
                expect((new DatetimeMeasure(1,DatetimeMeasure.YEAR)).getRealValue()).toEqual(31536000000);
            });
        });

    });
    
    describe("parse() method", function () {
        
        it("should exist", function () {
            expect(typeof(DatetimeMeasure.parse)).toEqual("function");
        });
        it("should return a DatetimeMeasure instance", function () {
            expect(DatetimeMeasure.parse("1D") instanceof DatetimeMeasure).toBe(true);
        });
        
        var testParse = function (string, ms) {
            it("should correctly parse '"+string+"'", function () {
                var m = DatetimeMeasure.parse(string);
                expect(m.getRealValue()).toEqual(ms);
            });
            it("should correctly parse '-"+string+"'", function () {
                var m = DatetimeMeasure.parse("-"+string);
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


    describe("firstSpacingLocationAtOrAfter() method", function () {

        var doTest = function (alignmentString, spacingString, valueString, resultString) {
            var value     = DatetimeValue.parse(valueString);
            var spacing   = DatetimeMeasure.parse(spacingString);
            var alignment = DatetimeValue.parse(alignmentString);
            var result    = DatetimeValue.parse(resultString);

            it("should give a result of '" + resultString + "' for the input '" + valueString + "' with an alignment of '" + alignmentString + "' and a spacing of '" + spacingString + "'", function () {
                expect(spacing.firstSpacingLocationAtOrAfter(value, alignment).eq(result)).toBe(true);
            });
        };

        //     alignment               spacing   value                        result
        doTest("2012-01-01 00:00:00",  "1s",     "2012-08-04 12:23:32",       "2012-08-04 12:23:32");
        doTest("2012-01-01 00:00:00",  "1s",     "2012-08-04 12:23:32.123",   "2012-08-04 12:23:33");

        doTest("2012-01-01 00:00:00",  "1m",     "2012-08-04 12:23:32",       "2012-08-04 12:24:00");

        doTest("2012-01-01 00:00:00",  "1H",     "2012-08-04 12:23:32",       "2012-08-04 13:00:00");
        doTest("2012-01-01 00:00:00",  "1H",     "1940-01-01 12:23:32",       "1940-01-01 13:00:00");
        doTest("2012-01-01 05:20:00",  "1H",     "2000-08-04 12:23:32",       "2000-08-04 13:20:00");

        doTest("2012-01-01 00:00:00",  "1D",     "2012-08-04 12:23:32",       "2012-08-05 00:00:00");

        doTest("2012-08-01",           "1W",     "2012-08-04",                "2012-08-08");
        doTest("2012-08-01",           "1W",     "2012-08-30",                "2012-09-05");

        doTest("2012-01-01 00:00:00",  "1M",     "2012-01-01 00:00:00.123",   "2012-02-01 00:00:00");
        doTest("2010-12-05 00:00:00",  "1M",     "2010-12-05 00:00:01.132",   "2011-01-05 00:00:00");
        doTest("2012-03-10 12:00:10",  "1M",     "2012-03-10 12:59:02.123",   "2012-04-10 12:00:10");
        doTest("2000-07-21 03:30:10",  "1M",     "2000-07-21 04:57:02",       "2000-08-21 03:30:10");
        doTest("2012-08-01",           "1M",     "2012-08-04",                "2012-09-01");
        doTest("2012-08-01",           "1M",     "2012-09-04",                "2012-10-01");
        doTest("2012-08-01 10:23:14",  "1M",     "2012-09-04",                "2012-10-01 10:23:14");
        doTest("2012-08-01 10:23:14",  "1M",     "2012-10-01 10:23:15",       "2012-11-01 10:23:14");
        doTest("2012-03-31",           "1M",     "2012-09-04",                "2012-10-01");
        doTest("2012-03-31",           "1M",     "2012-10-04",                "2012-10-31");
        doTest("2012-08-01",           "3M",     "2012-09-04",                "2012-11-01");
        doTest("2012-08-01",           "18M",    "2012-09-04",                "2014-02-01");
        doTest("2012-02-29",           "1M",     "2012-10-16",                "2012-10-29");
        doTest("2012-01-01 00:00:00",  "1M",     "2000-05-07 00:00:00.123",   "2000-06-01 00:00:00");
        doTest("2012-01-01 00:00:00",  "1M",     "2000-05-01 00:00:00",       "2000-05-01 00:00:00");
        doTest("2012-01-01 00:00:00",  "1M",     "1920-05-01 00:10:00",       "1920-06-01 00:00:00");

        doTest("2012-01-01 00:00:00",  "1Y",     "2012-01-01 00:00:00.123",   "2013-01-01 00:00:00");
        doTest("2010-12-05 00:00:00",  "1Y",     "2010-12-05 00:00:01.132",   "2011-12-05 00:00:00");
        doTest("2012-03-10 12:00:10",  "1Y",     "2012-03-10 12:59:02.123",   "2013-03-10 12:00:10");
        doTest("2000-07-21 03:30:10",  "1Y",     "2000-07-21 04:57:02",       "2001-07-21 03:30:10");
        doTest("2012-08-01",           "1Y",     "2014-10-16",                "2015-08-01");
        doTest("2000-05-31",           "1Y",     "2012-10-16",                "2013-05-31");
        doTest("1992-02-29",           "1Y",     "1992-10-16",                "1993-03-01");
        doTest("2012-02-29",           "4Y",     "2012-10-16",                "2016-02-29");
        doTest("2000-07-21 03:30:10",  "1Y",     "1990-08-22 04:57:52.342",   "1991-07-21 03:30:10");

        //TODO: write a lot more tests for this!!!
    });

    describe("toString() method", function () {

        var doTest = function (spacingString, resultString) {
            var spacing   = DatetimeMeasure.parse(spacingString);

            it("should give a result of '" + resultString + "' for the serialization of a datameasure with a value of '" + spacingString + "'", function () {
                expect(spacing.toString()).toEqual(resultString);
            });
        };

        doTest("1s",   "1s");
        doTest("5s",   "5s");
        doTest("1m",   "1m");
        doTest("3m",   "3m");
        doTest("1H",   "1H");
        doTest("10H",  "10H");
        doTest("1D",   "1D");
        doTest("4D",   "4D");
        doTest("9D",   "9D");
        doTest("1W",   "1W");
        doTest("33W",  "33W");
        doTest("1M",   "1M");
        doTest("3M",   "3M");
        doTest("18M",  "18M");
        doTest("1Y",   "1Y");
        doTest("4Y",   "4Y");
    });  

});
