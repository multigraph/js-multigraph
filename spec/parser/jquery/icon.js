/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend Icon parsing", function () {
    "use strict";

    var Icon = window.multigraph.core.Icon,
        xmlString = '<icon height="12" width="59" border="7"/>',
        $xml,
        icon;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        icon = Icon.parseXML($xml);
    });

    it("should be able to parse a icon from XML", function () {
        expect(icon).not.toBeUndefined();
        expect(icon instanceof Icon).toBe(true);
    });

    it("should be able to parse a icon from XML and read its 'height' attribute", function () {
        expect(icon.height()).toBe(12);
    });

    it("should be able to parse a icon from XML and read its 'width' attribute", function () {
        expect(icon.width()).toBe(59);
    });

    it("should be able to parse a icon from XML and read its 'border' attribute", function () {
        expect(icon.border()).toBe(7);
    });

    it("should be able to parse a icon from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<icon width="9" border="2"/>';
        expect(icon.serialize()).toBe(xmlString);
	icon = Icon.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
//        expect(icon.serialize() === xmlString2).toBe(true);
    });

});
