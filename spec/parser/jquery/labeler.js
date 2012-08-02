/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Label parsing", function () {
    "use strict";

    var Labeler = window.multigraph.core.Labeler,
        xmlString = '<label'
        +    ' start="7"'
        +    ' angle="45"'
        +    ' densityfactor="0.9"'
        +    ' spacing="200"'
        +    ' format="%2d"'
        +    ' anchor="1,1"'
        +    ' position="-1,1"'
        +    '/>',
        $xml,
        labeler;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = $(xmlString);
        labeler = Labeler.parseXML($xml);
    });

    it("should be able to parse a Labeler from XML", function () {
        expect(labeler).not.toBeUndefined();
        expect(labeler instanceof Labeler).toBe(true);
    });

    it("should be able to parse a labeler from XML and read its 'formatter' attribute", function () {
        expect(labeler.formatter()).toBe("%2d");
    });

    it("should be able to parse a labeler from XML and read its 'start' attribute", function () {
        expect(labeler.start()).toBe("7");
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
        expect(labeler.spacing()).toBe("200");
    });

    it("should be able to parse a labeler from XML and read its 'densityfactor' attribute", function () {
        expect(labeler.densityfactor()).toEqual(0.9);
    });

    it("should be able to parse a labeler from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<label start="10" angle="-30" spacing="10" anchor="1,1"/>';
        expect(labeler.serialize()).toBe(xmlString);
        labeler = Labeler.parseXML($(xmlString2));
        expect(labeler.serialize()).toBe(xmlString2);
    });

});
