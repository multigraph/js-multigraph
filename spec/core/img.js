/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background Img", function () {
    "use strict";

    var Img = window.multigraph.core.Img,
        image;

    beforeEach(function () {
        image = new Img("http://example.com/example.gif");
    });

    it("should be able to create a Img", function () {
        expect(image instanceof Img).toBe(true);
    });

    describe("src attribute", function () {
        it("should default the src attribute to the passed value", function () {
            expect(image.src()).toBe("http://example.com/example.gif");
        });
        it("should be able to set/get the src attribute", function () {
            image.src("http://example.com/example2.gif");
            expect(image.src()).toBe("http://example.com/example2.gif");
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            image.anchor(window.multigraph.math.Point.parse("0 1"));
            expect(image.anchor().x()).toEqual(0);
            expect(image.anchor().y()).toEqual(1);
        });

    });

    describe("base attribute", function () {
        it("should be able to set/get the base attribute", function () {
            image.base(window.multigraph.math.Point.parse("1 1"));
            expect(image.base().x()).toEqual(1);
            expect(image.base().y()).toEqual(1);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            image.position(window.multigraph.math.Point.parse("-1 1"));
            expect(image.position().x()).toEqual(-1);
            expect(image.position().y()).toEqual(1);
        });

    });

    describe("frame attribute", function () {
        it("should be able to set/get the frame attribute", function () {
            image.frame("padding");
            expect(image.frame()).toBe("padding");
        });

    });

});
