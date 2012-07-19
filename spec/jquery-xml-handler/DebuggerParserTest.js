/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Debugger parsing", function () {
    "use strict";

    var Debugger = window.multigraph.Debugger,
        xmlString = '<debugger visible="yes" fixed="no"/>',
        $xml,
        debug;

    beforeEach(function () {
        window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        debug = Debugger.parseXML($xml);
    });

    it("should be able to parse a debugger from XML", function () {
        expect(debug).not.toBeUndefined();
    });

    it("should be able to parse a debugger from XML and read its 'visible' attribute", function () {
        expect(debug.visible() === 'yes').toBe(true);
    });

    it("should be able to parse a debugger from XML and read its 'fixed' attribute", function () {
        expect(debug.fixed() === 'no').toBe(true);
    });

    it("should be able to parse a debugger from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<debugger visible="no"/>';
        expect(debug.serialize() === xmlString).toBe(true);
	debug = Debugger.parseXML($(xmlString2));
        expect(debug.serialize() === xmlString2).toBe(true);
    });

});
