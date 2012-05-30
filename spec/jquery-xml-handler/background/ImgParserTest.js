/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Background Img parsing", function () {
    "use strict";

    var Img = window.multigraph.Background.Img,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<img src="http://www.example.com/rad_ferret.gif" anchor="1 1" base="0 0" position="-1 1" frame="plot"/>',
        $xml,
        image;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        image = Img.parseXML($xml);
    });

    it("should be able to parse a background from XML", function () {
        expect(image).not.toBeUndefined();
    });

    it("should be able to parse a img from XML and read its 'src' attribute", function () {
        expect(image.src() === 'http://www.example.com/rad_ferret.gif').toBe(true);
    });

    it("should be able to parse a img from XML and read its 'anchor' attribute", function () {
        expect(image.anchor() === '1 1').toBe(true);
    });

    it("should be able to parse a img from XML and read its 'base' attribute", function () {
        expect(image.base() === '0 0').toBe(true);
    });

    it("should be able to parse a img from XML and read its 'position' attribute", function () {
        expect(image.position() === '-1 1').toBe(true);
    });

    it("should be able to parse a img from XML and read its 'frame' attribute", function () {
        expect(image.frame() === 'plot').toBe(true);
    });

    it("should be able to parse a img from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<img src="http://www.example.com/sleepy_puppy.gif" base="1 0" position="1 -1"/>';
        expect(image.serialize() === xmlString).toBe(true);
        image = Img.parseXML($(xmlString2));
        expect(image.serialize() === xmlString2).toBe(true);
    });

});
