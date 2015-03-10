/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Pan XML parsing", function () {
    "use strict";

    var Pan = require('../../../src/core/pan.js'),
        DataValue = require('../../../src/core/data_value.js'),
        xmlString,
        $xml,
        pan,
        allowedString = "yes",
        allowedBool = true,
        minString = "0",
        maxString = "5",
        type = "number";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<pan'
            +    ' allowed="' + allowedString + '"'
            +    ' min="' + minString + '"'
            +    ' max="' + maxString + '"'
            +    '/>';
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        pan = Pan.parseXML($xml, type);
    });

    it("should be able to parse a Pan from XML", function () {
        expect(pan).not.toBeUndefined();
        expect(pan instanceof Pan).toBe(true);
    });

    it("should be able to parse a pan from XML and read its 'allowed' attribute", function () {
        expect(pan.allowed()).toEqual(allowedBool);
    });

    it("should be able to parse a pan from XML and read its 'min' attribute", function () {
        expect(pan.min().getRealValue()).toEqual((DataValue.parse(type, minString)).getRealValue());
    });

    it("should be able to parse a pan from XML and read its 'max' attribute", function () {
        expect(pan.max().getRealValue()).toEqual((DataValue.parse(type, maxString)).getRealValue());
    });

});
