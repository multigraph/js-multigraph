/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Debugger parsing", function () {
    "use strict";

    var Debugger = window.multigraph.core.Debugger,
        xmlString = '<debugger visible="yes" fixed="no"/>',
        $xml,
        debug;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        debug = Debugger.parseXML($xml);
    });

    it("should be able to parse a debugger from XML", function () {
        expect(debug).not.toBeUndefined();
    });

    it("should be able to parse a debugger from XML and read its 'visible' attribute", function () {
        expect(debug.visible()).toBe("yes");
    });

    it("should be able to parse a debugger from XML and read its 'fixed' attribute", function () {
        expect(debug.fixed()).toBe("no");
    });

    it("should be able to parse a debugger from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<debugger visible="no"/>';
        expect(debug.serialize()).toBe(xmlString);
	debug = Debugger.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
        expect(debug.serialize()).toBe(xmlString2);
    });

});
