/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Labeler", function () {
    "use strict";

    var Labeler = window.multigraph.core.Labeler,
        Point = window.multigraph.math.Point,
        Axis = window.multigraph.core.Axis,
        labeler;

    beforeEach(function () {
        labeler = new Labeler(new Axis("horizontal"));
    });

    it("should be able to create a Labeler", function () {
        expect(labeler instanceof Labeler).toBe(true);
    });

    describe("formatter attribute", function () {
        it("should be able to set/get the formatter attribute", function () {
            labeler.formatter("%2d");
            expect(labeler.formatter()).toBe("%2d");
        });

    });

    describe("start attribute", function () {
        it("should be able to set/get the start attribute", function () {
            labeler.start("7");
            expect(labeler.start()).toBe("7");
        });

    });

    describe("angle attribute", function () {
        it("should be able to set/get the angle attribute", function () {
            labeler.angle(5);
            expect(labeler.angle()).toBe(5);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            labeler.position(new Point(0,1));
            expect(labeler.position().x()).toEqual(0);
            expect(labeler.position().y()).toEqual(1);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            labeler.anchor(new Point(-1,1));
            expect(labeler.anchor().x()).toEqual(-1);
            expect(labeler.anchor().y()).toEqual(1);
        });

    });

    describe("spacing attribute", function () {
        it("should be able to set/get the spacing attribute", function () {
            labeler.spacing("10");
            expect(labeler.spacing()).toBe("10");
        });

    });

    describe("densityfactor attribute", function () {
        it("should be able to set/get the densityfactor attribute", function () {
            labeler.densityfactor(5);
            expect(labeler.densityfactor()).toEqual(5);
        });

    });

});
