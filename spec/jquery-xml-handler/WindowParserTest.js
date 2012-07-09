/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Window parsing", function () {
    "use strict";

    var Window = window.multigraph.Window,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<window margin="1" padding="10" bordercolor="0x111223" width="2" height="97" border="0"/>',
        $xml,
        w;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        w = Window.parseXML($xml);
    });

    it("should be able to parse a window from XML", function () {
        expect(w).not.toBeUndefined();
    });

    it("should be able to parse a window from XML and read its 'width' attribute", function () {
        expect(w.width() === 2).toBe(true);
    });

    it("should be able to parse a window from XML and read its 'height' attribute", function () {
        expect(w.height() === 97).toBe(true);
    });

    it("should be able to parse a window from XML and read its 'border' attribute", function () {
        expect(w.border() === 0).toBe(true);
    });

    it("should be able to parse a window from XML and read its 'margin' attribute", function () {
        expect(w.margin().top() === 1).toBe(true);
    });

    it("should be able to parse a window from XML and read its 'padding' attribute", function () {
        expect(w.padding().top() === 10).toBe(true);
    });

    it("should be able to parse a window from XML and read its 'bordercolor' attribute", function () {
        expect(w.bordercolor().getHexString()).toBe("0x111223");
    });

    it("should be able to parse a window from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<window margin="1" padding="10" bordercolor="0x000000" width="100" height="127" border="3"/>';
        expect(w.serialize()).toBe(xmlString);
	w = Window.parseXML($(xmlString2));
        expect(w.serialize()).toBe(xmlString2);
    });

});
