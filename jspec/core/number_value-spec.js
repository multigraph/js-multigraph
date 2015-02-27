/*global describe, it, beforeEach, expect, xit, jasmine */

describe("NumberValue", function () {
    "use strict";

    var NumberValue = require('../../src/core/number_value.js'),
        NumberMeasure = require('../../src/core/number_measure.js');

    it("should be able to create a NumberValue", function () {
        var x = new NumberValue(1.234);
        expect(x instanceof NumberValue).toBe(true);
    });

    it("getRealValue method should return the correct value", function () {
        var x = new NumberValue(1.234);
        expect(x.getRealValue()).toEqual(1.234);
    });

    it("NumberValue.parse() function should work correctly", function () {
        var x = NumberValue.parse("-5.678");
        expect(x instanceof NumberValue).toBe(true);
        expect(x.getRealValue()).toEqual(-5.678);
    });

    it("add() should work correctly", function () {
        expect((new NumberValue(1.234)).add((new NumberMeasure(5.678))).getRealValue()).toEqual(6.912);
        expect((new NumberValue(10)).add((new NumberMeasure(2))).getRealValue()).toEqual(12);
        expect((new NumberValue(0)).add((new NumberMeasure(-2))).getRealValue()).toEqual(-2);
        expect((new NumberValue(0)).add((new NumberMeasure(0))).getRealValue()).toEqual(0);
        expect((new NumberValue(-20)).add((new NumberMeasure(-5))).getRealValue()).toEqual(-25);
    });

    describe("compareTo", function () {

        var a123, a567, b123;

        beforeEach(function () {
            a123 = new NumberValue(1.23);
            a567 = new NumberValue(5.67);
            b123 = new NumberValue(1.23);
        });
        
        it("compareTo should return -1 for <", function () {
            expect(a123.compareTo(a567)).toEqual(-1);
        });
        it("compareTo should return +1 for >", function () {
            expect(a567.compareTo(a123)).toEqual(1);
        });
        it("compareTo should return 0 for =", function () {
            expect(b123.compareTo(a123)).toEqual(0);
        });

        describe("comparator mixins", function () {

            it("lt should work correctly", function () {
                expect(a123.lt(a567)).toBe(true);
                expect(a567.lt(a123)).toBe(false);
                expect(a123.lt(b123)).toBe(false);
            });
            it("le should work correctly", function () {
                expect(a123.le(a567)).toBe(true);
                expect(a567.le(a123)).toBe(false);
                expect(a123.le(b123)).toBe(true);
            });
            it("eq should work correctly", function () {
                expect(a123.eq(a567)).toBe(false);
                expect(a567.eq(a123)).toBe(false);
                expect(a123.eq(b123)).toBe(true);
            });
            it("ge should work correctly", function () {
                expect(a123.ge(a567)).toBe(false);
                expect(a567.ge(a123)).toBe(true);
                expect(a123.ge(b123)).toBe(true);
            });
            it("gt should work correctly", function () {
                expect(a123.gt(a567)).toBe(false);
                expect(a567.gt(a123)).toBe(true);
                expect(a123.gt(b123)).toBe(false);
            });

        });

    });

    describe("clone() method", function () {

        var x;

        beforeEach(function() {
            x = new NumberValue(3.14159);
        });

        it("should exist", function () {
            expect(typeof(x.clone)).toBe("function");
        });

        it("should return a value equal to the original", function () {
            var y = x.clone();
            expect(y.eq(x)).toBe(true);
        });

    });


});
