/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Graph Title XML parsing", function () {
    "use strict";

    var Title = require('../../../src/core/title.js'),
        Graph = require('../../../src/core/graph.js'),
        Text = require('../../../src/core/text.js'),
        Point = require('../../../src/math/point.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        xmlString,
        $xml,
        title,
        graph = new Graph(),
        frameString = "padding",
        colorString = "0xfffaab",
        bordercolorString = "0x127752",
        borderString = "2",
        opacityString = "0",
        paddingString = "4",
        cornerradiusString = "10",
        anchorString = "1,1",
        baseString = "0,0",
        positionString ="-1,1",
        text = "Graph Title";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<title'
            +     ' color="' + colorString + '"'
            +     ' bordercolor="' + bordercolorString + '"'
            +     ' border="' + borderString + '"'
            +     ' opacity="' + opacityString + '"'
            +     ' padding="' + paddingString + '"'
            +     ' cornerradius="' + cornerradiusString + '"'
            +     ' anchor="' + anchorString + '"'
            +     ' base="' + baseString + '"'
            +     ' position="' + positionString + '"'
            +     ' frame="' + frameString + '"'
            +     '>'
            +       text
            + '</title>',
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        title = Title.parseXML($xml, graph);
    });

    it("should be able to parse a Title from XML", function () {
        expect(title).not.toBeUndefined();
        expect(title instanceof Title).toBe(true);
    });

    it("should parse a title from XML and properly store its 'graph' pointer", function () {
        expect(title.graph()).toBe(graph);
    });

    it("should be able to parse a title from XML and read its 'frame' attribute", function () {
        expect(title.frame()).toEqual(frameString.toLowerCase());
    });

    it("should be able to parse a title from XML and read its 'border' attribute", function () {
        expect(title.border()).toEqual(parseInt(borderString, 10));
    });

    it("should be able to parse a title from XML and read its 'color' attribute", function () {
        expect(title.color().getHexString("0x")).toEqual((RGBColor.parse(colorString)).getHexString("0x"));
    });

    it("should be able to parse a title from XML and read its 'bordercolor' attribute", function () {
        expect(title.bordercolor().getHexString()).toEqual((RGBColor.parse(bordercolorString)).getHexString("0x"));
    });

    it("should be able to parse a title from XML and read its 'opacity' attribute", function () {
        expect(title.opacity()).toEqual(parseFloat(opacityString));
    });

    it("should be able to parse a title from XML and read its 'padding' attribute", function () {
        expect(title.padding()).toEqual(parseInt(paddingString, 10));
    });

    it("should be able to parse a title from XML and read its 'cornerradius' attribute", function () {
        expect(title.cornerradius()).toEqual(parseInt(cornerradiusString, 10));
    });

    it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
        expect(title.anchor().x()).toEqual((Point.parse(anchorString)).x());
        expect(title.anchor().y()).toEqual((Point.parse(anchorString)).y());
    });

    it("should be able to parse a title from XML and read its 'base' attribute", function () {
        expect(title.base().x()).toEqual((Point.parse(baseString)).x());
        expect(title.base().y()).toEqual((Point.parse(baseString)).y());
    });

    it("should be able to parse a title from XML and read its 'position' attribute", function () {
        expect(title.position().x()).toEqual((Point.parse(positionString)).x());
        expect(title.position().y()).toEqual((Point.parse(positionString)).y());
    });

    it("should be able to parse a title from XML and read its 'content'", function () {
        expect(title.text().string()).toEqual(new Text(text).string());
    });

});
