/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Normalizer", function () {
    "use strict";

    var Plot = require('../../src/core/plot.js'),
        DataPlot = require('../../src/core/data_plot.js'),
        Renderer = require('../../src/core/renderer.js'),
        Axis = require('../../src/core/axis.js'),
        Graph = require('../../src/core/graph.js'),
        Data = require('../../src/core/data.js'),
        DataVariable = require('../../src/core/data_variable.js'),
        DataValue = require('../../src/core/data_value.js'),
        graph,
        plot;
    
    beforeEach(function () {
        //var NormalizerMixin = require('../../src/normalizer/normalizer_mixin.js');
        //NormalizerMixin.apply();
        graph = new Graph();
        graph.data().add(new Data([new DataVariable("x", 0, DataValue.NUMBER), new DataVariable("y", 1, DataValue.NUMBER), new DataVariable("y1", 2, DataValue.NUMBER)]));
        plot = new DataPlot();
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

    describe("handling variables", function () {
        var haxis,
            vaxis,
            rendererType,
            renderer;

        beforeEach(function () {
            graph = new Graph();
            haxis = new Axis(Axis.HORIZONTAL);
            vaxis = new Axis(Axis.VERTICAL);
            graph.axes().add(haxis);
            graph.axes().add(vaxis);
            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            rendererType = Renderer.Type.parse("fill");
            renderer = Renderer.create(rendererType);
            plot.renderer(renderer);
        });

        it("should insert the first unused variable for the horizontal axis if it was not set", function () {
            var variable1 = new DataVariable("x", 0, DataValue.NUMBER),
                variable2 = new DataVariable("y", 1, DataValue.NUMBER),
                variable3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variable4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variable5 = new DataVariable("y3", 4, DataValue.NUMBER);

            graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));

            expect(plot.variable().size()).toEqual(0);
            plot.normalize(graph);
            expect(plot.variable().at(0)).toBe(variable1);

            plot = new DataPlot();

            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            plot.renderer(renderer);
            plot.variable().add(null);
            plot.variable().add(variable1);
            plot.variable().add(variable2);

            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0)).toBe(null);
            expect(plot.variable().at(1)).toBe(variable1);
            expect(plot.variable().at(2)).toBe(variable2);
            plot.normalize(graph);
            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0)).toBe(variable3);
            expect(plot.variable().at(1)).toBe(variable1);
            expect(plot.variable().at(2)).toBe(variable2);

        });

        it("should insert the first unused variables starting from index one for the vertical axis if it was not set", function () {
            var variable1 = new DataVariable("x", 0, DataValue.NUMBER),
                variable2 = new DataVariable("y", 1, DataValue.NUMBER),
                variable3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variable4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variable5 = new DataVariable("y3", 4, DataValue.NUMBER);

            graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));

            expect(plot.variable().size()).toEqual(0);
            plot.normalize(graph);
            expect(plot.variable().at(1)).toBe(variable2);


            plot = new DataPlot();

            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            rendererType = Renderer.Type.parse("band");
            renderer = Renderer.create(rendererType);
            plot.renderer(renderer);

            expect(plot.variable().size()).toEqual(0);
            plot.normalize(graph);
            expect(plot.variable().at(1)).toBe(variable2);
            expect(plot.variable().at(2)).toBe(variable3);


            
            plot = new DataPlot();

            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            plot.renderer(renderer);

            plot.variable().add(variable2);

            expect(plot.variable().size()).toEqual(1);
            expect(plot.variable().at(0)).toBe(variable2);
            plot.normalize(graph);
            expect(plot.variable().at(0)).toBe(variable2);
            expect(plot.variable().at(1)).toBe(variable3);
            expect(plot.variable().at(2)).toBe(variable4);



            plot = new DataPlot();

            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            plot.renderer(renderer);

            plot.variable().add(variable3);

            expect(plot.variable().size()).toEqual(1);
            expect(plot.variable().at(0)).toBe(variable3);
            plot.normalize(graph);
            expect(plot.variable().at(0)).toBe(variable3);
            expect(plot.variable().at(1)).toBe(variable2);
            expect(plot.variable().at(2)).toBe(variable4);

        });

        it("should loop over the list of variables if there does not exist one which wasn't already set", function () {
            var variable1 = new DataVariable("x", 0, DataValue.NUMBER),
                variable2 = new DataVariable("y", 1, DataValue.NUMBER),
                variable3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variable4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variable5 = new DataVariable("y3", 4, DataValue.NUMBER);

            graph.data().add(new Data([variable1, variable2]));

            plot.variable().add(variable2);
            expect(plot.variable().size()).toEqual(1);
            expect(plot.variable().at(0)).toBe(variable2);
            plot.normalize(graph);
            expect(plot.variable().at(0)).toBe(variable2);
            expect(plot.variable().at(1)).toBe(variable1);

            plot = new DataPlot();

            graph.data().pop();
            graph.data().add(new Data([variable1, variable2, variable3]));
            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            rendererType = Renderer.Type.parse("band");
            renderer = Renderer.create(rendererType);
            plot.renderer(renderer);

            plot.variable().add(variable3);
            plot.variable().add(variable2);

            expect(plot.variable().size()).toEqual(2);
            expect(plot.variable().at(0)).toBe(variable3);
            expect(plot.variable().at(1)).toBe(variable2);
            plot.normalize(graph);
            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0)).toBe(variable3);
            expect(plot.variable().at(1)).toBe(variable2);
            expect(plot.variable().at(2)).toBe(variable1);

        });

        it("should not insert a variable if enough exist", function () {
            var variable1 = new DataVariable("x", 0, DataValue.NUMBER),
                variable2 = new DataVariable("y", 1, DataValue.NUMBER),
                variable3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variable4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variable5 = new DataVariable("y3", 4, DataValue.NUMBER);

            graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));

            plot.variable().add(variable1);
            plot.variable().add(variable2);

            expect(plot.variable().size()).toEqual(2);
            expect(plot.variable().at(0)).toBe(variable1);
            expect(plot.variable().at(1)).toBe(variable2);
            plot.normalize(graph);
            expect(plot.variable().size()).toEqual(2);
            expect(plot.variable().at(0)).toBe(variable1);
            expect(plot.variable().at(1)).toBe(variable2);



            plot = new DataPlot();

            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            rendererType = Renderer.Type.parse("band");
            renderer = Renderer.create(rendererType);
            plot.renderer(renderer);

            plot.variable().add(variable4);
            plot.variable().add(variable1);
            plot.variable().add(variable2);

            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0)).toBe(variable4);
            expect(plot.variable().at(1)).toBe(variable1);
            expect(plot.variable().at(2)).toBe(variable2);
            plot.normalize(graph);
            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0)).toBe(variable4);
            expect(plot.variable().at(1)).toBe(variable1);
            expect(plot.variable().at(2)).toBe(variable2);



            plot = new DataPlot();

            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            plot.renderer(renderer);

            plot.variable().add(variable4);
            plot.variable().add(variable3);
            plot.variable().add(variable5);
            plot.variable().add(variable1);
            plot.variable().add(variable2);

            expect(plot.variable().size()).toEqual(5);
            expect(plot.variable().at(0)).toBe(variable4);
            expect(plot.variable().at(1)).toBe(variable3);
            expect(plot.variable().at(2)).toBe(variable5);
            expect(plot.variable().at(3)).toBe(variable1);
            expect(plot.variable().at(4)).toBe(variable2);
            plot.normalize(graph);
            expect(plot.variable().size()).toEqual(5);
            expect(plot.variable().at(0)).toBe(variable4);
            expect(plot.variable().at(1)).toBe(variable3);
            expect(plot.variable().at(2)).toBe(variable5);
            expect(plot.variable().at(3)).toBe(variable1);
            expect(plot.variable().at(4)).toBe(variable2);

        });

        it("should throw an error if it cannot find an unused variable", function () {
            var variable1 = new DataVariable("x", 0, DataValue.NUMBER);

            graph.data().add(new Data([variable1]));

            expect(function () {
                plot.normalize(graph);
            //}).toThrowError("Plot Normalizer: There does not exist an unused variable");
            }).toThrow();

        });

        it("should use the first Data model if it was not set", function () {
            var variable1 = new DataVariable("x", 0, DataValue.NUMBER),
                variable2 = new DataVariable("y", 1, DataValue.NUMBER),
                variable3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variable4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variable5 = new DataVariable("y3", 4, DataValue.NUMBER);

            graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));

            expect(plot.data()).toBeUndefined();
            plot.normalize(graph);
            expect(plot.data()).not.toBeUndefined();
            expect(plot.data()).toBe(graph.data().at(0));

        });

        it("should only pull variables from the data model it is assigned to", function () {
            var variablea1 = new DataVariable("x", 0, DataValue.NUMBER),
                variablea2 = new DataVariable("y", 1, DataValue.NUMBER),
                variablea3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variablea4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variablea5 = new DataVariable("y3", 4, DataValue.NUMBER),
                variableb1 = new DataVariable("x", 0, DataValue.NUMBER),
                variableb2 = new DataVariable("y", 1, DataValue.NUMBER),
                variableb3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variableb4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variableb5 = new DataVariable("y3", 4, DataValue.NUMBER);

            graph.data().add(new Data([variablea1, variablea2, variablea3, variablea4, variablea5]));
            graph.data().add(new Data([variableb1, variableb2, variableb3, variableb4, variableb5]));

            expect(plot.variable().size()).toEqual(0);
            plot.normalize(graph);
            expect(plot.variable().at(0)).toBe(variablea1);
            expect(plot.variable().at(1)).toBe(variablea2);

            plot = new DataPlot();

            plot.horizontalaxis(haxis);
            plot.verticalaxis(vaxis);
            plot.renderer(renderer);
            plot.data(graph.data().at(1));

            expect(plot.variable().size()).toEqual(0);
            plot.normalize(graph);
            expect(plot.variable().at(0)).toBe(variableb1);
            expect(plot.variable().at(1)).toBe(variableb2);

        });

        describe("number of variables per renderer type", function () {
            var variable1,
                variable2,
                variable3,
                variable4,
                variable5;

            beforeEach(function () {
                variable1 = new DataVariable("x", 0, DataValue.NUMBER),
                variable2 = new DataVariable("y", 1, DataValue.NUMBER),
                variable3 = new DataVariable("y1", 2, DataValue.NUMBER),
                variable4 = new DataVariable("y2", 3, DataValue.NUMBER),
                variable5 = new DataVariable("y3", 4, DataValue.NUMBER);
            });

            it("should insert 2 variables for a line renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(2);
            });

            it("should insert 2 variables for a pointline renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("pointline");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(2);
            });

            // TODO: enable this spec once the point renderer has been enabled
            xit("should insert 2 variables for a point renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("point");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(2);
            });

            it("should insert 2 variables for a bar renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("bar");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(2);
            });

            it("should insert 2 variables for a fill renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("fill");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(2);
            });

            it("should insert 3 variables for a band renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("band");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(3);
            });

            // TODO: enable this spec once the rangebar renderer has been enabled
            xit("should insert 3 variables for a rangebar renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("rangebar");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(3);
            });

            // TODO: enable this spec once the lineerror renderer has been enabled
            xit("should insert 3 variables for a lineerror renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("lineerror");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(3);
            });

            // TODO: enable this spec once the barerror renderer has been enabled
            xit("should insert 3 variables for a barerror renderer", function () {
                graph.data().add(new Data([variable1, variable2, variable3, variable4, variable5]));
                
                rendererType = Renderer.Type.parse("barerror");
                renderer = Renderer.create(rendererType);
                plot.renderer(renderer);

                expect(plot.variable().size()).toEqual(0);
                plot.normalize(graph);
                expect(plot.variable().size()).toEqual(3);
            });

        });

    });

});
