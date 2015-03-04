/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plotarea parsing", function () {
    "use strict";

    var Plotarea = require('../../src/core/plotarea.js'),
        RGBColor = require('../../src/math/rgb_color.js'),
        xmlString,
        $xml,
        plotarea,
        margintopString = "5",
        marginleftString = "10",
        marginbottomString = "19",
        marginrightString = "5",
        bordercolorString = "0x111223",
        borderString = "0";

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<plotarea'
            +     ' margintop="' + margintopString + '"'
            +     ' marginleft="' + marginleftString + '"'
            +     ' marginbottom="' + marginbottomString + '"'
            +     ' marginright="' + marginrightString + '"'
            +     ' bordercolor="' + bordercolorString + '"'
            +     ' border="' + borderString + '"'
            +     '/>',
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        plotarea = Plotarea.parseXML($xml);
    });

    it("should be able to parse a Plotarea from XML", function () {
        expect(plotarea).not.toBeUndefined();
        expect(plotarea instanceof Plotarea).toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'margin().bottom' attribute", function () {
        expect(plotarea.margin().bottom()).toEqual(parseInt(marginbottomString, 10));
    });

    it("should be able to parse a plotarea from XML and read its 'margin().left' attribute", function () {
        expect(plotarea.margin().left()).toEqual(parseInt(marginleftString, 10));
    });

    it("should be able to parse a plotarea from XML and read its 'margin().top' attribute", function () {
        expect(plotarea.margin().top()).toEqual(parseInt(margintopString, 10));
    });

    it("should be able to parse a plotarea from XML and read its 'margin().right' attribute", function () {
        expect(plotarea.margin().right()).toEqual(parseInt(marginrightString, 10));
    });

    it("should be able to parse a plotarea from XML and read its 'border' attribute", function () {
        expect(plotarea.border()).toEqual(parseInt(borderString, 10));
    });

    it("should be able to parse a plotarea from XML and read its 'bordercolor' attribute", function () {
        expect(plotarea.bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolorString)).getHexString("0x"));
    });

});
