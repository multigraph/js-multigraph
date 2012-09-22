/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Math util", function () {
    "use strict";

    var util = window.multigraph.math.util;

    describe("interp method", function () {
        it("should correctly map values from [0,233] onto [-1,1]", function () {
            expect(util.interp(0, 0, 233, -1, 1)).toEqual(-1);
            expect(util.interp(233, 0, 233, -1, 1)).toEqual(1);
            expect(util.interp(116.5, 0, 233, -1, 1)).toEqual(0);
        });

        it("should correctly map values from [0,233] onto [1,-1]", function () {
            expect(util.interp(0, 0, 233, 1, -1)).toEqual(1);
            expect(util.interp(233, 0, 233, 1, -1)).toEqual(-1);
            expect(util.interp(116.5, 0, 233, 1, -1)).toEqual(0);
        });

        it("should correctly map values from [0,233] onto [0,10]", function () {
            expect(util.interp(0, 0, 233, 0, 10)).toEqual(0);
            expect(util.interp(233, 0, 233, 0, 10)).toEqual(10);
            expect(util.interp(116.5, 0, 233, 0, 10)).toEqual(5);
        });
    });

    describe("safe_interp method", function () {
        it("should correctly interpolate between (0,0) and (1,1)", function () {
            expect(util.safe_interp(0.5, 0, 1, 0, 1)).toEqual(0.5);
            expect(util.safe_interp(0.2, 0, 1, 0, 1)).toEqual(0.2);
        });
        it("should correctly interpolate between (0,0) and (0,1)", function () {
            expect(util.safe_interp(0.5, 0, 0, 0, 1)).toEqual(0.5);
            expect(util.safe_interp(0.2, 0, 0, 0, 1)).toEqual(0.5);
        });
    });
});
