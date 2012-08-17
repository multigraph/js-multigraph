/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Label parsing", function () {
    "use strict";

    var Labeler = window.multigraph.core.Labeler,
        Axis = window.multigraph.core.Axis,
        DataValue = window.multigraph.core.DataValue,
        xmlString = '<label'
        +    ' start="7"'
        +    ' angle="45"'
        +    ' format="%2d"'
        +    ' anchor="1,1"'
        +    ' position="-1,1"'
        +    ' spacing="200"'
        +    ' densityfactor="0.9"'
        +    '/>',
        $xml,
        labeler;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        labeler = Labeler.parseXML($xml, (new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER));
    });

    it("should be able to parse a Labeler from XML", function () {
        expect(labeler).not.toBeUndefined();
        expect(labeler instanceof Labeler).toBe(true);
    });

    it("should be able to parse a labeler from XML and read its 'formatter' attribute", function () {
        expect(labeler.formatter().getFormatString()).toBe("%2d");
    });

    it("should be able to parse a labeler from XML and read its 'start' attribute", function () {
        expect(labeler.start().getRealValue()).toEqual(7);
    });

    it("should be able to parse a labeler from XML and read its 'angle' attribute", function () {
        expect(labeler.angle()).toBe(45);
    });

    it("should be able to parse a labeler from XML and read its 'position' attribute", function () {
        expect(labeler.position().serialize()).toEqual("-1,1");
    });

    it("should be able to parse a labeler from XML and read its 'anchor' attribute", function () {
        expect(labeler.anchor().serialize()).toEqual("1,1");
    });

    it("should be able to parse a labeler from XML and read its 'spacing' attribute", function () {
        expect(labeler.spacing().getRealValue()).toBe(200);
    });

    it("should be able to parse a labeler from XML and read its 'densityfactor' attribute", function () {
        expect(labeler.densityfactor()).toEqual(0.9);
    });

    it("should be able to parse a labeler from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<label start="10" angle="-30" anchor="1,1" spacing="10"/>';
        expect(labeler.serialize()).toBe(xmlString);
        labeler = Labeler.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2), new Axis(Axis.HORIZONTAL).type(DataValue.NUMBER));
        expect(labeler.serialize()).toBe(xmlString2);
    });

});
