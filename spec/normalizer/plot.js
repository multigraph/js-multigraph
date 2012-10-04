/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Normalizer", function () {
    "use strict";

    var Plot = window.multigraph.core.Plot,
        Renderer = window.multigraph.core.Renderer,
        Axis = window.multigraph.core.Axis,
        Graph = window.multigraph.core.Graph,
        graph,
        plot;
    
    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
        graph = new Graph();
        plot = new Plot();
    });

    describe("handling axes", function () {
        var haxis1,
            haxis2,
            haxis3,
            vaxis1,
            vaxis2,
            vaxis3;

        beforeEach(function () {
            haxis1 = new Axis(Axis.HORIZONTAL);
            haxis2 = new Axis(Axis.HORIZONTAL);
            haxis3 = new Axis(Axis.HORIZONTAL);
            vaxis1 = new Axis(Axis.VERTICAL);
            vaxis2 = new Axis(Axis.VERTICAL);
            vaxis3 = new Axis(Axis.VERTICAL);
        });

        it("should insert a horizontal axis if one does not exist", function () {
            graph.axes().add(haxis1);
            graph.axes().add(vaxis2);
            expect(plot.horizontalaxis()).toBe(undefined);

            plot.normalize(graph);

            expect(plot.horizontalaxis()).not.toBe(undefined);
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
        });

        it("should insert the first axis with an orientation of HORIZONTAL in its graph object if one does not exist", function () {
            graph.axes().add(vaxis2);
            graph.axes().add(vaxis1);
            graph.axes().add(haxis3);
            graph.axes().add(vaxis3);
            graph.axes().add(haxis2);
            graph.axes().add(haxis1);
            expect(plot.horizontalaxis()).toBe(undefined);

            plot.normalize(graph);

            expect(plot.horizontalaxis()).not.toBe(undefined);
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
            expect(plot.horizontalaxis()).toBe(haxis3);
            expect(plot.horizontalaxis().orientation()).toEqual(Axis.HORIZONTAL);
        });

        it("should not insert a horizontal axis if one exists", function () {
            graph.axes().add(haxis2);
            graph.axes().add(vaxis2);
            plot.horizontalaxis(haxis2);
            expect(plot.horizontalaxis()).not.toBe(undefined);
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
            expect(plot.horizontalaxis()).toBe(haxis2);
            expect(plot.horizontalaxis().orientation()).toEqual(Axis.HORIZONTAL);

            plot.normalize(graph);

            expect(plot.horizontalaxis()).not.toBe(undefined);
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
            expect(plot.horizontalaxis()).toBe(haxis2);
            expect(plot.horizontalaxis().orientation()).toEqual(Axis.HORIZONTAL);
        });

        it("should insert a vertical axis if one does not exist", function () {
            graph.axes().add(haxis1);
            graph.axes().add(vaxis2);
            expect(plot.verticalaxis()).toBe(undefined);

            plot.normalize(graph);

            expect(plot.verticalaxis()).not.toBe(undefined);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
        });

        it("should insert the first axis with an orientation of VERTICAL in its graph object if one does not exist", function () {
            graph.axes().add(haxis1);
            graph.axes().add(vaxis2);
            graph.axes().add(vaxis1);
            graph.axes().add(haxis3);
            graph.axes().add(vaxis3);
            graph.axes().add(haxis2);
            expect(plot.verticalaxis()).toBe(undefined);

            plot.normalize(graph);

            expect(plot.verticalaxis()).not.toBe(undefined);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
            expect(plot.verticalaxis()).toBe(vaxis2);
            expect(plot.verticalaxis().orientation()).toEqual(Axis.VERTICAL);
        });

        it("should not insert a vertical axis if one exists", function () {
            graph.axes().add(haxis1);
            graph.axes().add(vaxis3);
            plot.verticalaxis(vaxis3);
            expect(plot.verticalaxis()).not.toBe(undefined);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
            expect(plot.verticalaxis()).toBe(vaxis3);
            expect(plot.verticalaxis().orientation()).toEqual(Axis.VERTICAL);

            plot.normalize(graph);

            expect(plot.verticalaxis()).not.toBe(undefined);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
            expect(plot.verticalaxis()).toBe(vaxis3);
            expect(plot.verticalaxis().orientation()).toEqual(Axis.VERTICAL);
        });

    });

    describe("handling renderers", function () {
        var haxis,
            vaxis;

        beforeEach(function () {
            haxis = new Axis(Axis.HORIZONTAL);
            vaxis = new Axis(Axis.VERTICAL);
            graph.axes().add(haxis);
            graph.axes().add(vaxis);
            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
        });

        it("should insert a renderer of type 'line' if a renderer does not exist", function () {
            expect(plot.renderer()).toBe(undefined);

            plot.normalize(graph);

            expect(plot.renderer()).not.toBe(undefined);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer().type()).toEqual(Renderer.LINE);
        });

        it("should not insert a renderer if one exists", function () {
            var rendererType,
                renderer;

            expect(plot.renderer()).toBe(undefined);

            rendererType = Renderer.Type.parse("fill");
            renderer = Renderer.create(rendererType);
            plot.renderer(renderer);

            expect(plot.renderer()).not.toBe(undefined);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer()).toBe(renderer);
            expect(plot.renderer().type()).toEqual(Renderer.FILL);

            plot.normalize(graph);

            expect(plot.renderer()).not.toBe(undefined);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer()).toBe(renderer);
            expect(plot.renderer().type()).toEqual(Renderer.FILL);
        });

    });

});
