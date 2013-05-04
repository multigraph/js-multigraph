/*global describe, it, beforeEach, expect, xit, jasmine */

describe("DataPlot", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        DataPlot = window.multigraph.core.DataPlot,
        PlotLegend = window.multigraph.core.PlotLegend,
        Filter = window.multigraph.core.Filter,
        FilterOption = window.multigraph.core.FilterOption,
        Renderer = window.multigraph.core.Renderer,
        RendererOption = window.multigraph.core.RendererOption,
        Datatips = window.multigraph.core.Datatips,
        DatatipsVariable = window.multigraph.core.DatatipsVariable,
        DataVariable = window.multigraph.core.DataVariable,
        Text = window.multigraph.core.Text,
        p;

    beforeEach(function () {
        p = new DataPlot();
    }); 

    it("should be able to create a DataPlot", function () {
        expect(p instanceof DataPlot).toBe(true);
    });

    describe("Axes", function () {
        var h,
            v;

        beforeEach(function () {
            h = new Axis(Axis.HORIZONTAL),
            v = new Axis(Axis.VERTICAL);
        });

        it("should be able to add a horizontal axis to a DataPlot", function () {
            p.horizontalaxis(h);
            expect(p.horizontalaxis()).toBe(h);
        });

        it("should be able to add a vertical axis to a DataPlot", function () {
            p.verticalaxis(v);
            expect(p.verticalaxis()).toBe(v);
        });

        it("should be able to add axes with attributes to a DataPlot", function () {
            h.id("xaxis");
            v.min("30").id("yaxis");
            p.horizontalaxis(h);
            p.verticalaxis(v);
            expect(p.horizontalaxis()).toBe(h);
            expect(p.verticalaxis()).toBe(v);
        });

        it("should be able to set/get attributes of axes added to a DataPlot", function () {
            p.horizontalaxis(h);
            p.verticalaxis(v);
            p.horizontalaxis().id("xaxis").min("12");
            p.verticalaxis().id("yaxis").max("200");
            expect(p.horizontalaxis().id()).toBe("xaxis");
            expect(p.horizontalaxis().min()).toBe("12");
            expect(p.verticalaxis().id()).toBe("yaxis");
            expect(p.verticalaxis().max()).toBe("200");
        });

    });

    describe("Data DataVariable's", function () {
        var v,
            v2;

        beforeEach(function () {
            v = new DataVariable("x");
            v2 = new DataVariable("y");
            v.id("x").column(2);
            v2.id("y").column(1);
        });

        it("should be able to add a variable to a DataPlot", function () {
            p.variable().add(v);
            expect(p.variable().at(0)).toBe(v);
        });

        it("should be able to add multiple variables to a DataPlot", function () {
            p.variable().add(v);
            p.variable().add(v2);
            expect(p.variable().at(0)).toBe(v);
            expect(p.variable().at(1)).toBe(v2);
        });

    });

    describe("PlotLegend", function () {
        var legend;

        beforeEach(function () {
            legend = new PlotLegend();
        });

        it("should be able to add a PlotLegend to a DataPlot", function () {
            p.legend(legend);
            expect(p.legend()).toBe(legend);
        });

        it("should be able to add a PlotLegend with attributes to a DataPlot", function () {
            legend.visible(false);
            p.legend(legend);
            expect(p.legend()).toBe(legend);
        });

        it("should be able to set/get attributes a legend added to a DataPlot", function () {
            p.legend(legend);
            p.legend().visible(true);
            p.legend().label(new Text("tag"));
            expect(p.legend().visible()).toBe(true);
            expect(p.legend().label().string()).toBe("tag");
        });

    });

    describe("Renderer", function () {
        var renderer;

        beforeEach(function () {
            renderer = new Renderer(Renderer.LINE);
        });

        it("should be able to add a renderer to a DataPlot", function () {
            p.renderer(renderer);
            expect(p.renderer()).toBe(renderer);
        });

        it("should be able to add axes with attributes and children to a DataPlot", function () {
/*TODO: change to check for new style options
            var option = new RendererOption("barwidth", "3"),
                option2 = new RendererOption("linecolor", "0x345678");
*/
            renderer.type(Renderer.BAR);
/*TODO: change to check for new style options
            renderer.options().add(option);
            renderer.options().add(option2);
*/
            p.renderer(renderer);
            expect(p.renderer().type()).toBe(Renderer.BAR);
/*TODO: change to check for new style options
            expect(p.renderer().options().at(0)).toBe(option);
            expect(p.renderer().options().at(1)).toBe(option2);
*/
        });

        it("should be able to set/get attributes of renderers added to a DataPlot", function () {
/*TODO: change to check for new style options
            var option = new RendererOption("barwidth", "3"),
                option2 = new RendererOption("linecolor", "0x345678");
            renderer.options().add(option);
            renderer.options().add(option2);
*/
            p.renderer(renderer);
            p.renderer().type(Renderer.LINE);
/*TODO: change to check for new style options
            p.renderer().options().at(0).name("dotsize").value("2");
*/
            expect(p.renderer().type()).toBe(Renderer.LINE);
/*TODO: change to check for new style options
            expect(p.renderer().options().at(0).name()).toBe("dotsize");
            expect(p.renderer().options().at(0).value()).toBe("2");
            expect(p.renderer().options().at(1).name()).toBe("linecolor");
            expect(p.renderer().options().at(1).value()).toBe("0x345678");
*/
        });

    });

    describe("Filter", function () {
        var filter;

        beforeEach(function () {
            filter = new Filter();
        });

        it("should be able to add a filter to a DataPlot", function () {
            p.filter(filter);
            expect(p.filter()).toBe(filter);
        });

        it("should be able to add a filter with attributes and children to a DataPlot", function () {
            var option = new FilterOption(),
                option2 = new FilterOption();
            filter.type("bar");
            option.name("barwidth").value("3");
            filter.options().add(option);
            option2.name("linecolor").value("0x345678");
            filter.options().add(option2);
            p.filter(filter);
            expect(p.filter().type()).toBe("bar");
            expect(p.filter().options().at(0)).toBe(option);
            expect(p.filter().options().at(1)).toBe(option2);
        });

        it("should be able to set/get attributes of filters added to a DataPlot", function () {
            var option = new FilterOption(),
                option2 = new FilterOption();
            filter.options().add(option);
            option2.name("linecolor").value("0x345678");
            filter.options().add(option2);
            p.filter(filter);
            p.filter().type("line");
            p.filter().options().at(0).name("dotsize").value("2");
            expect(p.filter().type()).toBe("line");
            expect(p.filter().options().at(0).name()).toBe("dotsize");
            expect(p.filter().options().at(0).value()).toBe("2");
            expect(p.filter().options().at(1).name()).toBe("linecolor");
            expect(p.filter().options().at(1).value()).toBe("0x345678");
        });

    });

    describe("Datatips", function () {
        var datatips;

        beforeEach(function () {
            datatips = new Datatips();
        });

        it("should be able to add a datatips to a DataPlot", function () {
            p.datatips(datatips);
            expect(p.datatips()).toBe(datatips);
        });

        it("should be able to add datatips with attributes and children to a DataPlot", function () {
            var variable = new DatatipsVariable(),
                variable2 = new DatatipsVariable();
            datatips.formatString("{0} {0} {0}")
                .bgcolor(window.multigraph.math.RGBColor.parse("0xAABBCC"))
                .bgalpha(0.2)
                .border(7)
                .bordercolor(window.multigraph.math.RGBColor.parse("0x123421"))
                .pad(4);
            variable.formatString("%d %n %Y");
            datatips.variables().add(variable);
            variable2.formatString("%.2f");
            datatips.variables().add(variable2);
            p.datatips(datatips);
            expect(p.datatips().formatString()).toBe("{0} {0} {0}");
            expect(p.datatips().bgcolor().getHexString()).toBe("0xaabbcc");
            expect(p.datatips().bgalpha()).toBe(0.2);
            expect(p.datatips().border()).toBe(7);
            expect(p.datatips().bordercolor().getHexString()).toBe("0x123421");
            expect(p.datatips().pad()).toBe(4);
            expect(p.datatips().variables().at(0)).toBe(variable);
            expect(p.datatips().variables().at(1)).toBe(variable2);
        });

        it("should be able to set/get attributes of datatips added to a DataPlot", function () {
            var variable = new DatatipsVariable(),
                variable2 = new DatatipsVariable();
            datatips.variables().add(variable);
            p.datatips(datatips);

            p.datatips().formatString("{0} : {1} {1}")
                .bgcolor(window.multigraph.math.RGBColor.parse("0xAABBDC"))
                .bgalpha(0.5)
                .border(8)
                .bordercolor(window.multigraph.math.RGBColor.parse("0xD23421"))
                .pad(4);

            variable2.formatString("%1d");
            p.datatips().variables().add(variable2);
            p.datatips().variables().at(0).formatString("%4f");

            expect(p.datatips().formatString()).toBe("{0} : {1} {1}");
            expect(p.datatips().bgcolor().getHexString()).toBe("0xaabbdc");
            expect(p.datatips().bgalpha()).toBe(0.5);
            expect(p.datatips().border()).toBe(8);
            expect(p.datatips().bordercolor().getHexString()).toBe("0xd23421");
            expect(p.datatips().pad()).toBe(4);
            expect(p.datatips().variables().at(0).formatString()).toBe("%4f");
            expect(p.datatips().variables().at(1).formatString()).toBe("%1d");
        });

    });


});
