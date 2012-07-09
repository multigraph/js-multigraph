/*global describe, it, beforeEach, expect, xit, jasmine */

describe("JSNumberValueType", function () {
    "use strict";

    var JSNumberValueType = window.multigraph.valuetype.JSNumberValueType;

    it("should be able to create a JSNumberValueType", function () {
        var x = new JSNumberValueType(1.234);
        expect(x instanceof JSNumberValueType).toBe(true);
    });

    it("getRealValue method should return the correct value", function() {
        var x = new JSNumberValueType(1.234);
        expect(x.getRealValue()).toEqual(1.234);
    });

    describe("compareTo", function() {

        var a123, a567, b123;

        beforeEach(function () {
            a123 = new JSNumberValueType(1.23);
            a567 = new JSNumberValueType(5.67);
            b123 = new JSNumberValueType(1.23);
        });
        
        it("compareTo should return -1 for <", function() {
            expect(a123.compareTo(a567)).toEqual(-1);
        });
        it("compareTo should return +1 for >", function() {
            expect(a567.compareTo(a123)).toEqual(1);
        });
        it("compareTo should return 0 for =", function() {
            expect(b123.compareTo(a123)).toEqual(0);
        });

        it("lt should work correctly", function() {
            expect(a123.lt(a567)).toBe(true);
            expect(a567.lt(a123)).toBe(false);
            expect(a123.lt(b123)).toBe(false);
        });
        it("le should work correctly", function() {
            expect(a123.le(a567)).toBe(true);
            expect(a567.le(a123)).toBe(false);
            expect(a123.le(b123)).toBe(true);
        });
        it("eq should work correctly", function() {
            expect(a123.eq(a567)).toBe(false);
            expect(a567.eq(a123)).toBe(false);
            expect(a123.eq(b123)).toBe(true);
        });
        it("ge should work correctly", function() {
            expect(a123.ge(a567)).toBe(false);
            expect(a567.ge(a123)).toBe(true);
            expect(a123.ge(b123)).toBe(true);
        });
        it("gt should work correctly", function() {
            expect(a123.gt(a567)).toBe(false);
            expect(a567.gt(a123)).toBe(true);
            expect(a123.gt(b123)).toBe(false);
        });

    });



});
