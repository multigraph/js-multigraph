/*global describe, it, beforeEach, expect, xit, jasmine */

describe("NetworkMonitor parsing", function () {
    "use strict";

    var NetworkMonitor = window.multigraph.core.NetworkMonitor,
        xmlString = '<networkmonitor visible="yes" fixed="no"/>',
        $xml,
        nm;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = $(xmlString);
        nm = NetworkMonitor.parseXML($xml);
    });

    it("should be able to parse a networkmonitor from XML", function () {
        expect(nm).not.toBeUndefined();
    });

    it("should be able to parse a networkmonitor from XML and read its 'visible' attribute", function () {
        expect(nm.visible()).toBe("yes");
    });

    it("should be able to parse a networkmonitor from XML and read its 'fixed' attribute", function () {
        expect(nm.fixed()).toBe("no");
    });

    it("should be able to parse a networkmonitor from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<networkmonitor visible="no"/>';
        expect(nm.serialize()).toBe(xmlString);
	nm = NetworkMonitor.parseXML($(xmlString2));
        expect(nm.serialize()).toBe(xmlString2);
    });

});
