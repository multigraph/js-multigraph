/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot parsing", function () {
    "use strict";

    var Plot = window.multigraph.core.Plot,
        Graph = window.multigraph.core.Graph,
        Axis = window.multigraph.core.Axis,
        Data = window.multigraph.core.Data,
        ArrayData = window.multigraph.core.ArrayData,
        Datatips = window.multigraph.core.Datatips,
        DatatipsVariable = window.multigraph.core.DatatipsVariable,
        DataVariable = window.multigraph.core.DataVariable,
        Filter = window.multigraph.core.Filter,
        FilterOption = window.multigraph.core.FilterOption,
        PlotLegend = window.multigraph.core.PlotLegend,
        Renderer = window.multigraph.core.Renderer,
        RendererOption = window.multigraph.core.RendererOption,
        Variables = window.multigraph.core.Variables,
        xmlString = '<plot></plot>',
        plot,
        graph,
        haxis,
        vaxis,
        variable1,
        variable2,
        variable3,    
        $xml;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        
    });

    it("should be able to parse a plot from XML", function () {
        plot = Plot.parseXML($xml);
        expect(plot).not.toBeUndefined();
    });

    describe("Axis parsing", function () {

        beforeEach(function () {
            xmlString = '<plot><horizontalaxis ref="x"/><verticalaxis ref="y"/><legend visible="true" label="plot"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            graph = new Graph();
            haxis = new Axis(Axis.HORIZONTAL);
            haxis.id("x");
            vaxis = new Axis(Axis.VERTICAL);
            vaxis.id("y");
            graph.axes().add(haxis);
            graph.axes().add(vaxis);
        });

        it("should be able to parse a plot with axis children from XML", function () {
            plot = Plot.parseXML($xml, graph);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);            
            expect(plot.verticalaxis() instanceof Axis).toBe(true);            
        });

        it("should throw an error if an axis with the ref's id is not in the graph", function () {
            xmlString = '<plot><horizontalaxis ref="x2"/><verticalaxis ref="y"/><legend visible="true" label="plot"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            expect( function () {
                Plot.parseXML($xml, graph);
            }).toThrow(new Error("The graph does not contain an axis with an id of: x2"));
        });

        it("should be able to parse a plot with axis children from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml, graph);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("DataVariable parsing", function () {
        var variables;

        beforeEach(function () {
            xmlString = ''
                + '<plot>'
                +     '<horizontalaxis>'
                +         '<variable'
                +             ' ref="x"'
                +         '/>'
                +     '</horizontalaxis>'
                +     '<verticalaxis>'
                +         '<variable'
                +             ' ref="y"'
                +         '/>'
                +         '<variable'
                +             ' ref="y1"'
                +         '/>'
                +     '</verticalaxis>'
                +     '<legend'
                +         ' visible="true"'
                +         ' label="y"'
                +         '/>'
                + '</plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            graph = new Graph();
            haxis = new Axis(Axis.HORIZONTAL);
            haxis.id("x");
            vaxis = new Axis(Axis.VERTICAL);
            vaxis.id("y");
            variable1 = new DataVariable("x");
            variable2 = new DataVariable("y");
            variable3 = new DataVariable("y1");
            variables = new Variables();
            variable1.id("x").column(1);
            variable2.id("y").column(2);
            variable3.id("y1").column(3);
            variables.variable().add(variable1);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            graph.axes().add(haxis);
            graph.axes().add(vaxis);
            graph.data().add(new ArrayData([variable1,variable2,variable3], []));
            //graph.data().at(0).variables(variables);
        });

        it("should be able to parse a plot with variable children from XML", function () {
            plot = Plot.parseXML($xml, graph);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
//            expect(plot.horizontalaxis() instanceof Axis).toBe(true);            
//            expect(plot.verticalaxis() instanceof Axis).toBe(true);            
            expect(plot.variable().at(0) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(1) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(2) instanceof DataVariable).toBe(true);
        });

        it("should throw an error if a variable with the ref's id is not in the graph", function () {
            xmlString = '<plot><horizontalaxis><variable ref="x"/></horizontalaxis><verticalaxis><variable ref="y3"/><variable ref="y1"/></verticalaxis></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            expect( function () {
                Plot.parseXML($xml, graph);
            }).toThrow(new Error("The graph does not contain a variable with an id of: y3"));
        });

        it("should be able to parse a plot with axis children from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml, graph);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("PlotLegend parsing", function () {

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="curly"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a plot with a PlotLegend child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.legend() instanceof PlotLegend).toBe(true);
            
        });

        it("should be able to parse a plot with a PlotLegend child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("PlotLegend parsing", function () {

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="curly"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a plot with a PlotLegend child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.legend() instanceof PlotLegend).toBe(true);
            
        });

        it("should be able to parse a plot with a PlotLegend child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("Renderer parsing", function () {

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="plot"/><renderer type="pointline"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a plot with a Renderer child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            
        });

        it("should be able to parse a plot with a complex Renderer child from XML", function () {
            xmlString = '<plot><renderer type="pointline"><option name="pointsize" value="3"/><option name="pointshape" value="circle"/><option name="linewidth" value="7"/></renderer></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
/*
TODO:  change to check for new style options!!!
            expect(plot.renderer().options().at(0) instanceof RendererOption);
            expect(plot.renderer().options().at(1) instanceof RendererOption);
            expect(plot.renderer().options().at(2) instanceof RendererOption);
*/
        });

        it("should be able to parse a plot with a Renderer child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });

        it("should be able to parse a plot with a complex Renderer child from XML, serialize it and get the same XML as the original", function () {
            xmlString = '<plot><legend visible="true" label="plot"/><renderer type="pointline"><option name="linewidth" value="7"/><option name="pointshape" value="diamond"/><option name="pointsize" value="3"/></renderer></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("Filter parsing", function () {

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="plot"/><filter type="pointline"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a plot with a Filter child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            
        });

        it("should be able to parse a plot with a complex Filter child from XML", function () {
            xmlString = '<plot><filter type="pointline"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></filter></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().options().at(0) instanceof FilterOption);
            expect(plot.filter().options().at(1) instanceof FilterOption);
            expect(plot.filter().options().at(2) instanceof FilterOption);
        });

        it("should be able to parse a plot with a Filter child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });

        it("should be able to parse a plot with a complex Filter child from XML, serialize it and get the same XML as the original", function () {
            xmlString = '<plot><legend visible="true" label="plot"/><filter type="pointline"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></filter></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("Datatips parsing", function () {

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="plot"/><datatips bgcolor="0x123456" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a plot with a Datatips child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            
        });

        it("should be able to parse a plot with a complex Datatips child from XML", function () {
            xmlString = '<plot><datatips bgcolor="0x123456" bordercolor="0xffddbb" format="number" bgalpha="1" border="2" pad="1"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            expect(plot.datatips().variables().at(0) instanceof DatatipsVariable);
            expect(plot.datatips().variables().at(1) instanceof DatatipsVariable);
            expect(plot.datatips().variables().at(2) instanceof DatatipsVariable);
        });

        it("should be able to parse a plot with a Datatips child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });

        it("should be able to parse a plot with a complex Datatips child from XML, serialize it and get the same XML as the original", function () {
            xmlString = '<plot><legend visible="true" label="plot"/><datatips bgcolor="0x1234aa" bordercolor="0xddfaaa" format="number" bgalpha="1" border="2" pad="1"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("with multiple children", function () {

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="plot"/><renderer type="pointline"><option name="linewidth" value="7"/><option name="pointshape" value="triangle"/><option name="pointsize" value="3"/></renderer><filter type="pointline"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></filter><datatips bgcolor="0x12fff6" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/></plot>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        });

        it("should be able to parse a plot with multiple children from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
/*
TODO: change to check new style options...
            expect(plot.renderer().options().at(0) instanceof RendererOption);
            expect(plot.renderer().options().at(1) instanceof RendererOption);
            expect(plot.renderer().options().at(2) instanceof RendererOption);
*/
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().options().at(0) instanceof FilterOption);
            expect(plot.filter().options().at(1) instanceof FilterOption);
            expect(plot.filter().options().at(2) instanceof FilterOption);            
        });

        it("should be able to parse a plot with multiple children from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });

    });


});
