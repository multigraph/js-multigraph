/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend Icon parsing", function () {
    "use strict";

    var Icon = window.multigraph.Legend.Icon,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<icon height="12" width="59" border="7"/>',
        $xml,
        icon;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        icon = Icon.parseXML($xml);
    });

    it("should be able to parse a icon from XML", function () {
        expect(icon).not.toBeUndefined();
        expect(icon instanceof Icon).toBe(true);
    });

    it("should be able to parse a icon from XML and read its 'height' attribute", function () {
        expect(icon.height() === '12').toBe(true);
    });

    it("should be able to parse a icon from XML and read its 'width' attribute", function () {
        expect(icon.width() === '59').toBe(true);
    });

    it("should be able to parse a icon from XML and read its 'border' attribute", function () {
        expect(icon.border() === '7').toBe(true);
    });

    it("should be able to parse a icon from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<icon width="9" border="2"/>';
        expect(icon.serialize() === xmlString).toBe(true);
	icon = Icon.parseXML($(xmlString2));
//        expect(icon.serialize() === xmlString2).toBe(true);
    });

});
