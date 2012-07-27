/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot parsing", function () {
    "use strict";

    var Plot = window.multigraph.Plot,
        Graph = window.multigraph.Graph,
        Axis = window.multigraph.Axis,
        DataVariable = window.multigraph.Data.Variables.DataVariable,
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
        window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        
    });

    it("should be able to parse a plot from XML", function () {
        plot = Plot.parseXML($xml);
        expect(plot).not.toBeUndefined();
    });

    describe("Axis parsing", function () {

        beforeEach(function () {
            xmlString = '<plot><horizontalaxis ref="x"/><verticalaxis ref="y"/></plot>';
            $xml = $(xmlString);
            graph = new Graph();
            haxis = new Axis('horizontal');
            haxis.id('x');
            vaxis = new Axis('vertical');
            vaxis.id('y');
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
            xmlString = '<plot><horizontalaxis ref="x2"/><verticalaxis ref="y"></plot>';
            $xml = $(xmlString);
            expect( function () {
                Plot.parseXML($xml, graph);
            }).toThrow(new Error('The graph does not contain an axis with an id of: x2'));
        });

        it("should be able to parse a plot with axis children from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml, graph);
            expect(plot.serialize() === xmlString).toBe(true);
        });
    });

    describe("DataVariable parsing", function () {
        var variables;

        beforeEach(function () {
            xmlString = '<plot><horizontalaxis><variable ref="x"/></horizontalaxis><verticalaxis><variable ref="y"/><variable ref="y1"/></verticalaxis></plot>';
            $xml = $(xmlString);
            graph = new Graph();
            haxis = new Axis('horizontal');
            haxis.id('x');
            vaxis = new Axis('vertical');
            vaxis.id('y');
            variable1 = new DataVariable('x');
            variable2 = new DataVariable('y');
            variable3 = new DataVariable('y1');
            variables = new window.multigraph.Data.Variables();
            variable1.id('x').column(1);
            variable2.id('y').column(2);
            variable3.id('y1').column(3);
            variables.variable().add(variable1);
            variables.variable().add(variable2);
            variables.variable().add(variable3);
            graph.axes().add(haxis);
            graph.axes().add(vaxis);
            graph.data().add(new window.multigraph.Data());
            graph.data().at(0).variables(variables);
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
            $xml = $(xmlString);
            expect( function () {
                Plot.parseXML($xml, graph);
            }).toThrow(new Error('The graph does not contain a variable with an id of: y3'));
        });

        it("should be able to parse a plot with axis children from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml, graph);
            expect(plot.serialize() === xmlString).toBe(true);
        });
    });

    describe("Legend parsing", function () {
        var Legend = window.multigraph.Plot.Legend;

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="curly"/></plot>';
            $xml = $(xmlString);
        });

        it("should be able to parse a plot with a Legend child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.legend() instanceof Legend).toBe(true);
            
        });

        it("should be able to parse a plot with a Legend child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize() === xmlString).toBe(true);
            
        });
    });

    describe("Legend parsing", function () {
        var Legend = window.multigraph.Plot.Legend;

        beforeEach(function () {
            xmlString = '<plot><legend visible="true" label="curly"/></plot>';
            $xml = $(xmlString);
        });

        it("should be able to parse a plot with a Legend child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.legend() instanceof Legend).toBe(true);
            
        });

        it("should be able to parse a plot with a Legend child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize() === xmlString).toBe(true);
            
        });
    });

    describe("Renderer parsing", function () {
        var Renderer = window.multigraph.Plot.Renderer,
            RendererOption = window.multigraph.Plot.Renderer.Option;

        beforeEach(function () {
            xmlString = '<plot><renderer type="line"/></plot>';
            $xml = $(xmlString);
        });

        it("should be able to parse a plot with a Renderer child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            
        });

        it("should be able to parse a plot with a complex Renderer child from XML", function () {
            xmlString = '<plot><renderer type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></renderer></plot>';
            $xml = $(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer().options().at(0) instanceof RendererOption);
            expect(plot.renderer().options().at(1) instanceof RendererOption);
            expect(plot.renderer().options().at(2) instanceof RendererOption);
        });

        it("should be able to parse a plot with a Renderer child from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize() === xmlString).toBe(true);
        });

        it("should be able to parse a plot with a complex Renderer child from XML, serialize it and get the same XML as the original", function () {
            xmlString = '<plot><renderer type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></renderer></plot>';
            $xml = $(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot.serialize()).toBe(xmlString);
        });
    });

    describe("Filter parsing", function () {
        var Filter = window.multigraph.Plot.Filter,
            FilterOption = window.multigraph.Plot.Filter.Option;

        beforeEach(function () {
            xmlString = '<plot><filter type="line"/></plot>';
            $xml = $(xmlString);
        });

        it("should be able to parse a plot with a Filter child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            
        });

        it("should be able to parse a plot with a complex Filter child from XML", function () {
            xmlString = '<plot><filter type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></filter></plot>';
            $xml = $(xmlString);
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
            expect(plot.serialize() === xmlString).toBe(true);
        });

        it("should be able to parse a plot with a complex Filter child from XML, serialize it and get the same XML as the original", function () {
            xmlString = '<plot><filter type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></filter></plot>';
            $xml = $(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot.serialize() === xmlString).toBe(true);
        });
    });

    describe("Datatips parsing", function () {
        var Datatips = window.multigraph.Plot.Datatips,
            DatatipsVariable = window.multigraph.Plot.Datatips.Variable;

        beforeEach(function () {
            xmlString = '<plot><datatips bgcolor="0x123456" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/></plot>';
            $xml = $(xmlString);
        });

        it("should be able to parse a plot with a Datatips child from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            
        });

        it("should be able to parse a plot with a complex Datatips child from XML", function () {
            xmlString = '<plot><datatips bgcolor="0x123456" bordercolor="0xffddbb" format="number" bgalpha="1" border="2" pad="1"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips></plot>';
            $xml = $(xmlString);
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
            expect(plot.serialize() === xmlString).toBe(true);
        });

        it("should be able to parse a plot with a complex Datatips child from XML, serialize it and get the same XML as the original", function () {
            xmlString = '<plot><datatips bgcolor="0x1234aa" bordercolor="0xddfaaa" format="number" bgalpha="1" border="2" pad="1"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips></plot>';
            $xml = $(xmlString);
            plot = Plot.parseXML($xml);
            expect(plot.serialize() === xmlString).toBe(true);
        });
    });

    describe("with multiple children", function () {
        var Datatips = window.multigraph.Plot.Datatips,
            DatatipsVariable = window.multigraph.Plot.Datatips.Variable,
            Renderer = window.multigraph.Plot.Renderer,
            RendererOption = window.multigraph.Plot.Renderer.Option,
            Filter = window.multigraph.Plot.Filter,
            FilterOption = window.multigraph.Plot.Filter.Option;

        beforeEach(function () {
            xmlString = '<plot><renderer type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></renderer><filter type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></filter><datatips bgcolor="0x12fff6" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/></plot>';
            $xml = $(xmlString);
        });

        it("should be able to parse a plot with multiple children from XML", function () {
            plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer().options().at(0) instanceof RendererOption);
            expect(plot.renderer().options().at(1) instanceof RendererOption);
            expect(plot.renderer().options().at(2) instanceof RendererOption);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().options().at(0) instanceof FilterOption);
            expect(plot.filter().options().at(1) instanceof FilterOption);
            expect(plot.filter().options().at(2) instanceof FilterOption);            
        });

        it("should be able to parse a plot with multiple children from XML, serialize it and get the same XML as the original", function () {
            plot = Plot.parseXML($xml);
            expect(plot.serialize() === xmlString).toBe(true);
        });

    });


});
