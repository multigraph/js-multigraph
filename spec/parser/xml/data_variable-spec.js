/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint  laxbreak:true */

describe("Data DataVariable XML parsing", function () {
    "use strict";

    var DataVariable = require('../../../src/core/data_variable.js'),
        DataValue = require('../../../src/core/data_value.js'),
        xmlString,
        $xml,
        variable,
        idString = "x",
        columnString = "7",
        typeString = "number",
        missingvalueString = "1990",
        missingopString = "eq";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<variable'
            +     ' id="x"'
            +     ' column="7"'
            +     ' type="number"'
            +     ' missingvalue="1990"'
            +     ' missingop="eq"'
            +     '/>';
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        variable = DataVariable.parseXML($xml);
    });

    it("should be able to parse a DataVariable from XML", function () {
        expect(variable).not.toBeUndefined();
        expect(variable instanceof DataVariable).toBe(true);
    });

    it("should be able to parse a variable from XML and read its 'id' attribute", function () {
        expect(variable.id()).toEqual(idString);
    });

    it("should be able to parse a variable from XML and read its 'column' attribute", function () {
        expect(variable.column()).toEqual(parseInt(columnString, 10));
    });

    it("should be able to parse a variable from XML and read its 'type' attribute", function () {
        expect(variable.type()).toEqual(DataValue.parseType(typeString));
    });

    it("should be able to parse a variable from XML and read its 'missingvalue' attribute", function () {
        expect(variable.missingvalue().getRealValue()).toEqual((DataValue.parse(DataValue.parseType(typeString), missingvalueString)).getRealValue());
    });

    it("should be able to parse a variable from XML and read its 'missingop' attribute", function () {
        expect(variable.missingop()).toEqual(DataValue.parseComparator(missingopString));
    });

});
