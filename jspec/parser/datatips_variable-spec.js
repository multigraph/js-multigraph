/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("DatatipsVariable parsing", function () {
    "use strict";

    var DatatipsVariable = require('../../src/core/datatips_variable.js'),
        xmlString,
        $xml,
        variable,
        formatString = "number";

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<variable'
            +     ' format="' + formatString + '"'
            +     '/>',
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        variable = DatatipsVariable.parseXML($xml);
    });

    it("should be able to parse a variable from XML", function () {
        expect(variable).not.toBeUndefined();
        expect(variable instanceof DatatipsVariable).toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'format' attribute", function () {
        expect(variable.format()).toEqual(formatString);
    });

});
