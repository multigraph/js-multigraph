/*global describe, it, beforeEach, expect, xit, jasmine */

describe("NumberMeasure", function () {
    "use strict";

    var NumberMeasure = window.multigraph.NumberMeasure,
        NumberValue = window.multigraph.NumberValue;

    it("should be able to create a NumberMeasure", function () {
        var x = new NumberMeasure(1.234);
        expect(x instanceof NumberMeasure).toBe(true);
    });

    it("getRealValue method should return the correct value", function() {
        var x = new NumberMeasure(1.234);
        expect(x.getRealValue()).toEqual(1.234);
    });

    it("NumberMeasure.parse() function should work correctly", function() {
        var x = NumberMeasure.parse("-5.678");
        expect(x instanceof NumberMeasure).toBe(true);
        expect(x.getRealValue()).toEqual(-5.678);
    });




});
