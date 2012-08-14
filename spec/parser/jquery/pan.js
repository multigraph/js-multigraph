/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Pan parsing", function () {
    "use strict";

    var Pan = window.multigraph.core.Pan,
        xmlString = '<pan allowed="yes" min="0" max="5"/>',
        $xml,
        pan;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = $(xmlString);
        pan = Pan.parseXML($xml, "number");
    });

    it("should be able to parse a Pan from XML", function () {
        expect(pan).not.toBeUndefined();
        expect(pan instanceof Pan).toBe(true);
    });

    it("should be able to parse a pan from XML and read its 'allowed' attribute", function () {
        expect(pan.allowed()).toBe(true);
    });

    it("should be able to parse a pan from XML and read its 'min' attribute", function () {
        expect(pan.min().getRealValue()).toBe(0);
    });

    it("should be able to parse a pan from XML and read its 'max' attribute", function () {
        expect(pan.max().getRealValue()).toBe(5);
    });

    it("should be able to parse a pan from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<pan allowed="no"/>';
        expect(pan.serialize()).toBe(xmlString);
        pan = Pan.parseXML($(xmlString2), "number");
        expect(pan.serialize()).toBe(xmlString2);
    });

});
