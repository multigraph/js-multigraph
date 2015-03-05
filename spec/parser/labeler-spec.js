/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Label parsing", function () {
    "use strict";

    var Labeler = require('../../src/core/labeler.js'),
        Axis = require('../../src/core/axis.js'),
        DataFormatter = require('../../src/core/data_formatter.js'),
        DataMeasure = require('../../src/core/data_measure.js'),
        DataValue = require('../../src/core/data_value.js'),
        Point = require('../../src/math/point.js'),
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

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
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
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
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
