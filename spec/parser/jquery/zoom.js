/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Zoom parsing", function () {
    "use strict";

    var Zoom = window.multigraph.core.Zoom,
        xmlString = '<zoom allowed="yes" min="0" max="80" anchor="1"/>',
        $xml,
        zoom;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = $(xmlString);
        zoom = Zoom.parseXML($xml, "number");
    });

    it("should be able to parse a Zoom from XML", function () {
        expect(zoom).not.toBeUndefined();
        expect(zoom instanceof Zoom).toBe(true);
    });

    it("should be able to parse a zoom from XML and read its 'allowed' attribute", function () {
        expect(zoom.allowed()).toBe(true);
    });

    it("should be able to parse a zoom from XML and read its 'min' attribute", function () {
        expect(zoom.min().getRealValue()).toBe(0);
    });

    it("should be able to parse a zoom from XML and read its 'max' attribute", function () {
        expect(zoom.max().getRealValue()).toBe(80);
    });

    it("should be able to parse a zoom from XML and read its 'anchor' attribute", function () {
        expect(zoom.anchor().getRealValue()).toBe(1);
    });

    it("should be able to parse a zoom from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<zoom allowed="no" anchor="0"/>';
        expect(zoom.serialize()).toBe(xmlString);
        zoom = Zoom.parseXML($(xmlString2), "number");
        expect(zoom.serialize()).toBe(xmlString2);
    });

});
