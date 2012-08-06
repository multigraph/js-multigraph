/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Math util", function () {
    "use strict";

    var Util = window.multigraph.math.util;

    describe("interp method", function () {
        it("should correctly map values from [0,233] onto [-1,1]", function () {
            expect(Util.interp(0, 0, 233, -1, 1)).toEqual(-1);
            expect(Util.interp(233, 0, 233, -1, 1)).toEqual(1);
            expect(Util.interp(116.5, 0, 233, -1, 1)).toEqual(0);
        });

        it("should correctly map values from [0,233] onto [1,-1]", function () {
            expect(Util.interp(0, 0, 233, 1, -1)).toEqual(1);
            expect(Util.interp(233, 0, 233, 1, -1)).toEqual(-1);
            expect(Util.interp(116.5, 0, 233, 1, -1)).toEqual(0);
        });

        it("should correctly map values from [0,233] onto [0,10]", function () {
            expect(Util.interp(0, 0, 233, 0, 10)).toEqual(0);
            expect(Util.interp(233, 0, 233, 0, 10)).toEqual(10);
            expect(Util.interp(116.5, 0, 233, 0, 10)).toEqual(5);
        });
    });
});