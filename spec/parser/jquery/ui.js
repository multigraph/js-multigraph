/*global describe, it, beforeEach, expect, xit, jasmine */

describe("UI parsing", function () {
    "use strict";

    var UI = window.multigraph.core.UI,
        xmlString = '<ui eventhandler="error"/>',
        $xml,
        ui;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        ui = UI.parseXML($xml);
    });

    it("should be able to parse a ui from XML", function () {
        expect(ui).not.toBeUndefined();
    });

    it("should be able to parse a ui from XML and read its 'eventhandler' attribute", function () {
        expect(ui.eventhandler()).toBe("error");
    });

    it("should be able to parse a ui from XML, serialize it and get the same XML as the original", function () {
        expect(ui.serialize()).toBe(xmlString);
    });

});
