/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Grid", function () {
    "use strict";

    var Grid = window.multigraph.Axis.Grid,
        grid;

    beforeEach(function () {
        grid = new Grid();
    });

    it("should be able to create a Grid", function () {
        expect(grid instanceof Grid).toBe(true);
    });

    describe("color attribute", function () {
        it("should be able to set/get the color attribute", function () {
            grid.color('0x638219');
            expect(grid.color() === '0x638219').toBe(true);
        });

    });

    describe("visible attribute", function () {
        it("should be able to set/get the visible attribute", function () {
            grid.visible('true');
            expect(grid.visible() === 'true').toBe(true);
        });

        it("should be throw an error if the setter value is not 'true' or 'false'", function () {
            expect(function () {
                grid.visible('false');
            }).not.toThrow(new Error('invalid setter call for visible'));
            expect(function () {
                grid.visible('falsey');
            }).toThrow(new Error('invalid setter call for visible'));
        });

    });

});
