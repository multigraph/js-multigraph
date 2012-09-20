/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Title", function () {
    "use strict";

    var AxisTitle = window.multigraph.core.AxisTitle,
        Point = window.multigraph.math.Point,
        title;

    beforeEach(function () {
        title = new AxisTitle();
    });

    it("should be able to create a AxisTitle", function () {
        expect(title instanceof AxisTitle).toBe(true);
    });

    describe("content attribute", function () {
        it("should be able to set/get the content attribute", function () {
            title.content("This axis plots cats");
            expect(title.content()).toBe("This axis plots cats");
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            title.position(new Point(0, 1));
            expect(title.position().x()).toBe(0);
            expect(title.position().y()).toBe(1);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            title.anchor(new Point(-1, 1));
            expect(title.anchor().x()).toBe(-1);
            expect(title.anchor().y()).toBe(1);
        });

    });

    describe("angle attribute", function () {
        it("should be able to set/get the angle attribute", function () {
            title.angle(5);
            expect(title.angle()).toBe(5);
        });

    });

});
