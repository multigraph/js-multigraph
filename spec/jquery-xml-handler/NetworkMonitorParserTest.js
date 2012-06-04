/*global describe, it, beforeEach, expect, xit, jasmine */

describe("NetworkMonitor parsing", function () {
    "use strict";

    var NetworkMonitor = window.multigraph.NetworkMonitor,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<networkmonitor visible="yes" fixed="no"/>',
        $xml,
        nm;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        nm = NetworkMonitor.parseXML($xml);
    });

    it("should be able to parse a networkmonitor from XML", function () {
        expect(nm).not.toBeUndefined();
    });

    it("should be able to parse a networkmonitor from XML and read its 'visible' attribute", function () {
        expect(nm.visible() === 'yes').toBe(true);
    });

    it("should be able to parse a networkmonitor from XML and read its 'fixed' attribute", function () {
        expect(nm.fixed() === 'no').toBe(true);
    });

    it("should be able to parse a networkmonitor from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<networkmonitor visible="no"/>';
        expect(nm.serialize() === xmlString).toBe(true);
	nm = NetworkMonitor.parseXML($(xmlString2));
        expect(nm.serialize() === xmlString2).toBe(true);
    });

});
