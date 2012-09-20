/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph Title parsing", function () {
    "use strict";

    var Title = window.multigraph.core.Title,
        xmlString = '<title color="0xfffaab" bordercolor="0x127752" border="2" opacity="0" padding="4" cornerradius="10" anchor="1,1" base="0,0" position="-1,1">Cool Cats</title>',
        $xml,
        title;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        title = Title.parseXML($xml);
    });

    it("should be able to parse a Title from XML", function () {
        expect(title).not.toBeUndefined();
        expect(title instanceof Title).toBe(true);
    });

    it("should be able to parse a title from XML and read its 'border' attribute", function () {
        expect(title.border()).toBe("2");
    });

    it("should be able to parse a title from XML and read its 'color' attribute", function () {
        expect(title.color().getHexString()).toBe("0xfffaab");
    });

    it("should be able to parse a title from XML and read its 'bordercolor' attribute", function () {
        expect(title.bordercolor().getHexString()).toBe("0x127752");
    });

    it("should be able to parse a title from XML and read its 'opacity' attribute", function () {
        expect(title.opacity()).toBe(0);
    });

    it("should be able to parse a title from XML and read its 'padding' attribute", function () {
        expect(title.padding()).toBe("4");
    });

    it("should be able to parse a title from XML and read its 'cornerradius' attribute", function () {
        expect(title.cornerradius()).toBe("10");
    });

    it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
        expect(title.anchor().serialize()).toBe("1,1");
    });

    it("should be able to parse a title from XML and read its 'base' attribute", function () {
        expect(title.base().serialize()).toBe("0,0");
    });

    it("should be able to parse a title from XML and read its 'position' attribute", function () {
        expect(title.position().serialize()).toBe("-1,1");
    });

    it("should be able to parse a title from XML and read its 'content'", function () {
        expect(title.content()).toBe("Cool Cats");
    });

    it("should be able to parse a title from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<title border="3" opacity="1" padding="4" cornerradius="10" anchor="1,0" base="0,1" position="0,0"/>';
        expect(title.serialize()).toBe(xmlString);
        title = Title.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
        expect(title.serialize()).toBe(xmlString2);
    });

});
