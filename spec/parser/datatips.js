/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Datatips parsing", function () {
    "use strict";

    var Datatips = window.multigraph.core.Datatips,
        DatatipsVariable = window.multigraph.core.DatatipsVariable,
        RGBColor = window.multigraph.math.RGBColor,
        xmlString,
        $xml,
        datatips,
        bgcolorString = "0x123456",
        bordercolorString = "0xfffbbb",
        formatString = "number",
        bgalphaString = "1",
        borderString = "2",
        padString = "1";

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<datatips'
            +     ' bgcolor="' + bgcolorString + '"'
            +     ' bordercolor="' + bordercolorString + '"'
            +     ' format="' + formatString + '"'
            +     ' bgalpha="' + bgalphaString + '"'
            +     ' border="' + borderString + '"'
            +     ' pad="' + padString + '"'
            +     '/>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        datatips = Datatips.parseXML($xml);
    });

    it("should be able to parse a datatips from XML", function () {
        expect(datatips).not.toBeUndefined();
        expect(datatips instanceof Datatips).toBe(true);
    });

    it("should be able to parse a datatips from XML and read its 'format' attribute", function () {
        expect(datatips.format()).toEqual(formatString);
    });

    it("should be able to parse a datatips from XML and read its 'bgcolor' attribute", function () {
        expect(datatips.bgcolor().getHexString("0x")).toEqual((RGBColor.parse(bgcolorString)).getHexString("0x"));
    });

    it("should be able to parse a datatips from XML and read its 'bgalpha' attribute", function () {
        expect(datatips.bgalpha()).toEqual(bgalphaString);
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
                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                datatips = Datatips.parseXML($xml);
            });

            it("should be able to parse a datatips with a variable child tag from XML", function () {
                expect(datatips).not.toBeUndefined();
                expect(datatips instanceof Datatips).toBe(true);
            });

            it("should properly parse the variable children of a datatips with a variable child tag from XML", function () {
                expect(datatips.variables().size()).toEqual(1);
                expect(datatips.variables().at(0) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(0).format()).toEqual(variable1FormatString);
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
                $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
                datatips = Datatips.parseXML($xml);
            });

            it("should be able to parse a datatips with multiple variable child tags from XML", function () {
                expect(datatips).not.toBeUndefined();
                expect(datatips instanceof Datatips).toBe(true);
            });

            it("should properly parse the variable children of a datatips with multiple variable child tags from XML", function () {
                expect(datatips.variables().size()).toEqual(3);
                expect(datatips.variables().at(0) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(0).format()).toEqual(variable1FormatString);
                expect(datatips.variables().at(1) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(1).format()).toEqual(variable2FormatString);
                expect(datatips.variables().at(2) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(2).format()).toEqual(variable3FormatString);
            });

        });

    });

});
