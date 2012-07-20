/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Label", function () {
    "use strict";

    var Label = window.multigraph.Axis.Labels.Label,
        Point = window.multigraph.math.Point,
        label;

    beforeEach(function () {
        label = new Label('10 5 3 2 1 .1 .01');
    });

    it("should be able to create a Label", function () {
        expect(label instanceof Label).toBe(true);
    });

    describe("format attribute", function () {
        it("should be able to set/get the format attribute", function () {
            label.format('%2d');
            expect(label.format() === '%2d').toBe(true);
        });

    });

    describe("start attribute", function () {
        it("should be able to set/get the start attribute", function () {
            label.start('7');
            expect(label.start() === '7').toBe(true);
        });

    });

    describe("angle attribute", function () {
        it("should be able to set/get the angle attribute", function () {
            label.angle(5);
            expect(label.angle()).toBe(5);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            label.position(new Point(0,1));
            expect(label.position().x()).toEqual(0);
            expect(label.position().y()).toEqual(1);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            label.anchor(new Point(-1,1));
            expect(label.anchor().x()).toEqual(-1);
            expect(label.anchor().y()).toEqual(1);
        });

    });

    describe("spacing attribute", function () {
        it("should be able to set/get the spacing attribute", function () {
            label.spacing('10 5 3 2 1 .1 .01');
            expect(label.spacing() === '10 5 3 2 1 .1 .01').toBe(true);
        });

    });

    describe("densityfactor attribute", function () {
        it("should be able to set/get the densityfactor attribute", function () {
            label.densityfactor(5);
            expect(label.densityfactor()).toEqual(5);
        });

    });

});
