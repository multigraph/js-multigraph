/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Filter parsing", function () {
    "use strict";

    var Filter = require('../../src/core/filter.js'),
        FilterOption = require('../../src/core/filter_option.js'),
        xmlString,
        $xml,
        filter,
        typeString = "number";

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<filter'
            +     ' type="' + typeString + '"'
            +     '/>';
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        filter = Filter.parseXML($xml);
    });

    it("should be able to parse a filter from XML", function () {
        expect(filter).not.toBeUndefined();
        expect(filter instanceof Filter).toBe(true);
    });

    it("should be able to parse a filter from XML and read its 'type' attribute", function () {
        expect(filter.type()).toEqual(typeString);
    });

    describe("Option parsing", function () {

        describe("with one option child tag", function () {
            var option1NameString = "x1",
                option1ValueString = "9000";

            beforeEach(function () {
                xmlString = ''
                    + '<filter'
                    +     ' type="number"'
                    +     '>'
                    +   '<option'
                    +       ' name="' + option1NameString + '"'
                    +       ' value="' + option1ValueString + '"'
                    +       '/>'
                    + '</filter>';
                $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
                filter = Filter.parseXML($xml);
            });

            it("should be able to parse a filter with a option child tag from XML", function () {
                expect(filter).not.toBeUndefined();
                expect(filter instanceof Filter).toBe(true);
            });

            it("should properly parse the option children of a filter with a option child tag from XML", function () {
                expect(filter.options().size()).toEqual(1);
                expect(filter.options().at(0) instanceof FilterOption).toBe(true);
                expect(filter.options().at(0).name()).toEqual(option1NameString);
                expect(filter.options().at(0).value()).toEqual(option1ValueString);
            });

        });

        describe("with multiple option child tags", function () {
            var option1NameString = "x1",
                option1ValueString = "9000",
                option2NameString = "x2",
                option2ValueString = "8000",
                option3NameString = "x3",
                option3ValueString = "7000";

            beforeEach(function () {
                xmlString = ''
                    + '<filter'
                    +     ' type="number"'
                    +     '>'
                    +   '<option'
                    +       ' name="' + option1NameString + '"'
                    +       ' value="' + option1ValueString + '"'
                    +       '/>'
                    +   '<option'
                    +       ' name="' + option2NameString + '"'
                    +       ' value="' + option2ValueString + '"'
                    +       '/>'
                    +   '<option'
                    +       ' name="' + option3NameString + '"'
                    +       ' value="' + option3ValueString + '"'
                    +       '/>'
                    + '</filter>';
                $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
                filter = Filter.parseXML($xml);
            });

            it("should be able to parse a filter with multiple option child tags from XML", function () {
                expect(filter).not.toBeUndefined();
                expect(filter instanceof Filter).toBe(true);
            });

            it("should properly parse the option children of a filter with multiple option child tags from XML", function () {
                expect(filter.options().size()).toEqual(3);
                expect(filter.options().at(0) instanceof FilterOption).toBe(true);
                expect(filter.options().at(1) instanceof FilterOption).toBe(true);
                expect(filter.options().at(2) instanceof FilterOption).toBe(true);
                expect(filter.options().at(0).name()).toEqual(option1NameString);
                expect(filter.options().at(0).value()).toEqual(option1ValueString);
                expect(filter.options().at(1).name()).toEqual(option2NameString);
                expect(filter.options().at(1).value()).toEqual(option2ValueString);
                expect(filter.options().at(2).name()).toEqual(option3NameString);
                expect(filter.options().at(2).value()).toEqual(option3ValueString);
            });

        });

    });

});
