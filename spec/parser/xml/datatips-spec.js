/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Datatips XML parsing", function () {
    "use strict";

    var Datatips = require('../../../src/core/datatips.js'),
        DatatipsVariable = require('../../../src/core/datatips_variable.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        xmlString,
        $xml,
        datatips,
        bgcolorString = "0x123456",
        bordercolorString = "0xfffbbb",
        formatString = "number",
        bgalphaString = "1",
        borderString = "2",
        padString = "1";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<datatips'
            +     ' bgcolor="' + bgcolorString + '"'
            +     ' bordercolor="' + bordercolorString + '"'
            +     ' format="' + formatString + '"'
            +     ' bgalpha="' + bgalphaString + '"'
            +     ' border="' + borderString + '"'
            +     ' pad="' + padString + '"'
            +     '/>';
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        datatips = Datatips.parseXML($xml);
    });

    it("should be able to parse a datatips from XML", function () {
        expect(datatips).not.toBeUndefined();
        expect(datatips instanceof Datatips).toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'formatString' attribute", function () {
        expect(datatips.formatString()).toEqual(formatString);
    });

    it("should be able to parse a datatips from XML and read its 'bgcolor' attribute", function () {
        expect(datatips.bgcolor().getHexString("0x")).toEqual((RGBColor.parse(bgcolorString)).getHexString("0x"));
    });

    it("should be able to parse a datatips from XML and read its 'bgalpha' attribute", function () {
        expect(datatips.bgalpha()).toEqual(parseFloat(bgalphaString));
    });

    it("should be able to parse a datatips from XML and read its 'border' attribute", function () {
        expect(datatips.border()).toEqual(parseInt(borderString, 10));
    });

    it("should be able to parse a datatips from XML and read its 'bordercolor' attribute", function () {
        expect(datatips.bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolorString)).getHexString("0x"));
    });

    it("should be able to parse a datatips from XML and read its 'pad' attribute", function () {
        expect(datatips.pad()).toEqual(parseInt(padString, 10));
    });

    describe("Variable parsing", function () {
        describe("with a single variable child tag", function () {
            var variable1FormatString = "number";

            beforeEach(function () {
                xmlString = ''
                    + '<datatips'
                    +     ' bgcolor="0x123456"'
                    +     ' bordercolor="0xba789b"'
                    +     ' format="datetime"'
                    +     ' bgalpha="5"'
                    +     ' border="7"'
                    +     ' pad="2"'
                    +     '>'
                    +   '<variable'
                    +       ' format="' + variable1FormatString + '"'
                    +       '/>'
                    + '</datatips>';
                $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
                datatips = Datatips.parseXML($xml);
            });

            it("should be able to parse a datatips with a variable child tag from XML", function () {
                expect(datatips).not.toBeUndefined();
                expect(datatips instanceof Datatips).toBe(true);
            });

            it("should properly parse the variable children of a datatips with a variable child tag from XML", function () {
                expect(datatips.variables().size()).toEqual(1);
                expect(datatips.variables().at(0) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(0).formatString()).toEqual(variable1FormatString);
            });

        });

        describe("with multiple variable child tags", function () {
            var variable1FormatString = "number",
                variable2FormatString = "number",
                variable3FormatString = "datetime";

            beforeEach(function () {
                xmlString = ''
                    + '<datatips'
                    +     ' bgcolor="0x123456"'
                    +     ' bordercolor="0xba789b"'
                    +     ' format="datetime"'
                    +     ' bgalpha="5"'
                    +     ' border="7"'
                    +     ' pad="2"'
                    +     '>'
                    +   '<variable'
                    +       ' format="' + variable1FormatString + '"'
                    +       '/>'
                    +   '<variable'
                    +       ' format="' + variable2FormatString + '"'
                    +       '/>'
                    +   '<variable'
                    +       ' format="' + variable3FormatString + '"'
                    +       '/>'
                    + '</datatips>';
                $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
                datatips = Datatips.parseXML($xml);
            });

            it("should be able to parse a datatips with multiple variable child tags from XML", function () {
                expect(datatips).not.toBeUndefined();
                expect(datatips instanceof Datatips).toBe(true);
            });

            it("should properly parse the variable children of a datatips with multiple variable child tags from XML", function () {
                expect(datatips.variables().size()).toEqual(3);
                expect(datatips.variables().at(0) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(0).formatString()).toEqual(variable1FormatString);
                expect(datatips.variables().at(1) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(1).formatString()).toEqual(variable2FormatString);
                expect(datatips.variables().at(2) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(2).formatString()).toEqual(variable3FormatString);
            });

        });

    });

});
