/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Title parsing", function () {
    "use strict";

    var AxisTitle = window.multigraph.core.AxisTitle,
        xmlString = '<title angle="70" anchor="1,1" position="-1,1">A Title</title>',
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
        expect(title.position().serialize()).toBe("-1,1");
    });

    it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
        expect(title.anchor().serialize()).toBe("1,1");
    });

    it("should be able to parse a title from XML and read its 'angle' attribute", function () {
        expect(title.angle()).toBe(70);
    });

    it("should be able to parse a title from XML and read its 'content'", function () {
        expect(title.content()).toBe("A Title");
    });

    it("should be able to parse a title from XML, serialize it and get the same XML as the original", function () {
        expect(title.serialize()).toBe(xmlString);
    });

});
