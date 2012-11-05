/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background serialization", function () {
    "use strict";

    var Background = window.multigraph.core.Background,
        xmlString,
        background;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize a background model", function () {
        xmlString = '<background color="0x123456"/>';
        background = new Background();
        background.color(window.multigraph.math.RGBColor.parse("0x123456"));
        expect(background.serialize()).toBe(xmlString);
    });

    describe("with a Img child tag", function () {
        var Img = window.multigraph.core.Img;

        it("should properly serialize a background model with a image submodel", function () {
            xmlString = '<background color="0x459996"><img src="http://www.example.com/background_img.png" anchor="0 1" frame="padding"/></background>';
            background = new Background();
            background.color(window.multigraph.math.RGBColor.parse("0x459996"));
            background.img(new Img("http://www.example.com/background_img.png"));
            background.img().anchor(window.multigraph.math.Point.parse("0,1"));
            background.img().frame("padding");
            expect(background.serialize()).toBe(xmlString);
        });

    });
});
