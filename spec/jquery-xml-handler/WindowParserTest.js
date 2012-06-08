/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Window parsing", function () {
    "use strict";

    var Window = window.multigraph.Window,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<window width="2" height="97" border="0" margin="1" padding="10" bordercolor="0x111223"/>',
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
        expect(w.width() === '2').toBe(true);
    });

    it("should be able to parse a window from XML and read its 'height' attribute", function () {
        expect(w.height() === '97').toBe(true);
    });

    it("should be able to parse a window from XML and read its 'border' attribute", function () {
        expect(w.border() === '0').toBe(true);
    });

    it("should be able to parse a window from XML and read its 'margin' attribute", function () {
        expect(w.margin() === '1').toBe(true);
    });

    it("should be able to parse a window from XML and read its 'padding' attribute", function () {
        expect(w.padding() === '10').toBe(true);
    });

    it("should be able to parse a window from XML and read its 'bordercolor' attribute", function () {
        expect(w.bordercolor() === '0x111223').toBe(true);
    });

    it("should be able to parse a window from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<window width="100" height="127" border="3" padding="1"/>';
        expect(w.serialize() === xmlString).toBe(true);
	w = Window.parseXML($(xmlString2));
        console.log(xmlString2);
        console.log(w.serialize());
//        expect(w.serialize() === xmlString2).toBe(true);
    });

});
