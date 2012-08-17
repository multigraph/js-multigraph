/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Window parsing", function () {
    "use strict";

    var Window = window.multigraph.core.Window,
        xmlString = '<window margin="1" padding="10" bordercolor="0x111223" width="2" height="97" border="0"/>',
        $xml,
        w;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        w = Window.parseXML($xml);
    });

    it("should be able to parse a window from XML", function () {
        expect(w).not.toBeUndefined();
    });

    it("should be able to parse a window from XML and read its 'width' attribute", function () {
        expect(w.width()).toBe(2);
    });

    it("should be able to parse a window from XML and read its 'height' attribute", function () {
        expect(w.height()).toBe(97);
    });

    it("should be able to parse a window from XML and read its 'border' attribute", function () {
        expect(w.border()).toBe(0);
    });

    it("should be able to parse a window from XML and read its 'margin' attribute", function () {
        expect(w.margin().top()).toBe(1);
    });

    it("should be able to parse a window from XML and read its 'padding' attribute", function () {
        expect(w.padding().top()).toBe(10);
    });

    it("should be able to parse a window from XML and read its 'bordercolor' attribute", function () {
        expect(w.bordercolor().getHexString()).toBe("0x111223");
    });

    it("should be able to parse a window from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<window margin="1" padding="10" bordercolor="0x000000" width="100" height="127" border="3"/>';
        expect(w.serialize()).toBe(xmlString);
	w = Window.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
        expect(w.serialize()).toBe(xmlString2);
    });

});
