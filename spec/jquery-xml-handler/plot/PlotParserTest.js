/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot parsing", function () {
    "use strict";

    var Plot = window.multigraph.Plot,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString  = '<plot></plot>',
        plot,
        $xml;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
    });

    it("should be able to parse a plot from XML", function () {
	plot = Plot.parseXML($xml);
        expect(plot).not.toBeUndefined();
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
            expect(plot.serialize() === xmlString).toBe(true);
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
            xmlString = '<plot><datatips format="number" bgcolor="0x123456" bgalpha="1" border="2" bordercolor="0xFFFBBB" pad="1"/></plot>';
            $xml = $(xmlString);
        });

        it("should be able to parse a plot with a Datatips child from XML", function () {
	    plot = Plot.parseXML($xml);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof Plot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            
        });

        it("should be able to parse a plot with a complex Datatips child from XML", function () {
            xmlString = '<plot><datatips format="number" bgcolor="0x123456" bgalpha="1" border="2" bordercolor="0xFFFBBB" pad="1"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips></plot>';
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
            xmlString = '<plot><datatips format="number" bgcolor="0x123456" bgalpha="1" border="2" bordercolor="0xFFFBBB" pad="1"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips></plot>';
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
            xmlString = '<plot><renderer type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></renderer><filter type="point"><option name="size" value="3"/><option name="shape" value="circle"/><option name="linewidth" value="7"/></filter><datatips format="number" bgcolor="0x123456" bgalpha="1" border="2" bordercolor="0xFFFBBB" pad="1"/></plot>';
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

/*
    it("should be able to parse an axis from XML and read its 'id' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.id() === 'x').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'min' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.min() === '0').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'max' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.max() === '10').toBe(true);
    });

    it("should be able to parse an axis from XML, then serialize it, and get the same XML as the original", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.serialize() === xmlString).toBe(true);
    });
*/

});
