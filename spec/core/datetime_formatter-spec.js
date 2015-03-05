/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DatetimeFormatter", function () {
    "use strict";

    var DatetimeFormatter = require('../../src/core/datetime_formatter.js'),
        DatetimeValue = require('../../src/core/datetime_value.js'),
        DatetimeMeasure = require('../../src/core/datetime_measure.js');

    it("should be able to create a DatetimeFormatter", function () {
        var df = new DatetimeFormatter("%n %d, %Y");
        expect(df instanceof DatetimeFormatter).toBe(true);
    });

    it("should throw an error if the format string is not valid", function () {
        expect(function () {
            var df = new DatetimeFormatter(1.234);
        //}).toThrowError("format must be a string");
        }).toThrow();
        expect(function () {
            var df = new DatetimeFormatter("%2.3");
        //}).toThrowError("Invalid character code for datetime formatting string");
        }).toThrow();
        expect(function () {
            var df = new DatetimeFormatter();
        //}).toThrowError("format must be a string");
        }).toThrow();
    });

    it("getMaxLength method should return the correct value", function () {
        var df = new DatetimeFormatter("%N %d, %Y");
        expect(df.getMaxLength()).toBe(15);

        df = new DatetimeFormatter("%N %d%L%Y");
        expect(df.getMaxLength()).toBe(14);

        df = new DatetimeFormatter("%h:%i:%s%L%W");
        expect(df.getMaxLength()).toBe(17);

        df = new DatetimeFormatter("foo %i bar");
        expect(df.getMaxLength()).toBe(10);
    });

    describe("format method", function () {

        var doTest = function (valueString, formatString, resultString) {
            var df = new DatetimeFormatter(formatString);
            var value     = DatetimeValue.parse(valueString);

            it("should give a result of '" + resultString + "' for the input '" + valueString + "' with a format of '" + formatString + "'", function () {
                expect(df.format(value)).toBe(resultString);
            });
        };

        //     value                       format              result
        doTest("2012-08-04",               "%Y",               "2012");
        doTest("2012-08-30",               "%y",               "12");
        doTest("2012-08-04",               "%M",               "08");
        doTest("2012-08-30",               "%m",               "8");
        doTest("2012-08-04",               "%N",               "August");
        doTest("2012-08-30",               "%n",               "Aug");
        doTest("2012-08-04",               "%D",               "04");
        doTest("2012-08-04",               "%d",               "4");
        doTest("2012-08-30",               "%D",               "30");
        doTest("2012-08-30",               "%d",               "30");
        doTest("2012-08-04",               "%W",               "Saturday");
        doTest("2012-08-04",               "%w",               "Sat");
        doTest("2012-08-30",               "%W",               "Thursday");
        doTest("2012-08-30",               "%w",               "Thu");
        doTest("2012-10-01 15:23:15",      "%H",               "15");
        doTest("2012-10-01 15:23:15",      "%h",               "3");
        doTest("2012-10-01 15:23:15",      "%i",               "23");
        doTest("2012-10-01 15:23:15",      "%s",               "15");
        doTest("2012-10-01 15:23:15.498",  "%v",               "4");
        doTest("2012-10-01 15:23:15.092",  "%V",               "09");
        doTest("2012-10-01 15:23:15.101",  "%q",               "101");
        doTest("2012-10-01 15:23:15.101",  "%P",               "PM");
        doTest("2012-10-01 11:23:15.101",  "%P",               "AM");
        doTest("2012-10-01 17:23:15.101",  "%p",               "pm");
        doTest("2012-10-01 01:23:15.101",  "%p",               "am");
        doTest("2012-10-01 01:23:15.101",  "%L",               "\n");
        doTest("2012-10-01 01:23:15.101",  "%%",               "%");
        doTest("1987-10-04 15:23:15",      "%n %d, %Y",        "Oct 4, 1987");
        doTest("1987-10-01 15:23:15",      "%N %Y",            "October 1987");
        doTest("2000-03-01 15:23:15",      "%Y-%M-%D",         "2000-03-01");
        doTest("2001-10-05 15:23:15",      "%Y-%M-%D %h:%i",   "2001-10-05 3:23");

    });

});
