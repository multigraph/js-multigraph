/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Pan parsing", function () {
    "use strict";

    var Pan = window.multigraph.Axis.Pan,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<pan allowed="yes" min="0" max="5"/>',
        $xml,
        pan;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        pan = Pan.parseXML($xml);
    });

    it("should be able to parse a Pan from XML", function () {
        expect(pan).not.toBeUndefined();
        expect(pan instanceof Pan).toBe(true);
    });

    it("should be able to parse a pan from XML and read its 'allowed' attribute", function () {
        expect(pan.allowed() === 'yes').toBe(true);
    });

    it("should be able to parse a pan from XML and read its 'min' attribute", function () {
        expect(pan.min() === '0').toBe(true);
    });

    it("should be able to parse a pan from XML and read its 'max' attribute", function () {
        expect(pan.max() === '5').toBe(true);
    });

    it("should be able to parse a pan from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<pan allowed="no"/>';
        expect(pan.serialize() === xmlString).toBe(true);
        pan = Pan.parseXML($(xmlString2));
        expect(pan.serialize() === xmlString2).toBe(true);
    });

});
