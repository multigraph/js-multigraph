/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Title", function () {
    "use strict";

    var AxisTitle = window.multigraph.core.AxisTitle,
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
            expect(title.content() === "This axis plots cats").toBe(true);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            title.position("0 1");
            expect(title.position() === "0 1").toBe(true);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            title.anchor("-1 1");
            expect(title.anchor() === "-1 1").toBe(true);
        });

    });

    describe("angle attribute", function () {
        it("should be able to set/get the angle attribute", function () {
            title.angle(5);
            expect(title.angle()).toBe(5);
        });

    });

});
