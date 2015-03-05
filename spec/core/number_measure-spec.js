/*global describe, it, beforeEach, expect, xit, jasmine */

describe("NumberMeasure", function () {
    "use strict";

    var NumberMeasure = require('../../src/core/number_measure.js'),
        NumberValue = require('../../src/core/number_value.js');

    it("should be able to create a NumberMeasure", function () {
        var x = new NumberMeasure(1.234);
        expect(x instanceof NumberMeasure).toBe(true);
    });

    it("getRealValue method should return the correct value", function () {
        var x = new NumberMeasure(1.234);
        expect(x.getRealValue()).toEqual(1.234);
    });

    it("NumberMeasure.parse() function should work correctly", function () {
        var x = NumberMeasure.parse("-5.678");
        expect(x instanceof NumberMeasure).toBe(true);
        expect(x.getRealValue()).toEqual(-5.678);
    });

    it("firstSpacingLocationAtOrAfter() should work correctly", function () {


        var testit = function (v, s, a, r) {
            //expect((new NumberMeasure(s)).firstSpacingLocationAtOrAfter(new NumberValue(v), new NumberValue(a)).getRealValue()).toEqual(r);
            expect((new NumberMeasure(s)).firstSpacingLocationAtOrAfter(new NumberValue(v), new NumberValue(a)).getRealValue()).toBe(r);
        };

        testit(10.2, 1.0,  0, 11.0);
        testit(10.2, 1.0, 20, 11.0);
        testit(10.2, 0.5, 20, 10.5);
        testit(10.2, 0.5, -5, 10.5);
        testit(10.2, -1.0,  0, 11.0);
        testit(10.2, -1.0, 20, 11.0);
        testit(10.2, -0.5, 20, 10.5);
        testit(10.2, -0.5, -5, 10.5);

        testit(1.8,  1.2, 0, 2.4);
        testit(2.4,  1.2, 0, 2.4);
        testit(1.8,  1.2, 4.8, 2.4);
        testit(2.4,  1.2, 4.8, 2.4);


        testit(3.0, 3.14, 0, 3.14);
        testit(3.15, 3.14, 0, 6.28);
        testit(3.0, 3.14, 6.28, 3.14);
        testit(3.15, 3.14, 6.28, 6.28);

        testit(3.0, 3.1415927, 0, 3.1415927);
        testit(3.15, 3.1415927, 0, 6.2831854);
        testit(3.0, 3.1415927, 6.2831854, 3.1415927);
        testit(3.15, 3.1415927, 6.2831854, 6.2831854);

        testit(4.14, 3.14, 1, 4.14);


/*
        //TODO: need more tests for this !!!
        var value = new NumberValue(10.2);
        var spacing = new NumberMeasure(1.0);
        var alignment = new NumberValue(0);
        expect(spacing.firstSpacingLocationAtOrAfter(value, alignment).getRealValue()).toEqual(11.0);
*/
    });




});
