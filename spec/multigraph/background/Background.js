/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background", function () {
    "use strict";

    var Img = window.multigraph.Background.Img,
        Background = window.multigraph.Background,
        b;

    beforeEach(function () {
        b = new Background();
    }); 

    it("should be able to create a Background", function () {
        expect(b instanceof Background).toBe(true);
    });

    it("should be able to set/get the color attribute", function () {
        b.color("0x121756");
        expect(b.color() === "0x121756").toBe(true);
    });

    describe("Img", function () {
        var image;

        beforeEach(function () {
            image = new Img('http://example.com/cool_dog.gif');
        });

        it("should be able to add a Img to a Background", function () {
            b.img(image);
            expect(b.img() === image).toBe(true);
        });

        it("should be able to add an Img with attributes to a Background", function () {
            image.src("http://example.com/lazy_cat.gif");
            image.base("0 1");
            b.img(image);
            expect(b.img() === image).toBe(true);
        });

        it("should be able to set/get attributes of an Img added to a Background", function () {
            b.img(image);
            b.img().src("http://example.com/lazy_cat.gif");
            b.img().base("0 1");
            expect(b.img().src() === "http://example.com/lazy_cat.gif").toBe(true);
            expect(b.img().base() === "0 1").toBe(true);
        });

        it("should not keep old data around when an Img is replaced", function () {
            var image2 = new Img('http://example.com/cool_dog.gif');
            b.img(image);
            b.img().src("http://example.com/lazy_cat.gif");
            b.img().base("0 1");
            b.img(image2);
            expect(b.img().src() === "http://example.com/cool_dog.gif").toBe(true);
        });

    });

});
