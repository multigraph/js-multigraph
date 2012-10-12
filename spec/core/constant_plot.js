/*global describe, it, beforeEach, expect, xit, jasmine */

describe("ConstantPlot", function () {

    "use strict";

    var Plot = window.multigraph.core.Plot,
        ConstantPlot = window.multigraph.core.ConstantPlot,
        NumberValue = window.multigraph.core.NumberValue;

    it("should be able to create a ConstantPlot", function () {
        var p = new ConstantPlot(new NumberValue(3.14));
        expect(p).not.toBeUndefined();
        expect(p instanceof ConstantPlot).toBe(true);
        expect(p instanceof Plot).toBe(true);
    });

    it("should throw an error if constucted with anything other than a DataValue", function () {
        expect(function() {
            var p = new ConstantPlot(3.14);
        }).toThrow();
        expect(function() {
            var p = new ConstantPlot("3.14");
        }).toThrow();
    });

    it("should have the correct constantValue", function () {
        var p = new ConstantPlot(new NumberValue(3.14));
        expect(p.constantValue().getRealValue()).toEqual(3.14);
    });


});
