/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Labels parsing", function () {
    "use strict";

    var Labels = window.multigraph.core.Labels,
        Labeler = window.multigraph.core.Labeler,
        Axis = window.multigraph.core.Axis,
        xmlString = '<labels'
        +    ' start="10"'
        +    ' angle="9"'
        +    ' densityfactor="0.5"'
        +    ' format="%1d"'
        +    ' anchor="0,0"'
        +    ' position="1,1"'
        +    ' spacing="100 75 50 25 10 5 2 1 0.5 0.1"'
        +    '/>',
        $xml,
        labels;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = $(xmlString);
        labels = Labels.parseXML($xml, new Axis("horizontal"));
    });

    it("should be able to parse a labels from XML", function () {
        expect(labels).not.toBeUndefined();
    });

    it("should be able to parse a labels from XML and read its 'formatter' attribute", function () {
        expect(labels.formatter()).toBe("%1d");
    });

    it("should be able to parse a labels from XML and read its 'start' attribute", function () {
        expect(labels.start()).toBe("10");
    });

    it("should be able to parse a labels from XML and read its 'angle' attribute", function () {
        expect(labels.angle()).toBe(9);
    });

    it("should be able to parse a labels from XML and read its 'position' attribute", function () {
        expect(labels.position().serialize()).toEqual("1,1");
    });

    it("should be able to parse a labels from XML and read its 'anchor' attribute", function () {
        expect(labels.anchor().serialize()).toEqual("0,0");
    });

    it("should be able to parse a labels from XML and read its 'densityfactor' attribute", function () {
        expect(labels.densityfactor()).toEqual(0.5);
    });

    it("should be able to parse a labels from XML and read its 'spacing' attribute", function () {
        expect(labels.spacing()).toBe("100 75 50 25 10 5 2 1 0.5 0.1");
    });

    it("should be able to parse a labels from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<labels'
            +    ' start="5"'
            +    ' angle="9"'
            +    ' densityfactor="0.8"'
            +    ' format="%2d"'
            +    ' anchor="0,0"'
            +    ' position="0,1"'
            +    ' spacing="100 75 50 25 10 5 2 1 0.5 0.1"'
            +    '/>';
        expect(labels.serialize()).toEqual(xmlString);
        labels = Labels.parseXML($(xmlString2), new Axis("vertical"));
        expect(labels.serialize()).toEqual(xmlString2);
    });

    describe("Label parsing", function () {

        beforeEach(function () {
            xmlString = '<labels'
                +   ' start="0"'
                +   ' angle="9"'
                +   ' densityfactor="0.5"'
                +   ' format="%1d"'
                +   ' anchor="1,1"'
                +   ' position="-1,1"'
                +   '>'
                + '<label'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.5"'
                +     ' spacing="100"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.5"'
                +     ' spacing="75"'
                +     ' format="%1d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.5"'
                +     ' spacing="50"'
                +     ' format="%2d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.5"'
                +     ' spacing="25"'
                +     ' format="%2d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.5"'
                +     ' spacing="1"'
                +     ' format="%2d"'
                +     ' anchor="0,0"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.8"'
                +     ' spacing="0.5"'
                +     ' format="%2d"'
                +     ' anchor="1,1"'
                +     ' position="1,1"'
                +     '/>'
                + '<label'
                +     ' start="10"'
                +     ' angle="9"'
                +     ' densityfactor="0.8"'
                +     ' spacing="0.1"'
                +     ' format="%2d"'
                +     ' anchor="1,1"'
                +     ' position="1,1"'
                +     '/>'
                + '</labels>';
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, 'parseXML', 'serialize');
            $xml = $(xmlString);
            labels = Labels.parseXML($xml, new Axis("horizontal"));
        });

        it("should be able to parse a labels with children from XML", function () {
            expect(labels).not.toBeUndefined();
            expect(labels instanceof Labels).toBe(true);
        });

        it("children should be instances of the 'label' tag", function () {
            expect(labels.axis().labelers().at(0) instanceof Labeler).toBe(true);
            expect(labels.axis().labelers().at(1) instanceof Labeler).toBe(true);
            expect(labels.axis().labelers().at(2) instanceof Labeler).toBe(true);
        });

        it("should be able to parse a labels with children from XML, serialize it and get the same XML as the original", function () {
            expect(labels.serialize()).toBe(xmlString);
        });

    });
});
