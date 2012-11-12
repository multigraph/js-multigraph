/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Label parsing", function () {
    "use strict";

    var Labeler = window.multigraph.core.Labeler,
        Axis = window.multigraph.core.Axis,
        DataFormatter = window.multigraph.core.DataFormatter,
        DataMeasure = window.multigraph.core.DataMeasure,
        DataValue = window.multigraph.core.DataValue,
        Point = window.multigraph.math.Point,
        xmlString,
        $xml,
        labeler,
        startString = "7",
        angleString = "45",
        formatString = "%2d",
        anchorString = "1,1",
        positionString = "-1,1",
        spacingString = "200",
        densityfactorString = "0.9",
        axisType = DataValue.NUMBER;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<label'
            +    ' start="' + startString + '"'
            +    ' angle="' + angleString + '"'
            +    ' format="' + formatString + '"'
            +    ' anchor="' + anchorString + '"'
            +    ' position="' + positionString + '"'
            +    ' spacing="' + spacingString + '"'
            +    ' densityfactor="' + densityfactorString + '"'
            +    '/>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        labeler = Labeler.parseXML($xml, (new Axis(Axis.HORIZONTAL)).type(axisType));
    });

    it("should be able to parse a Labeler from XML", function () {
        expect(labeler).not.toBeUndefined();
        expect(labeler instanceof Labeler).toBe(true);
    });

    it("should be able to parse a labeler from XML and read its 'formatter' attribute", function () {
        expect(labeler.formatter().getFormatString()).toEqual((DataFormatter.create(axisType, formatString)).getFormatString());
    });

    it("should be able to parse a labeler from XML and read its 'start' attribute", function () {
        expect(labeler.start().getRealValue()).toEqual((DataValue.parse(axisType, startString)).getRealValue());
    });

    it("should be able to parse a labeler from XML and read its 'angle' attribute", function () {
        expect(labeler.angle()).toEqual(parseFloat(angleString));
    });

    it("should be able to parse a labeler from XML and read its 'position' attribute", function () {
        expect(labeler.position().x()).toEqual((Point.parse(positionString)).x());
        expect(labeler.position().y()).toEqual((Point.parse(positionString)).y());
    });

    it("should be able to parse a labeler from XML and read its 'anchor' attribute", function () {
        expect(labeler.anchor().x()).toEqual((Point.parse(anchorString)).x());
        expect(labeler.anchor().y()).toEqual((Point.parse(anchorString)).y());
    });

    it("should be able to parse a labeler from XML and read its 'spacing' attribute", function () {
        expect(labeler.spacing().getRealValue()).toEqual((DataMeasure.parse(axisType, spacingString)).getRealValue());
    });

    it("should be able to parse a labeler from XML and read its 'densityfactor' attribute", function () {
        expect(labeler.densityfactor()).toEqual(parseFloat(densityfactorString));
    });

});
