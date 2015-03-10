/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Window XML parsing", function () {
    "use strict";

    var Window = require('../../../src/core/window.js'),
        Insets = require('../../../src/math/insets.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        xmlString,
        $xml,
        windowModel,
        marginString = "1",
        paddingString = "10",
        bordercolorString = "0x111223",
        widthString = "2",
        heightString = "97",
        borderString = "0";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<window'
            +     ' margin="' + marginString + '"'
            +     ' padding="' + paddingString + '"'
            +     ' bordercolor="' + bordercolorString + '"'
            +     ' width="' + widthString + '"'
            +     ' height="' + heightString + '"'
            +     ' border="' + borderString + '"'
            +     '/>',
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        windowModel = Window.parseXML($xml);
    });

    it("should be able to parse a window from XML", function () {
        expect(windowModel).not.toBeUndefined();
        expect(windowModel instanceof Window).toBe(true);
    });

    it("should be able to parse a window from XML and read its 'width' attribute", function () {
        expect(windowModel.width()).toEqual(parseInt(widthString, 10));
    });

    it("should be able to parse a window from XML and read its 'height' attribute", function () {
        expect(windowModel.height()).toEqual(parseInt(heightString, 10));
    });

    it("should be able to parse a window from XML and read its 'border' attribute", function () {
        expect(windowModel.border()).toEqual(parseInt(borderString, 10));
    });

    it("should be able to parse a window from XML and read its 'margin' attribute", function () {
        var margin = parseInt(marginString, 10);
        expect(windowModel.margin().top()).toEqual((new Insets(margin, margin, margin, margin)).top());
        expect(windowModel.margin().right()).toEqual((new Insets(margin, margin, margin, margin)).right());
        expect(windowModel.margin().bottom()).toEqual((new Insets(margin, margin, margin, margin)).bottom());
        expect(windowModel.margin().left()).toEqual((new Insets(margin, margin, margin, margin)).left());
    });

    it("should be able to parse a window from XML and read its 'padding' attribute", function () {
        var padding = parseInt(paddingString, 10);
        expect(windowModel.padding().top()).toEqual((new Insets(padding, padding, padding, padding)).top());
        expect(windowModel.padding().right()).toEqual((new Insets(padding, padding, padding, padding)).right());
        expect(windowModel.padding().bottom()).toEqual((new Insets(padding, padding, padding, padding)).bottom());
        expect(windowModel.padding().left()).toEqual((new Insets(padding, padding, padding, padding)).left());
    });

    it("should be able to parse a window from XML and read its 'bordercolor' attribute", function () {
        expect(windowModel.bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolorString)).getHexString("0x"));
    });

});
