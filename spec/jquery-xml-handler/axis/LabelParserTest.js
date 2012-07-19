/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Label parsing", function () {
    "use strict";

    var Label = window.multigraph.Axis.Labels.Label,
        xmlString = '<label format="%2d" start="7" angle="45" position="-1 1" anchor="1 1" densityfactor=".9" spacing="200 100 75 50"/>',
        $xml,
        label;

    beforeEach(function () {
        window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        label = Label.parseXML($xml);
    });

    it("should be able to parse a Label from XML", function () {
        expect(label).not.toBeUndefined();
        expect(label instanceof Label).toBe(true);
    });

    it("should be able to parse a label from XML and read its 'format' attribute", function () {
        expect(label.format() === '%2d').toBe(true);
    });

    it("should be able to parse a label from XML and read its 'start' attribute", function () {
        expect(label.start() === '7').toBe(true);
    });

    it("should be able to parse a label from XML and read its 'angle' attribute", function () {
        expect(label.angle()).toBe(45);
    });

    it("should be able to parse a label from XML and read its 'position' attribute", function () {
        expect(label.position() === '-1 1').toBe(true);
    });

    it("should be able to parse a label from XML and read its 'anchor' attribute", function () {
        expect(label.anchor() === '1 1').toBe(true);
    });

    it("should be able to parse a label from XML and read its 'spacing' attribute", function () {
        expect(label.spacing() === '200 100 75 50').toBe(true);
    });

    it("should be able to parse a label from XML and read its 'densityfactor' attribute", function () {
        expect(label.densityfactor() === '.9').toBe(true);
    });

    it("should be able to parse a label from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<label start="10" angle="-30" anchor="1 1" spacing="25 10"/>';
        expect(label.serialize() === xmlString).toBe(true);
        label = Label.parseXML($(xmlString2));
        expect(label.serialize() === xmlString2).toBe(true);
    });

});
