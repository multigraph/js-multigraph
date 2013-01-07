/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background", function () {
    "use strict";

    var Img = window.multigraph.core.Img,
        Background = window.multigraph.core.Background,
        b;

    beforeEach(function () {
        b = new Background();
    }); 

    it("should be able to create a Background", function () {
        expect(b instanceof Background).toBe(true);
    });

    it("should be able to set/get the color attribute", function () {
        b.color(window.multigraph.math.RGBColor.parse("0x121756"));
        expect(b.color().getHexString()).toBe("0x121756");
    });

    describe("Img", function () {
        var image;

        beforeEach(function () {
            image = new Img("http://example.com/example.gif");
        });

        it("should be able to add a Img to a Background", function () {
            b.img(image);
            expect(b.img()).toBe(image);
        });

        it("should be able to add an Img with attributes to a Background", function () {
            image.src("http://example.com/example2.gif");
            image.base(window.multigraph.math.Point.parse("0 1"));
            b.img(image);
            expect(b.img()).toBe(image);
        });

        it("should be able to set/get attributes of an Img added to a Background", function () {
            b.img(image);
            b.img().src("http://example.com/example.png");
            b.img().base(window.multigraph.math.Point.parse("1 0.5"));
            expect(b.img().src()).toBe("http://example.com/example.png");
            expect(b.img().base().x()).toEqual(1);
            expect(b.img().base().y()).toEqual(0.5);
        });

        it("should not keep old data around when an Img is replaced", function () {
            var image2 = new Img("http://example.com/example2.gif");
            b.img(image);
            b.img().src("http://example.com/example.png");
            b.img().base(window.multigraph.math.Point.parse("0 1"));
            b.img(image2);
            expect(b.img().src()).toBe("http://example.com/example2.gif");
        });

    });

});
