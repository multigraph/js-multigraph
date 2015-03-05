/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("DataPlot parsing", function () {
    "use strict";

    var Plot = require('../../src/core/plot.js'),
        DataPlot = require('../../src/core/data_plot.js'),
        Graph = require('../../src/core/graph.js'),
        Axis = require('../../src/core/axis.js'),
        Data = require('../../src/core/data.js'),
        ArrayData = require('../../src/core/array_data.js'),
        Datatips = require('../../src/core/datatips.js'),
        DatatipsVariable = require('../../src/core/datatips_variable.js'),
        DataVariable = require('../../src/core/data_variable.js'),
        Filter = require('../../src/core/filter.js'),
        FilterOption = require('../../src/core/filter_option.js'),
        PlotLegend = require('../../src/core/plot_legend.js'),
        Renderer = require('../../src/core/renderer.js'),
        RendererOption = require('../../src/core/renderer.js').Option,
        Text = require('../../src/core/text.js'),
        RGBColor = require('../../src/math/rgb_color.js'),
        xmlString,
        $xml,
        plot,
        graph,
        haxis,
        vaxis,
        variable1,
        variable2,
        variable3;

    var $, jqw = require('../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../src/parser/jquery_xml_parser.js')($);
    });

    describe("Axis parsing", function () {

        var horizontalaxisIdString = "x",
            verticalaxisIdString = "y";

        beforeEach(function () {
            graph = new Graph();
            graph.axes().add((new Axis(Axis.HORIZONTAL)).id(horizontalaxisIdString));
            graph.axes().add((new Axis(Axis.VERTICAL)).id(verticalaxisIdString));
        });

        it("should be able to parse a plot with axis children from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<horizontalaxis'
                +       ' ref="' + horizontalaxisIdString +'"'
                +       '/>'
                +   '<verticalaxis'
                +       ' ref="' + verticalaxisIdString + '"'
                +       '/>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml, graph);

            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
            expect(plot.horizontalaxis().id()).toEqual(horizontalaxisIdString);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
            expect(plot.verticalaxis().id()).toEqual(verticalaxisIdString);
        });

        it("should throw an error if an axis with the ref's id is not in the graph", function () {
            xmlString = '<plot><horizontalaxis ref="x2"/><verticalaxis ref="y"/></plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            expect( function () {
                Plot.parseXML($xml, graph);
            }).toThrow(new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of 'x2'"));
        });

    });

    describe("DataVariable parsing", function () {

        var variable1IdString = "x",
            variable2IdString = "y",
            variable3IdString = "y1",
            missingVariableIdString = "y3";

        beforeEach(function () {
            graph = new Graph();
            variable1 = (new DataVariable(variable1IdString)).column(1);
            variable2 = (new DataVariable(variable2IdString)).column(2);
            variable3 = (new DataVariable(variable3IdString)).column(3);
            graph.axes().add(new Axis(Axis.HORIZONTAL));
            graph.axes().add(new Axis(Axis.VERTICAL));
            graph.data().add(new ArrayData([variable1,variable2,variable3], []));
        });

        it("should be able to parse a plot with variable children from XML", function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="' + variable1IdString + '"'
                +         '/>'
                +     '</horizontalaxis>'
                +     '<verticalaxis>'
                +         '<variable'
                +             ' ref="' + variable2IdString + '"'
                +         '/>'
                +         '<variable'
                +             ' ref="' + variable3IdString + '"'
                +         '/>'
                +     '</verticalaxis>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml, graph);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(0)).toBe(variable1);
            expect(plot.variable().at(1) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(1)).toBe(variable2);
            expect(plot.variable().at(2) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(2)).toBe(variable3);
        });

        it("should throw an error if a variable with the ref's id is not in the graph", function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="' + variable1IdString + '"'
                +         '/>'
                +     '</horizontalaxis>'
                +     '<verticalaxis>'
                +         '<variable'
                +             ' ref="' + missingVariableIdString + '"'
                +         '/>'
                +         '<variable'
                +             ' ref="' + variable3IdString + '"'
                +         '/>'
                +     '</verticalaxis>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            expect( function () {
                Plot.parseXML($xml, graph);
            }).toThrow(new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + missingVariableIdString + "'"));
        });

    });

    describe("PlotLegend parsing", function () {
        var visibleBool = true,
            labelString = "curly";

        it("should be able to parse a plot with a PlotLegend child from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<legend'
                +       ' visible="' + visibleBool + '"'
                +       ' label="' + labelString + '"'
                +       '/>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.legend() instanceof PlotLegend).toBe(true);
            expect(plot.legend().visible()).toEqual(visibleBool);
            expect(plot.legend().label().string()).toEqual((new Text(labelString)).string());
        });

    });

    describe("Renderer parsing", function () {

        var rendererTypeString = "pointline",
            rendererOption1NameString = "pointsize",
            rendererOption2NameString = "pointshape",
            rendererOption3NameString = "linewidth";

        it("should be able to parse a plot with a Renderer child from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<renderer'
                +       ' type="' + rendererTypeString + '"'
                +       '/>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer().type()).toEqual(Renderer.Type.parse(rendererTypeString));
        });

        it("should be able to parse a plot with a Renderer child tag with option child tags from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<renderer'
                +       ' type="pointline"'
                +       '>'
                +     '<option'
                +         ' name="' + rendererOption1NameString + '"'
                +         ' value="3"'
                +         '/>'
                +     '<option'
                +         ' name="' + rendererOption2NameString + '"'
                +         ' value="circle"'
                +         '/>'
                +     '<option'
                +         ' name="' + rendererOption3NameString + '"'
                +         ' value="7"'
                +         '/>'
                +   '</renderer>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer().options()[rendererOption1NameString]().size()).toEqual(1);
            expect(plot.renderer().options()[rendererOption1NameString]().at(0) instanceof RendererOption).toBe(true);
            expect(plot.renderer().options()[rendererOption1NameString]().size()).toEqual(1);
            expect(plot.renderer().options()[rendererOption1NameString]().at(0) instanceof RendererOption).toBe(true);
            expect(plot.renderer().options()[rendererOption1NameString]().size()).toEqual(1);
            expect(plot.renderer().options()[rendererOption1NameString]().at(0) instanceof RendererOption).toBe(true);
        });

    });

    describe("Filter parsing", function () {

        var typeString = "pointline",
            option1NameString = "size",
            option1ValueString = "3";        

        it("should be able to parse a plot with a Filter child from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<filter'
                +       ' type="' + typeString + '"'
                +       '/>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().type()).toEqual(typeString);
        });

        it("should be able to parse a plot with a Filter child with option children from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<filter'
                +       ' type="' + typeString + '"'
                +       '>'
                +     '<option'
                +         ' name="' + option1NameString + '"'
                +         ' value="' + option1ValueString + '"'
                +         '/>'
                +   '</filter>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().options().at(0) instanceof FilterOption).toBe(true);
            expect(plot.filter().options().at(0).name()).toEqual(option1NameString);
            expect(plot.filter().options().at(0).value()).toEqual(option1ValueString);
        });

    });

    describe("Datatips parsing", function () {
        var bgcolorString = "0x123456",
            bordercolorString = "0xfffbbb",
            formatString = "number",
            bgalphaString = "1",
            borderString = "2",
            padString = "1",
            datatipsVariable1FormatString = "number",
            datatipsVariable2FormatString = "number",
            datatipsVariable3FormatString = "datetime";

        it("should be able to parse a plot with a Datatips child from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<datatips'
                +       ' bgcolor="' + bgcolorString + '"'
                +       ' bordercolor="' + bordercolorString + '"'
                +       ' format="' + formatString + '"'
                +       ' bgalpha="' + bgalphaString + '"'
                +       ' border="' + borderString + '"'
                +       ' pad="' + padString + '"'
                +       '/>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            expect(plot.datatips().bgcolor().getHexString("0x")).toEqual((RGBColor.parse(bgcolorString)).getHexString("0x"));
            expect(plot.datatips().bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolorString)).getHexString("0x"));
            expect(plot.datatips().format()).toEqual(formatString);
            expect(plot.datatips().bgalpha()).toEqual(bgalphaString);
            expect(plot.datatips().border()).toEqual(parseInt(borderString, 10));
            expect(plot.datatips().pad()).toEqual(parseInt(padString, 10));
        });

        it("should be able to parse a plot with a Datatips child with variable child tags from XML", function () {
            xmlString = ''
                + '<plot>'
                +   '<datatips'
                +       ' bgcolor="0x123456"'
                +       ' bordercolor="0xffddbb"'
                +       ' format="number"'
                +       ' bgalpha="1"'
                +       ' border="2"'
                +       ' pad="1"'
                +       '>'
                +     '<variable'
                +         ' format="' + datatipsVariable1FormatString + '"'
                +         '/>'
                +     '<variable'
                +         ' format="' + datatipsVariable2FormatString + '"'
                +         '/>'
                +     '<variable'
                +         ' format="' + datatipsVariable3FormatString + '"'
                +         '/>'
                +   '</datatips>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            expect(plot.datatips().variables().size()).toEqual(3);
            expect(plot.datatips().variables().at(0) instanceof DatatipsVariable).toBe(true);
            expect(plot.datatips().variables().at(0).format()).toEqual(datatipsVariable1FormatString);
            expect(plot.datatips().variables().at(1) instanceof DatatipsVariable).toBe(true);
            expect(plot.datatips().variables().at(1).format()).toEqual(datatipsVariable2FormatString);
            expect(plot.datatips().variables().at(2) instanceof DatatipsVariable).toBe(true);
            expect(plot.datatips().variables().at(2).format()).toEqual(datatipsVariable3FormatString);
        });

    });

    describe("with multiple children", function () {

        var horizontalaxisIdString = "x",
            verticalaxisIdString = "y",
            variable1IdString = "x",
            variable2IdString = "y",
            variable3IdString = "y1";

        beforeEach(function () {
            graph = new Graph();
            graph.axes().add((new Axis(Axis.HORIZONTAL)).id(horizontalaxisIdString));
            graph.axes().add((new Axis(Axis.VERTICAL)).id(verticalaxisIdString));
            variable1 = (new DataVariable(variable1IdString)).column(1);
            variable2 = (new DataVariable(variable2IdString)).column(2);
            variable3 = (new DataVariable(variable3IdString)).column(3);
            graph.data().add(new ArrayData([variable1,variable2,variable3], []));

            xmlString = ''
                + '<plot>'
                +   '<horizontalaxis'
                +       ' ref="' + horizontalaxisIdString +'"'
                +       '>'
                +     '<variable'
                +         ' ref="' + variable1IdString + '"'
                +         '/>'
                +   '</horizontalaxis>'
                +   '<verticalaxis'
                +       ' ref="' + verticalaxisIdString + '"'
                +       '>'
                +     '<variable'
                +         ' ref="' + variable2IdString + '"'
                +         '/>'
                +     '<variable'
                +         ' ref="' + variable3IdString + '"'
                +         '/>'
                +   '</verticalaxis>'
                +   '<legend'
                +       ' visible="true"'
                +       ' label="plot"'
                +       '/>'
                +   '<renderer'
                +       ' type="pointline"'
                +       '>'
                +     '<option'
                +         ' name="linewidth"'
                +         ' value="7"'
                +         '/>'
                +     '<option'
                +         ' name="pointshape"'
                +         ' value="triangle"'
                +         '/>'
                +     '<option'
                +         ' name="pointsize"'
                +         ' value="3"'
                +         '/>'
                +   '</renderer>'
                +   '<filter'
                +       ' type="pointline"'
                +       '>'
                +     '<option'
                +         ' name="size"'
                +         ' value="3"'
                +         '/>'
                +     '<option'
                +         ' name="shape"'
                +         ' value="circle"'
                +         '/>'
                +     '<option'
                +         ' name="linewidth"'
                +         ' value="7"'
                +         '/>'
                +   '</filter>'
                +   '<datatips'
                +       ' bgcolor="0x12fff6"'
                +       ' bordercolor="0xfffbbb"'
                +       ' format="number"'
                +       ' bgalpha="1"'
                +       ' border="2"'
                +       ' pad="1"'
                +       '/>'
                + '</plot>';
            $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml, graph);
        });

        it("should be able to parse a plot with multiple children from XML", function () {
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
        });

        it("should be able to properly parse a plot with multiple children from XML", function () {
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(1) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(2) instanceof DataVariable).toBe(true);
            expect(plot.legend() instanceof PlotLegend).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().options().size()).toEqual(3);
            expect(plot.filter().options().at(0) instanceof FilterOption).toBe(true);
            expect(plot.filter().options().at(1) instanceof FilterOption).toBe(true);
            expect(plot.filter().options().at(2) instanceof FilterOption).toBe(true);            
            expect(plot.datatips() instanceof Datatips).toBe(true);
        });

    });

});
