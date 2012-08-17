/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Background Img parsing", function () {
    "use strict";

    var Img = window.multigraph.core.Img,
        xmlString = '<img'
        +   ' src="http://www.example.com/rad_ferret.gif"'
        +   ' frame="plot"'
        +   ' anchor="1,1"'
        +   ' base="0,0"'
        +   ' position="-1,1"'
        +    '/>',
        $xml,
        image;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        image = Img.parseXML($xml);
    });

    it("should be able to parse a background from XML", function () {
        expect(image).not.toBeUndefined();
    });

    it("should be able to parse a img from XML and read its 'src' attribute", function () {
        expect(image.src()).toBe("http://www.example.com/rad_ferret.gif");
    });

    it("should be able to parse a img from XML and read its 'anchor' attribute", function () {
        expect(image.anchor().serialize()).toBe("1,1");
    });

    it("should be able to parse a img from XML and read its 'base' attribute", function () {
        expect(image.base().serialize()).toBe("0,0");
    });

    it("should be able to parse a img from XML and read its 'position' attribute", function () {
        expect(image.position().serialize()).toBe("-1,1");
    });

    it("should be able to parse a img from XML and read its 'frame' attribute", function () {
        expect(image.frame()).toBe("plot");
    });

    it("should be able to parse a img from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<img'
            +   ' src="http://www.example.com/another_img.gif"'
            +   ' frame="padding"'
            +   ' anchor="-1,1"'
            +   ' base="0,1"'
            +   ' position="0,0.5"'
            +    '/>';

        expect(image.serialize()).toBe(xmlString);
        image = Img.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
        expect(image.serialize()).toBe(xmlString2);
    });

});
