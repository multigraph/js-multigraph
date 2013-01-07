/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Background Img serialization", function () {
    "use strict";

    var Img = window.multigraph.core.Img,
        xmlString,
        image;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should serialize background img models", function () {
        xmlString = '<img'
        +   ' src="http://www.example.com/exampleimg.gif"'
        +   ' frame="plot"'
        +   ' anchor="1,1"'
        +   ' base="0,0"'
        +   ' position="-1,1"'
        +    '/>';
        image = new Img("http://www.example.com/exampleimg.gif");
        image.anchor(window.multigraph.math.Point.parse("1,1"));
        image.base(window.multigraph.math.Point.parse("0,0"));
        image.position(window.multigraph.math.Point.parse("-1,1"));
        image.frame("plot");
        expect(image.serialize()).toBe(xmlString);

        xmlString = '<img'
            +   ' src="http://www.example.com/another_img.gif"'
            +   ' frame="padding"'
            +   ' anchor="-1,1"'
            +   ' base="0,1"'
            +   ' position="0,0.5"'
            +    '/>';
        image = new Img("http://www.example.com/another_img.gif");
        image.anchor(window.multigraph.math.Point.parse("-1,1"));
        image.base(window.multigraph.math.Point.parse("0,1"));
        image.position(window.multigraph.math.Point.parse("0,0.5"));
        image.frame("padding");
        expect(image.serialize()).toBe(xmlString);
    });

});
