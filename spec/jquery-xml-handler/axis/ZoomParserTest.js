/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Zoom parsing", function () {
    "use strict";

    var Zoom = window.multigraph.Axis.Zoom,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<zoom allowed="yes" min="0" max="80" anchor="1 1"/>',
        $xml,
        zoom;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        zoom = Zoom.parseXML($xml);
    });

    it("should be able to parse a Zoom from XML", function () {
        expect(zoom).not.toBeUndefined();
        expect(zoom instanceof Zoom).toBe(true);
    });

    it("should be able to parse a zoom from XML and read its 'allowed' attribute", function () {
        expect(zoom.allowed() === 'yes').toBe(true);
    });

    it("should be able to parse a zoom from XML and read its 'min' attribute", function () {
        expect(zoom.min() === '0').toBe(true);
    });

    it("should be able to parse a zoom from XML and read its 'max' attribute", function () {
        expect(zoom.max() === '80').toBe(true);
    });

    it("should be able to parse a zoom from XML and read its 'anchor' attribute", function () {
        expect(zoom.anchor() === '1 1').toBe(true);
    });

    it("should be able to parse a zoom from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<zoom allowed="no" anchor="0 -1"/>';
        expect(zoom.serialize() === xmlString).toBe(true);
        zoom = Zoom.parseXML($(xmlString2));
        expect(zoom.serialize() === xmlString2).toBe(true);
    });

});
