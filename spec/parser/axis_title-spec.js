/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Title parsing", function () {
    "use strict";

    var Axis = require('../../src/core/axis.js'),
        AxisTitle = require('../../src/core/axis_title.js'),
        Text = require('../../src/core/text.js'),
        Point = require('../../src/math/point.js'),
        axis = new Axis(Axis.HORIZONTAL),
        JQueryXMLParser;

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    describe("[XML]", function() {
        var xmlString,
            $xml,
            title,
            angleString = "70",
            anchorString = "1,1",
            baseString = "0",
            positionString = "-1,1",
            contentString = "A Title";

        beforeEach(function () {
            xmlString = ''
                + '<title'
                +    ' angle="' + angleString + '"'
                +    ' anchor="' + anchorString + '"'
                +    ' base="' + baseString + '"'
                +    ' position="' + positionString + '"'
                +    '>'
                +      contentString
                + '</title>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            title = AxisTitle.parseXML($xml, axis);
        });

        it("should be able to parse a AxisTitle from XML", function () {
            expect(title).not.toBeUndefined();
            expect(title instanceof AxisTitle).toBe(true);
        });

        it("should be able to parse a title from XML and store an 'axis' pointer", function () {
            expect(title.axis() instanceof Axis).toBe(true);
            expect(title.axis()).toEqual(axis);
        });

        it("should be able to parse a title from XML and read its 'position' attribute", function () {
            expect(title.position().x()).toEqual((Point.parse(positionString)).x());
            expect(title.position().y()).toEqual((Point.parse(positionString)).y());
        });

        it("should be able to parse a title from XML and read its 'base' attribute", function () {
            expect(title.base()).toEqual(parseFloat(baseString));
        });

        it("should be able to parse a title from XML and read its 'anchor' attribute", function () {
            expect(title.anchor().x()).toEqual((Point.parse(anchorString)).x());
            expect(title.anchor().y()).toEqual((Point.parse(anchorString)).y());
        });

        it("should be able to parse a title from XML and read its 'angle' attribute", function () {
            expect(title.angle()).toEqual(parseFloat(angleString));
        });

        it("should be able to parse a title from XML and read its 'content'", function () {
            expect(title.content() instanceof Text).toBe(true);
            expect(title.content().string()).toEqual((new Text(contentString)).string());
        });

        it("should return `undefined` when parsing an empty title tag, ie `<title/>`", function () {
            xmlString = '<title/>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            title = AxisTitle.parseXML($xml, axis);
            expect(title).toBe(undefined);
        });

    });


    describe("[JSON]", function() {
        var json,
            title,
            angle = 70,
            anchor = [1, 1],
            base = 0,
            position = [-1, 1],
            content = "A Title";

        beforeEach(function () {
            json = { "angle" : angle, "anchor" : anchor, "base" : base, "position" : position, "text" : content };
            title = AxisTitle.parseJSON(json, axis);
        });

        it("should be able to parse a AxisTitle from JSON", function () {
            expect(title).not.toBeUndefined();
            expect(title instanceof AxisTitle).toBe(true);
        });

        it("should be able to parse a title from JSON and store an 'axis' pointer", function () {
            expect(title.axis() instanceof Axis).toBe(true);
            expect(title.axis()).toEqual(axis);
        });

        it("should be able to parse a title from JSON and read its 'position' attribute", function () {
            expect(title.position().x()).toEqual((Point.parse(position)).x());
            expect(title.position().y()).toEqual((Point.parse(position)).y());
        });

        it("should be able to parse a title from JSON and read its 'base' attribute", function () {
            expect(title.base()).toEqual(parseFloat(base));
        });

        it("should be able to parse a title from JSON and read its 'anchor' attribute", function () {
            expect(title.anchor().x()).toEqual((Point.parse(anchor)).x());
            expect(title.anchor().y()).toEqual((Point.parse(anchor)).y());
        });

        it("should be able to parse a title from JSON and read its 'angle' attribute", function () {
            expect(title.angle()).toEqual(parseFloat(angle));
        });

        it("should be able to parse a title from JSON and read its 'content'", function () {
            expect(title.content() instanceof Text).toBe(true);
            expect(title.content().string()).toEqual((new Text(content)).string());
        });

        it("should return `undefined` when parsing an empty title, ie `{}`", function () {
            json = {};
            title = AxisTitle.parseJSON(json, axis);
            expect(title).toBe(undefined);
        });

        it('should return `undefined` when parsing a title with empty text, ie `{"text":""}`', function () {
            json = {"text":""};
            title = AxisTitle.parseJSON(json, axis);
            expect(title).toBe(undefined);
        });

    });
});
