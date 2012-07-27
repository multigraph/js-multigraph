/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Labels", function () {
    "use strict";

    var Labels = window.multigraph.core.Labels,
        Point = window.multigraph.math.Point,
        l;

    beforeEach(function () {
        l = new Labels();
    }); 

    it("should be able to create a Labels", function () {
        expect(l instanceof Labels).toBe(true);
    });

    describe("format attribute", function () {
        it("should be able to set/get the formatter attribute", function () {
            l.formatter("%3d");
            expect(l.formatter()).toBe("%3d");
        });

    });

    describe("start attribute", function () {
        it("should be able to set/get the start attribute", function () {
            l.start("7");
            expect(l.start()).toBe("7");
        });

    });

    describe("angle attribute", function () {
        it("should be able to set/get the angle attribute", function () {
            l.angle(5);
            expect(l.angle()).toBe(5);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            l.position(new Point(0,1));
            expect(l.position().x()).toEqual(0);
            expect(l.position().y()).toEqual(1);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            l.anchor(new Point(-1,1));
            expect(l.anchor().x()).toEqual(-1);
            expect(l.anchor().y()).toEqual(1);
        });

    });

    describe("spacing attribute", function () {
        it("should be able to set/get the spacing attribute", function () {
            l.spacing("10 5 3 2 1 .1 .01");
            expect(l.spacing()).toBe("10 5 3 2 1 .1 .01");
        });

    });

    describe("densityfactor attribute", function () {
        it("should be able to set/get the densityfactor attribute", function () {
            l.densityfactor(5);
            expect(l.densityfactor()).toEqual(5);
        });

    });

});
