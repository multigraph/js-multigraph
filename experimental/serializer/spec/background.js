/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint  laxbreak:true */

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
        expect(background.serialize()).toEqual(xmlString);
    });

    describe("with a Img child tag", function () {
        var Img = window.multigraph.core.Img;

        it("should properly serialize a background model with a image submodel", function () {
            xmlString = ''
                + '<background'
                +     ' color="0x459996"'
                +     '>'
                +   '<img'
                +       ' src="http://www.example.com/background_img.png"'
                +       ' frame="padding"'
                +       ' anchor="0,1"'
                +       ' base="-1,-1"'
                +       ' position="0,0"'
                +       '/>'
                + '</background>';
            background = new Background();
            background.color(window.multigraph.math.RGBColor.parse("0x459996"));
            background.img(new Img("http://www.example.com/background_img.png"));
            background.img().frame("padding");
            background.img().anchor(window.multigraph.math.Point.parse("0,1"));
            background.img().base(window.multigraph.math.Point.parse("-1,-1"));
            background.img().position(window.multigraph.math.Point.parse("0,0"));
            expect(background.serialize()).toEqual(xmlString);
        });

    });
});
