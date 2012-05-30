/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background Img", function () {
    "use strict";

    var Img = window.multigraph.Background.Img,
        image;

    beforeEach(function () {
        image = new Img();
    });

    it("should be able to create a Img", function () {
        expect(image instanceof Img).toBe(true);
    });

    describe("src attribute", function () {
        it("should be able to set/get the src attribute", function () {
            image.src('http://example.com/cool_dog.gif');
            expect(image.src() === 'http://example.com/cool_dog.gif').toBe(true);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            image.anchor('0 1');
            expect(image.anchor() === '0 1').toBe(true);
        });

    });

    describe("base attribute", function () {
        it("should be able to set/get the base attribute", function () {
            image.base('1 1');
            expect(image.base() === '1 1').toBe(true);
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            image.position('-1 1');
            expect(image.position() === '-1 1').toBe(true);
        });

    });

    describe("frame attribute", function () {
        it("should be able to set/get the frame attribute", function () {
            image.frame('padding');
            expect(image.frame() === 'padding').toBe(true);
        });

    });

});
