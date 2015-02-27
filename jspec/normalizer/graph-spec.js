/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph Normalizer", function () {
    "use strict";

    var Graph = require('../../src/core/graph.js'),
        Axis = require('../../src/core/axis.js'),
        Data = require('../../src/core/data.js'),
        DataVariable = require('../../src/core/data_variable.js'),
        DataValue = require('../../src/core/data_value.js'),
        DataPlot = require('../../src/core/data_plot.js'),
        graph;

    beforeEach(function () {
        var NormalizerMixin = require('../../src/normalizer/normalizer_mixin.js');
        NormalizerMixin.apply();
        graph = new Graph();
        graph.data().add(new Data([new DataVariable("x", 0, DataValue.NUMBER), new DataVariable("y", 1, DataValue.NUMBER), new DataVariable("y1", 2, DataValue.NUMBER)]));
    });

    describe("handling missing axes", function () {
        it("should insert a vertical axis if one does not exist", function () {
            var vaxisCount = 0,
                i;

            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.VERTICAL) {
                    vaxisCount++;
                }
            }
            expect(vaxisCount).toEqual(0);

            graph.normalize();

            vaxisCount = 0;
            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.VERTICAL) {
                    vaxisCount++;
                }
            }
            expect(vaxisCount).toEqual(1);
        });

        it("should insert a horizontal axis if one does not exist", function () {
            var haxisCount = 0,
                i;

            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.HORIZONTAL) {
                    haxisCount++;
                }
            }
            expect(haxisCount).toEqual(0);

            graph.normalize();

            haxisCount = 0;
            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.HORIZONTAL) {
                    haxisCount++;
                }
            }
            expect(haxisCount).toEqual(1);
        });

        it("should not insert a horizontal axis if one exists", function () {
            var h1 = new Axis(Axis.HORIZONTAL),
                h2 = new Axis(Axis.HORIZONTAL),
                haxisCount,
                i;
    
            graph.axes().add(h1);
            graph.axes().add(h2);

            haxisCount = 0;
            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.HORIZONTAL) {
                    haxisCount++;
                }
            }
            expect(haxisCount).toEqual(2);
            expect(graph.axes().at(0)).toBe(h1);
            expect(graph.axes().at(1)).toBe(h2);

            graph.normalize();

            haxisCount = 0;
            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.HORIZONTAL) {
                    haxisCount++;
                }
            }
            expect(haxisCount).toEqual(2);
            expect(graph.axes().at(0)).toBe(h1);
            expect(graph.axes().at(1)).toBe(h2);
        });

        it("should not insert a vertical axis if one exists", function () {
            var v1 = new Axis(Axis.VERTICAL),
                v2 = new Axis(Axis.VERTICAL),
                vaxisCount,
                i;
    
            graph.axes().add(v1);
            graph.axes().add(v2);

            vaxisCount = 0;
            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.VERTICAL) {
                    vaxisCount++;
                }
            }
            expect(vaxisCount).toEqual(2);
            expect(graph.axes().at(0)).toBe(v1);
            expect(graph.axes().at(1)).toBe(v2);

            graph.normalize();

            vaxisCount = 0;
            for (i = 0; i < graph.axes().size(); i++) {
                if (graph.axes().at(i).orientation() === Axis.VERTICAL) {
                    vaxisCount++;
                }
            }
            expect(vaxisCount).toEqual(2);
            expect(graph.axes().at(0)).toBe(v1);
            expect(graph.axes().at(1)).toBe(v2);
        });

    });

    describe("handling missing ids for axes", function () {

        it("should insert the proper format of id", function () {
            var h1 = new Axis(Axis.HORIZONTAL),
                h2 = new Axis(Axis.HORIZONTAL),
                h3 = new Axis(Axis.HORIZONTAL),
                v1 = new Axis(Axis.VERTICAL),
                v2 = new Axis(Axis.VERTICAL);

            graph = new Graph();
            graph.data().add(new Data([new DataVariable("x", 0, DataValue.NUMBER), new DataVariable("y", 1, DataValue.NUMBER), new DataVariable("y1", 2, DataValue.NUMBER)]));
            graph.normalize();

            expect(graph.axes().at(0).id()).toEqual("x");
            expect(graph.axes().at(1).id()).toEqual("y");

        });

    });

    describe("handling missing plots", function () {
        it("should insert a plot tag if one does not exist", function () {
            expect(graph.plots().size()).toEqual(0);

            graph.normalize();

            expect(graph.plots().size()).toEqual(1);
        });

        it("should not insert a plot tag if at least one exists", function () {
            var plot1 = new DataPlot(),
                plot2 = new DataPlot(),
                plot3 = new DataPlot();
            expect(graph.plots().size()).toEqual(0);

            graph.plots().add(plot1);

            expect(graph.plots().size()).toEqual(1);

            graph.normalize();

            expect(graph.plots().size()).toEqual(1);
            expect(graph.plots().at(0)).toBe(plot1);

            graph.plots().add(plot2);
            graph.plots().add(plot3);

            expect(graph.plots().size()).toEqual(3);

            graph.normalize();

            expect(graph.plots().size()).toEqual(3);
            expect(graph.plots().at(0)).toBe(plot1);
            expect(graph.plots().at(1)).toBe(plot2);
            expect(graph.plots().at(2)).toBe(plot3);
        });
    });

});
