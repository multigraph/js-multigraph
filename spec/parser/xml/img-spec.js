/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Background Img XML parsing", function () {
    "use strict";

    var Img = require('../../../src/core/img.js'),
        Point = require('../../../src/math/point.js'),
        xmlString,
        $xml,
        image,
        srcString = "http://www.example.com/example_img.png",
        frameString = "plot",
        anchorString = "1,1",
        baseString = "0,0",
        positionString = "-1,1";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function() {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($),
        xmlString = ''
            + '<?xml version="1.0" encoding="UTF-8"?><img'
            +    ' src="' + srcString + '"'
            +    ' frame="' + frameString + '"'
            +    ' anchor="' + anchorString + '"'
            +    ' base="' + baseString + '"'
            +    ' position="' + positionString + '"'
            +    '></img>';
        var $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        image = Img.parseXML($xml);
    });

    it("should be able to parse a background from XML", function () {
        expect(image).not.toBeUndefined();
        expect(image instanceof Img).toBe(true);
    });

    it("should be able to parse a img from XML and read its 'src' attribute", function () {
        expect(image.src()).toBe(srcString);
    });

    it("should be able to parse a img from XML and read its 'anchor' attribute", function () {
        expect(image.anchor().x()).toEqual((Point.parse(anchorString)).x());
        expect(image.anchor().y()).toEqual((Point.parse(anchorString)).y());
    });

    it("should be able to parse a img from XML and read its 'base' attribute", function () {
        expect(image.base().x()).toEqual((Point.parse(baseString)).x());
        expect(image.base().y()).toEqual((Point.parse(baseString)).y());
    });

    it("should be able to parse a img from XML and read its 'position' attribute", function () {
        expect(image.position().x()).toEqual((Point.parse(positionString)).x());
        expect(image.position().y()).toEqual((Point.parse(positionString)).y());
    });

    it("should be able to parse a img from XML and read its 'frame' attribute", function () {
        expect(image.frame()).toBe(frameString.toLowerCase());
    });

});
