/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plotarea parsing", function () {
    "use strict";

    var Plotarea = window.multigraph.Plotarea,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<plotarea marginbottom="19" marginleft="10" margintop="5" marginright="5" border="0" bordercolor="0x111223"/>',
        $xml,
        p;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        p = Plotarea.parseXML($xml);
    });

    it("should be able to parse a plotarea from XML and read its 'marginbottom' attribute", function () {
        expect(p.marginbottom() === '19').toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'marginleft' attribute", function () {
        expect(p.marginleft() === '10').toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'margintop' attribute", function () {
        expect(p.margintop() === '5').toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'marginright' attribute", function () {
        expect(p.marginright() === '5').toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'border' attribute", function () {
        expect(p.border() === '0').toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'bordercolor' attribute", function () {
        expect(p.bordercolor() === '0x111223').toBe(true);
    });

    it("should be able to parse a plotarea from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<plotarea margintop="12" marginright="9" border="1" bordercolor="0xABC312"/>';
        expect(p.serialize() === xmlString).toBe(true);
	p = Plotarea.parseXML($(xmlString2));
        expect(p.serialize() === xmlString2).toBe(true);
    });

});
