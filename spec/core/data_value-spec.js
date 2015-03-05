/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DataValue", function () {
    "use strict";

    var DataValue = require('../../src/core/data_value.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DatetimeValue = require('../../src/core/datetime_value.js');


    it("should have a DataValue.NUMBER attribute", function () {
        expect(DataValue.NUMBER).not.toBeUndefined();
    });

    it("should have a DataValue.DATETIME attribute", function () {
        expect(DataValue.DATETIME).not.toBeUndefined();
    });

    it("DataValue.DATETIME attribute should not equal DataValue.NUMBER attribute", function () {
        expect(DataValue.DATETIME).not.toEqual(DataValue.NUMBER);
    });

    describe("create method", function () {
        it("should be able to create a NumberValue", function () {
            var x = DataValue.create(DataValue.NUMBER, 1.234);
            expect(x instanceof NumberValue).toBe(true);
            expect(x.getRealValue()).toEqual(1.234);
        });
        it("should be able to create a DatetimeValue", function () {
            var x = DataValue.create(DataValue.DATETIME, 1923432);
            expect(x instanceof DatetimeValue).toBe(true);
            expect(x.getRealValue()).toEqual(1923432);
        });
    });


    describe("DataValue.isInstance", function () {
        it("should return true for a NumberValue instance", function () {
            var x = new NumberValue(13.2);
            expect(DataValue.isInstance(x)).toBe(true);
        });
        it("should return true for a DatetimeValue instance", function () {
            var x = new DatetimeValue(121341433);
            expect(DataValue.isInstance(x)).toBe(true);
        });
        it("should return false for a number", function () {
            var x = 13.2;
            expect(DataValue.isInstance(x)).toBe(false);
        });
        it("should return false for a string", function () {
            var x = "13.2";
            expect(DataValue.isInstance(x)).toBe(false);
        });
    });

    describe("parse method", function () {
        it("should be able to parse '13.2' and get the correct NumberValue", function () {
            var x = DataValue.parse(DataValue.NUMBER, "13.2");
            expect(x instanceof NumberValue).toBe(true);
            expect(x.getRealValue()).toEqual(13.2);
        });

        var datetimeParseTest = function (originalDatetimeInputString, serializedDatetimeString) {
            it("should be able to parse '" + originalDatetimeInputString + "' and get the correct DatetimeValue", function () {
                var x = DataValue.parse(DataValue.DATETIME, originalDatetimeInputString);
                expect(x instanceof DatetimeValue).toBe(true);
                expect(x.toString()).toEqual(serializedDatetimeString);
            });
        };

        datetimeParseTest('20081224130204', '20081224130204');
        datetimeParseTest('200812241302',   '20081224130200');
        datetimeParseTest('2008122413',     '20081224130000');
        datetimeParseTest('20081224',       '20081224000000');
        datetimeParseTest('200812',         '20081201000000');
        datetimeParseTest('2008',           '20080101000000');
    });


});
