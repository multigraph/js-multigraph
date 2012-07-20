/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Labels parsing", function () {
    "use strict";

    var Labels = window.multigraph.Axis.Labels,
        xmlString = '<labels format="%1d" start="10" angle="9" position="1 1" anchor="0 0" densityfactor=".5" function="fun" spacing="100 75 50 25 10 5 2 1 0.5 0.1"/>',
        $xml,
        labels;

    beforeEach(function () {
        window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
        $xml = $(xmlString);
        labels = Labels.parseXML($xml);
    });

    it("should be able to parse a labels from XML", function () {
        expect(labels).not.toBeUndefined();
    });

    it("should be able to parse a labels from XML and read its 'format' attribute", function () {
        expect(labels.format() === '%1d').toBe(true);
    });

    it("should be able to parse a labels from XML and read its 'start' attribute", function () {
        expect(labels.start() === '10').toBe(true);
    });

    it("should be able to parse a labels from XML and read its 'angle' attribute", function () {
        expect(labels.angle()).toBe(9);
    });

    it("should be able to parse a labels from XML and read its 'position' attribute", function () {
        expect(labels.position() === '1 1').toBe(true);
    });

    it("should be able to parse a labels from XML and read its 'anchor' attribute", function () {
        expect(labels.anchor() === '0 0').toBe(true);
    });

    it("should be able to parse a labels from XML and read its 'function' attribute", function () {
        expect(labels['function']() === 'fun').toBe(true);
    });

    it("should be able to parse a labels from XML and read its 'densityfactor' attribute", function () {
        expect(labels.densityfactor() === '.5').toBe(true);
    });

    it("should be able to parse a labels from XML and read its 'spacing' attribute", function () {
        expect(labels.spacing() === '100 75 50 25 10 5 2 1 0.5 0.1').toBe(true);
    });

    it("should be able to parse a labels with children from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<labels format="%2d" angle="9" position="0 1" anchor="0 0" densityfactor=".8" spacing="100 75 50 25 10 5 2 1 0.5 0.1"/>';
        expect(labels.serialize() === xmlString).toBe(true);
        labels = Labels.parseXML($(xmlString2));
//        expect(labels.serialize() === xmlString2).toBe(true);
    });

    describe("Label parsing", function () {
        var Label = window.multigraph.Axis.Labels.Label;

        beforeEach(function () {
            xmlString = '<labels'
                +   ' format="%1d"'
                +   ' start="0"'
                +   ' angle="9"'
                +   ' position="-1 1"'
                +   ' anchor="0,0"'
                +   ' densityfactor=".5"'
                +   ' function="larry"'
                +   '>'
                + '<label'
                +     ' start="10"'
                +     ' spacing="100 75"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' format="%2d"'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.5"'
                +     ' spacing="50 25 10 5 2 1"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' format="%2d"'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.8"'
                +     ' spacing="0.5 0.1"'
                +     ' position="1,1"'
                +     '/>'
                + '</labels>';
            window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            labels = Labels.parseXML($xml);
        })

        it("should be able to parse a labels with children from XML", function () {
            expect(labels).not.toBeUndefined();
            expect(labels instanceof Labels).toBe(true);
        });

        it("children should be instances of the 'label' tag", function () {
            expect(labels.label().at(0) instanceof Label).toBe(true);
            expect(labels.label().at(1) instanceof Label).toBe(true);
            expect(labels.label().at(2) instanceof Label).toBe(true);
        });

        it("should be able to parse a labels with children from XML, serialize it and get the same XML as the original", function () {
            expect(labels.serialize()).toBe(xmlString);
        });

    });
});
