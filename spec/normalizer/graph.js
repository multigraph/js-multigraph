/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph Normalizer", function () {
    "use strict";

    var Graph = window.multigraph.core.Graph,
        Axis = window.multigraph.core.Axis,
        graph;

    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
        graph = new Graph();
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

});
