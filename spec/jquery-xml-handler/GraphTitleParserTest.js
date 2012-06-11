/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph Title parsing", function () {
    "use strict";

    var Title = window.multigraph.Title,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<title border="2" color="0xfffaab" bordercolor="0x127752" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title>',
        $xml,
        title;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        title = Title.parseXML($xml);
    });

    it("should be able to parse a Title from XML", function () {
        expect(title).not.toBeUndefined();
        expect(title instanceof Title).toBe(true);
    });

    it("should be able to parse a title from XML and read its 'border' attribute", function () {
        expect(title.border() === '2').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'color' attribute", function () {
        expect(title.color() === '0xfffaab').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'bordercolor' attribute", function () {
        expect(title.bordercolor() === '0x127752').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'opacity' attribute", function () {
        expect(title.opacity() === '0').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'padding' attribute", function () {
        expect(title.padding() === '4').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'cornerradius' attribute", function () {
        expect(title.cornerradius() === '10').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'base' attribute", function () {
        expect(title.base() === '0 0').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'position' attribute", function () {
        expect(title.position() === '-1 1').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
        expect(title.anchor() === '1 1').toBe(true);
    });

    it("should be able to parse a title from XML and read its 'content'", function () {
        expect(title.content() === 'Cool Cats').toBe(true);
    });

    it("should be able to parse a title from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<title border="3" color="0xaafaab" padding="4" cornerradius="10" base="0 1" anchor="1 0"/>';
        expect(title.serialize() === xmlString).toBe(true);
        title = Title.parseXML($(xmlString2));
//        expect(title.serialize() === xmlString2).toBe(true);
    });

});
