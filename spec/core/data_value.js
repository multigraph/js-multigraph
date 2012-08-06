/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DataValue", function () {
    "use strict";

    var DataValue = window.multigraph.core.DataValue,
        NumberValue = window.multigraph.core.NumberValue;


    it("should have a DataValue.NUMBER attribute", function () {
        expect(DataValue.NUMBER).not.toBeUndefined();
    });

    it("should have a DataValue.DATETIME attribute", function () {
        expect(DataValue.DATETIME).not.toBeUndefined();
    });

    it("DataValue.DATETIME attribute should not equal DataValue.NUMBER attribute", function () {
        expect(DataValue.DATETIME).not.toEqual(DataValue.NUMBER);
    });

    it("should be able to parse '13.2' and get the correct NumberValue", function () {
        var x = DataValue.parse(DataValue.NUMBER, "13.2");
        expect(x instanceof NumberValue).toBe(true);
        expect(x.getRealValue()).toEqual(13.2);
    });

    describe("DataValue.isInstance", function () {
        it("should return true for a NumberValue instance", function () {
            var x = new NumberValue(13.2);
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


});
