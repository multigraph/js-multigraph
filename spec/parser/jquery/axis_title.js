/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Title parsing", function () {
    "use strict";

    var AxisTitle = window.multigraph.core.AxisTitle,
        xmlString = '<title position="-1 1" anchor="1 1" angle="70">A Title</title>',
        $xml,
        title;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        title = AxisTitle.parseXML($xml);
    });

    it("should be able to parse a AxisTitle from XML", function () {
        expect(title).not.toBeUndefined();
    });

    it("should be able to parse a title from XML and read its 'position' attribute", function () {
        expect(title.position()).toBe("-1 1");
    });

    it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
        expect(title.anchor()).toBe("1 1");
    });

    it("should be able to parse a title from XML and read its 'angle' attribute", function () {
        expect(title.angle()).toBe(70);
    });

    it("should be able to parse a title from XML and read its 'content'", function () {
        expect(title.content()).toBe("A Title");
    });

    it("should be able to parse a title from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<title position="1 -1" angle="-15"/>';
        expect(title.serialize()).toBe(xmlString);
        title = AxisTitle.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
//        expect(title.serialize() === xmlString2).toBe(true);
    });

});
