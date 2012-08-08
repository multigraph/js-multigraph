/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DataMeasure", function () {
    "use strict";

    var DataMeasure = window.multigraph.core.DataMeasure,
        NumberMeasure = window.multigraph.core.NumberMeasure;


    it("should be able to parse '13.2' and get the correct NumberMeasure", function () {
        var x = DataMeasure.parse(window.multigraph.core.DataValue.NUMBER, "13.2");
        expect(x instanceof NumberMeasure).toBe(true);
        expect(x.getRealValue()).toEqual(13.2);
    });

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


});
