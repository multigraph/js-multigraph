/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Filter Option parsing", function () {
    "use strict";

    var FilterOption = require('../../src/core/filter_option.js'),
        xmlString,
        $xml,
        option,
        nameString = "dotsize",
        valueString = "12";

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<option'
            +     ' name="' + nameString + '"'
            +     ' value="' + valueString + '"'
            +     '/>';
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        option = FilterOption.parseXML($xml);
    });

    it("should be able to parse an option from XML", function () {
        expect(option).not.toBeUndefined();
        expect(option instanceof FilterOption).toBe(true);
    });

    it("should be able to parse a option from XML and read its 'name' attribute", function () {
        expect(option.name()).toEqual(nameString);
    });

    it("should be able to parse a option from XML and read its 'value' attribute", function () {
        expect(option.value()).toEqual(valueString);
    });

});
