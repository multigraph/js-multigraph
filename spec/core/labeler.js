/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Labeler", function () {
    "use strict";

    var Labeler = window.multigraph.core.Labeler,
        Point = window.multigraph.math.Point,
        Axis = window.multigraph.core.Axis,
        NumberFormatter = window.multigraph.core.NumberFormatter,
        DataValue = window.multigraph.core.DataValue,
        NumberValue = window.multigraph.core.NumberValue,
        NumberMeasure = window.multigraph.core.NumberMeasure,
        labeler;

    beforeEach(function () {
        labeler = new Labeler(new Axis(Axis.HORIZONTAL).type(DataValue.NUMBER));
    });

    it("should be able to create a Labeler", function () {
        expect(labeler instanceof Labeler).toBe(true);
    });

    describe("formatter attribute", function () {
        it("should be able to set/get the formatter attribute", function () {
            labeler.formatter(new NumberFormatter("%2d"));
            expect(labeler.formatter() instanceof NumberFormatter).toBe(true);
        });

    });

    describe("start attribute", function () {
        it("should be able to set/get the start attribute", function () {
            labeler.start(new NumberValue("7"));
            expect(labeler.start().getRealValue()).toBe("7");
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
            labeler.spacing(new NumberMeasure(10));
            expect(labeler.spacing().getRealValue()).toBe(10);
        });

    });

    describe("densityfactor attribute", function () {
        it("should be able to set/get the densityfactor attribute", function () {
            labeler.densityfactor(5);
            expect(labeler.densityfactor()).toEqual(5);
        });

    });

});
