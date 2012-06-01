/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.Axis;
    var jQueryXMLHandler = window.multigraph.jQueryXMLHandler;
    var xmlString = '<horizontalaxis id="x" min="0" max="10"/>';
    var $xml;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
    });

    it("should be able to parse an axis from XML", function () {
	var a = Axis.parseXML($xml, 'horizontal');
        expect(a).not.toBeUndefined();
    });

    it("should be able to parse an axis from XML and read its 'id' attribute", function () {
	var a = Axis.parseXML($xml, 'horizontal');
        expect(a.id() === 'x').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'type' attribute", function () {
        var xmlString2 = '<verticalaxis id="y" type="number" max="10"/>';
	var b = Axis.parseXML($(xmlString2), 'vertical');
        expect(b.type() === 'number').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'min' attribute", function () {
	var a = Axis.parseXML($xml, 'horizontal');
        expect(a.min() === '0').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'max' attribute", function () {
	var a = Axis.parseXML($xml, 'horizontal');
        expect(a.max() === '10').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'anchor' attribute", function () {
        var xmlString2 = '<verticalaxis id="y" type="number" max="10" anchor="-1" base="0 1" position="0 0"/>';
	var b = Axis.parseXML($(xmlString2), 'vertical');
        expect(b.anchor() === '-1').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'base' attribute", function () {
        var xmlString2 = '<verticalaxis id="y" type="number" max="10" anchor="-1" base="0 1" position="0 0"/>';
	var b = Axis.parseXML($(xmlString2), 'vertical');
        expect(b.base() === '0 1').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'position' attribute", function () {
        var xmlString2 = '<verticalaxis id="y" type="number" max="10" anchor="-1" base="0 1" position="0 0"/>';
	var b = Axis.parseXML($(xmlString2), 'vertical');
        expect(b.position() === '0 0').toBe(true);
    });

    it("should be able to parse an axis from XML, then serialize it, and get the same XML as the original", function () {
        var xmlString2 = '<verticalaxis id="y" type="datetime" max="10"/>';
	var a = Axis.parseXML($xml, 'horizontal');
	var b = Axis.parseXML($(xmlString2), 'vertical');
        expect(a.serialize() === xmlString).toBe(true);
        expect(b.serialize() === xmlString2).toBe(true);
    });

});
