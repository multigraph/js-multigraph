/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Grid parsing", function () {
    "use strict";

    var Grid = require('../../src/core/grid.js'),
        RGBColor = require('../../src/math/rgb_color.js'),
        xmlString,
        $xml,
        grid,
        colorString = "0x984545",
        visibleBool = false;

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<grid'
            +     ' color="' + colorString + '"'
            +     ' visible="' + visibleBool + '"'
            +     '/>';
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        grid = Grid.parseXML($xml);
    });

    it("should be able to parse a grid from XML", function () {
        expect(grid).not.toBeUndefined();
        expect(grid instanceof Grid).toBe(true);
    });

    it("should be able to parse a grid from XML and read its 'color' attribute", function () {
        expect(grid.color().getHexString("0x")).toEqual((RGBColor.parse(colorString)).getHexString("0x"));
    });

    it("should be able to parse a grid from XML and read its 'visible' attribute", function () {
        expect(grid.visible()).toEqual(visibleBool);
    });

});
