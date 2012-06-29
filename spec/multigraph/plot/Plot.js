/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Plot = window.multigraph.Plot,
        Legend = window.multigraph.Plot.Legend,
        Filter = window.multigraph.Plot.Filter,
        FilterOption = window.multigraph.Plot.Filter.Option,
        Renderer = window.multigraph.Plot.Renderer,
        RendererOption = window.multigraph.Plot.Renderer.Option,
        Datatips = window.multigraph.Plot.Datatips,
        DatatipsVariable = window.multigraph.Plot.Datatips.Variable,
        DataVariable = window.multigraph.Data.Variables.Variable,
        p;

    beforeEach(function () {
        p = new Plot();
    }); 

    it("should be able to create a Plot", function () {
        expect(p instanceof Plot).toBe(true);
    });

    describe("Axes", function () {
        var h,
            v;

        beforeEach(function () {
            h = new Axis('horizontal'),
            v = new Axis('vertical');
        });

        it("should be able to add a horizontal axis to a Plot", function () {
            p.horizontalaxis(h);
            expect(p.horizontalaxis() === h).toBe(true);
        });

        it("should be able to add a vertical axis to a Plot", function () {
            p.verticalaxis(v);
            expect(p.verticalaxis() === v).toBe(true);
        });

        it("should be able to add axes with attributes to a Plot", function () {
            h.id("xaxis");
            v.min("auto").id("yaxis");
            p.horizontalaxis(h);
            p.verticalaxis(v);
            expect(p.horizontalaxis() === h).toBe(true);
            expect(p.verticalaxis() === v).toBe(true);
        });

        it("should be able to set/get attributes of axes added to a Plot", function () {
            p.horizontalaxis(h);
            p.verticalaxis(v);
            p.horizontalaxis().id("xaxis").min("auto");
            p.verticalaxis().id("yaxis").max("200");
            expect(p.horizontalaxis().id() === 'xaxis').toBe(true);
            expect(p.horizontalaxis().min() === 'auto').toBe(true);
            expect(p.verticalaxis().id() === 'yaxis').toBe(true);
            expect(p.verticalaxis().max() === '200').toBe(true);
        });

    });

    describe("Data Variable's", function () {
        var v,
            v2;

        beforeEach(function () {
            v = new DataVariable('x');
            v2 = new DataVariable('y');
            v.id('x').column('2');
            v2.id('y').column('1');
        });

        it("should be able to add a variable to a Plot", function () {
            p.variable().add(v);
            expect(p.variable().at(0) === v).toBe(true);
        });

        it("should be able to add multiple variables to a Plot", function () {
            p.variable().add(v);
            p.variable().add(v2);
            expect(p.variable().at(0) === v).toBe(true);
            expect(p.variable().at(1) === v2).toBe(true);
        });

    });

    describe("Legend", function () {
        var legend;

        beforeEach(function () {
            legend = new Legend();
        });

        it("should be able to add a Legend to a Plot", function () {
            p.legend(legend);
            expect(p.legend() === legend).toBe(true);
        });

        it("should be able to add a Legend with attributes to a Plot", function () {
            legend.visible("false");
            p.legend(legend);
            expect(p.legend() === legend).toBe(true);
        });

        it("should be able to set/get attributes a legend added to a Plot", function () {
            p.legend(legend);
            p.legend().visible('true');
            p.legend().label('tag');
            expect(p.legend().visible() === 'true').toBe(true);
            expect(p.legend().label() === 'tag').toBe(true);
        });

    });

    describe("Renderer", function () {
        var renderer;

        beforeEach(function () {
            renderer = new Renderer('line');
        });

        it("should be able to add a renderer to a Plot", function () {
            p.renderer(renderer);
            expect(p.renderer() === renderer).toBe(true);
        });

        it("should be able to add axes with attributes and children to a Plot", function () {
            var option = new RendererOption('barwidth', '3'),
                option2 = new RendererOption('linecolor', '0x345678');
            renderer.type("bar");
            renderer.options().add(option);
            renderer.options().add(option2);
            p.renderer(renderer);
            expect(p.renderer().type() === "bar").toBe(true);
            expect(p.renderer().options().at(0) === option).toBe(true);
            expect(p.renderer().options().at(1) === option2).toBe(true);
        });

        it("should be able to set/get attributes of renderers added to a Plot", function () {
            var option = new RendererOption('barwidth', '3'),
                option2 = new RendererOption('linecolor', '0x345678');
            renderer.options().add(option);
            renderer.options().add(option2);
            p.renderer(renderer);
            p.renderer().type("line");
            p.renderer().options().at(0).name("dotsize").value("2");
            expect(p.renderer().type() === "line").toBe(true);
            expect(p.renderer().options().at(0).name() === 'dotsize').toBe(true);
            expect(p.renderer().options().at(0).value() === '2').toBe(true);
            expect(p.renderer().options().at(1).name() === 'linecolor').toBe(true);
            expect(p.renderer().options().at(1).value() === '0x345678').toBe(true);
        });

    });

    describe("Filter", function () {
        var filter;

        beforeEach(function () {
            filter = new Filter();
        });

        it("should be able to add a filter to a Plot", function () {
            p.filter(filter);
            expect(p.filter() === filter).toBe(true);
        });

        it("should be able to add a filter with attributes and children to a Plot", function () {
            var option = new FilterOption(),
                option2 = new FilterOption();
            filter.type("bar");
            option.name("barwidth").value("3");
            filter.options().add(option);
            option2.name("linecolor").value("0x345678");
            filter.options().add(option2);
            p.filter(filter);
            expect(p.filter().type() === "bar").toBe(true);
            expect(p.filter().options().at(0) === option).toBe(true);
            expect(p.filter().options().at(1) === option2).toBe(true);
        });

        it("should be able to set/get attributes of filters added to a Plot", function () {
            var option = new FilterOption(),
                option2 = new FilterOption();
            filter.options().add(option);
            option2.name("linecolor").value("0x345678");
            filter.options().add(option2);
            p.filter(filter);
            p.filter().type("line");
            p.filter().options().at(0).name("dotsize").value("2");
            expect(p.filter().type() === "line").toBe(true);
            expect(p.filter().options().at(0).name() === 'dotsize').toBe(true);
            expect(p.filter().options().at(0).value() === '2').toBe(true);
            expect(p.filter().options().at(1).name() === 'linecolor').toBe(true);
            expect(p.filter().options().at(1).value() === '0x345678').toBe(true);
        });

    });

    describe("Datatips", function () {
        var datatips;

        beforeEach(function () {
            datatips = new Datatips();
        });

        it("should be able to add a datatips to a Plot", function () {
            p.datatips(datatips);
            expect(p.datatips() === datatips).toBe(true);
        });

        it("should be able to add datatips with attributes and children to a Plot", function () {
            var variable = new DatatipsVariable(),
                variable2 = new DatatipsVariable();
            datatips.format("number");
            datatips.bgcolor("0xAABBCC");
            datatips.bgalpha("2");
            datatips.border(7);
            datatips.bordercolor("0x123421");
            datatips.pad(4);
            variable.format("datetime");
            datatips.variables().add(variable);
            variable2.format("number");
            datatips.variables().add(variable2);
            p.datatips(datatips);
            expect(p.datatips().format() === "number").toBe(true);
            expect(p.datatips().bgcolor() === "0xAABBCC").toBe(true);
            expect(p.datatips().bgalpha() === "2").toBe(true);
            expect(p.datatips().border() === 7).toBe(true);
            expect(p.datatips().bordercolor() === "0x123421").toBe(true);
            expect(p.datatips().pad() === 4).toBe(true);
            expect(p.datatips().variables().at(0) === variable).toBe(true);
            expect(p.datatips().variables().at(1) === variable2).toBe(true);
        });

        it("should be able to set/get attributes of datatips added to a Plot", function () {
            var variable = new DatatipsVariable(),
                variable2 = new DatatipsVariable();
            datatips.variables().add(variable);
            p.datatips(datatips);

            p.datatips().format("datetime");
            p.datatips().bgcolor("0xAABBDC");
            p.datatips().bgalpha("3");
            p.datatips().border(8);
            p.datatips().bordercolor("0xD23421");
            p.datatips().pad(4);

            variable2.format("number");
            p.datatips().variables().add(variable2);
            p.datatips().variables().at(0).format('number');

            expect(p.datatips().format() === "datetime").toBe(true);
            expect(p.datatips().bgcolor() === "0xAABBDC").toBe(true);
            expect(p.datatips().bgalpha() === "3").toBe(true);
            expect(p.datatips().border() === 8).toBe(true);
            expect(p.datatips().bordercolor() === "0xD23421").toBe(true);
            expect(p.datatips().pad() === 4).toBe(true);
            expect(p.datatips().variables().at(0).format() === 'number').toBe(true);
            expect(p.datatips().variables().at(1).format() === 'number').toBe(true);
        });

    });


});
