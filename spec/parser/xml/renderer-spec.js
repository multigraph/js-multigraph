/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Renderer XML parsing", function () {
    "use strict";

    var Renderer = require('../../../src/core/renderer.js'),
        Option = require('../../../src/core/renderer.js').Option,
        Axis = require('../../../src/core/axis.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        DataValue = require('../../../src/core/data_value.js'),
        xmlString,
        $xml,
        renderer,
        typeString = "pointline";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<renderer'
            +     ' type="' + typeString + '"'
            +     '/>',
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        renderer = Renderer.parseXML($xml);
    });

    it("should be able to parse a renderer from XML", function () {
        expect(renderer).not.toBeUndefined();
        expect(renderer instanceof Renderer).toBe(true);
    });

    it("should be able to parse a renderer from XML and read its 'type' attribute", function () {
        expect(renderer.type()).toEqual(Renderer.Type.parse(typeString));
    });

    describe("Option parsing", function () {
        describe("with a single option child tag", function () {
            var option1NameString = "pointsize",
                option1ValueString = "3";

            beforeEach(function () {
                xmlString = ''
                    + '<renderer'
                    +     ' type="pointline"'
                    +     '>'
                    +   '<option'
                    +       ' name="' + option1NameString + '"'
                    +       ' value="' + option1ValueString + '"'
                    +       '/>'
                    + '</renderer>';
                $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
                renderer = Renderer.parseXML($xml);
            });

            it("should be able to parse a renderer with a child from XML", function () {
                expect(renderer).not.toBeUndefined();
                expect(renderer instanceof Renderer).toBe(true);
            });

            it("should properly parse the option children of a renderer with a option child tag from XML", function () {
                expect(renderer.options()[option1NameString]().size()).toEqual(1);
                expect(renderer.options()[option1NameString]().at(0) instanceof Option).toBe(true);
                expect(renderer.options()[option1NameString]().at(0).serializeValue()).toEqual((parseFloat(option1ValueString)).toString());
            });

        });

        describe("with multiple option child tags", function () {
            var option1NameString = "pointsize",
                option1ValueString = "3",
                option2NameString = "pointopacity",
                option2ValueString = "0",
                option2MinString = "0",
                option3NameString = "pointopacity",
                option3ValueString = "1",
                option3MaxString = "0",
                option4NameString = "linewidth",
                option4ValueString = "2",
                axisType = "number";

            var plot = new DataPlot();
            plot.verticalaxis((new Axis(Axis.VERTICAL)).type(axisType));

            beforeEach(function () {
                xmlString = ''
                    + '<renderer'
                    +     ' type="pointline"'
                    +     '>'
                    +   '<option'
                    +       ' name="' + option1NameString + '"'
                    +       ' value="' + option1ValueString + '"'
                    +       '/>'
                    +   '<option'
                    +       ' name="' + option2NameString + '"'
                    +       ' value="' + option2ValueString + '"'
                    +       ' min="' + option2MinString + '"'
                    +       '/>'
                    +   '<option'
                    +       ' name="' + option3NameString + '"'
                    +       ' value="' + option3ValueString + '"'
                    +       ' max="' + option3MaxString + '"'
                    +       '/>'
                    +   '<option'
                    +       ' name="' + option4NameString + '"'
                    +       ' value="' + option4ValueString + '"'
                    +       '/>'
                    + '</renderer>';
                $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
                renderer = Renderer.parseXML($xml, plot);
            });

            it("should be able to parse a renderer with multiple option child tags from XML", function () {
                expect(renderer).not.toBeUndefined();
                expect(renderer instanceof Renderer).toBe(true);
            });

            it("should properly parse the option children of a renderer with multiple option child tags from XML", function () {
                expect(renderer.options()[option1NameString]().size()).toEqual(1);
                expect(renderer.options()[option1NameString]().at(0) instanceof Option).toBe(true);
                expect(renderer.options()[option1NameString]().at(0).serializeValue()).toEqual((parseFloat(option1ValueString)).toString());

                expect(renderer.options()[option2NameString]().size()).toEqual(3);
                expect(renderer.options()[option2NameString]().at(1) instanceof Option).toBe(true);
                expect(renderer.options()[option2NameString]().at(1).serializeValue()).toEqual((parseFloat(option2ValueString)).toString());
                expect(renderer.options()[option2NameString]().at(1).min().getRealValue()).toEqual((DataValue.parse(axisType, option2MinString)).getRealValue());

                expect(renderer.options()[option3NameString]().size()).toEqual(3);
                expect(renderer.options()[option3NameString]().at(2) instanceof Option).toBe(true);
                expect(renderer.options()[option3NameString]().at(2).serializeValue()).toEqual((parseFloat(option3ValueString)).toString());
                expect(renderer.options()[option3NameString]().at(2).max().getRealValue()).toEqual((DataValue.parse(axisType, option3MaxString)).getRealValue());

                expect(renderer.options()[option4NameString]().size()).toEqual(1);
                expect(renderer.options()[option4NameString]().at(0) instanceof Option).toBe(true);
                expect(renderer.options()[option4NameString]().at(0).serializeValue()).toEqual((parseFloat(option4ValueString)).toString());
            });

        });

    });

});
