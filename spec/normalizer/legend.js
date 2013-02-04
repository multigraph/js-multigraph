/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend Normalizer", function () {
    "use strict";

    var Legend = window.multigraph.core.Legend,
        Graph = window.multigraph.core.Graph,
        DataPlot = window.multigraph.core.DataPlot,
        PlotLegend = window.multigraph.core.PlotLegend,
        legend,
        graph,
        plot1, plot2, plot3, plot4;

    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);        
        legend = new Legend();
        plot1 = new DataPlot();
        plot2 = new DataPlot();
        plot3 = new DataPlot();
        plot4 = new DataPlot();
        plot1.legend(new PlotLegend());
        plot2.legend(new PlotLegend());
        plot3.legend(new PlotLegend());
        plot4.legend(new PlotLegend());
        graph = new Graph();
    });

    describe("storing pointers to plots", function () {
        beforeEach(function () {
            plot1.legend().visible(true);
            plot2.legend().visible(true);
            plot3.legend().visible(false);
            plot4.legend().visible(true);
            graph.plots().add(plot1);
            graph.plots().add(plot2);
            graph.plots().add(plot3);
            graph.plots().add(plot4);
        });

        it("should only add plots if they have visible legends", function () {
            expect(legend.plots().size()).toEqual(0);
            legend.normalize(graph);
            expect(legend.plots().size()).toEqual(3);
            expect(legend.plots().at(0)).toBe(plot1);
            expect(legend.plots().at(1)).toBe(plot2);
            expect(legend.plots().at(2)).toBe(plot4);
        });

        it("should not add plots if do not have visible legends", function () {
            expect(legend.plots().size()).toEqual(0);
            legend.normalize(graph);
            expect(legend.plots().size()).toEqual(3);

            var flag = false, i;

            expect(plot3.legend().visible()).toEqual(false);
            for (i = 0; i < legend.plots().size(); i++) {
                if (legend.plots().at(i) === plot3) {
                    flag = true;
                }
            }
            expect(flag).toBe(false);
        });

        it("should not add plots if they have already been added", function () {
            legend.normalize(graph);
            expect(legend.plots().size()).toEqual(3);
            expect(legend.plots().at(0)).toBe(plot1);
            expect(legend.plots().at(1)).toBe(plot2);
            expect(legend.plots().at(2)).toBe(plot4);

            legend.normalize(graph);
            expect(legend.plots().size()).toEqual(3);
            expect(legend.plots().at(0)).toBe(plot1);
            expect(legend.plots().at(1)).toBe(plot2);
            expect(legend.plots().at(2)).toBe(plot4);
        });

    });

    describe("no plots in the legend", function () {
        it("should set the number of rows to 1 if rows was not set", function () {
            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.rows()).toEqual(1);
        });

        it("should not change the number of rows if explicitly set", function () {
            var rows = 5
            legend.rows(rows);
            expect(legend.rows()).toEqual(rows);
            legend.normalize(graph);
            expect(legend.rows()).toEqual(rows);
        });

        it("should set the number of columns to 1 if columns was not set", function () {
            expect(legend.columns()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.columns()).toEqual(1);
        });

        it("should not change the number of columns if explicitly set", function () {
            var columns = 8
            legend.columns(columns);
            expect(legend.columns()).toEqual(columns);
            legend.normalize(graph);
            expect(legend.columns()).toEqual(columns);
        });
    });

    describe("determining the number of rows in the legend", function () {
        beforeEach(function () {
            plot1.legend().visible(true);
            plot2.legend().visible(true);
            plot3.legend().visible(true);
            plot4.legend().visible(true);
        });

        it("should not change the number of rows if explicitly set", function () {
            legend.rows(3);
            expect(legend.rows()).toEqual(3);
            legend.normalize(graph);
            expect(legend.rows()).toEqual(3);
        });

        it("should correctly compute the number of rows for the legend when neither rows or columns is set", function () {
            graph.plots().add(plot1);
            graph.plots().add(plot2);

            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.rows()).toEqual(2);

            graph.plots().add(plot3);
            graph.plots().add(plot4);

            legend = new Legend();
            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.rows()).toEqual(4);
        });

        it("should correctly compute the number of rows for the legend if columns is set", function () {
            graph.plots().add(plot1);
            graph.plots().add(plot2);
            graph.plots().add(plot3);

            legend.columns(1);
            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.rows()).toEqual(3);

            legend = new Legend();
            legend.columns(2);
            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.rows()).toEqual(2);

            graph.plots().add(plot4);

            legend = new Legend();
            legend.columns(3);
            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.rows()).toEqual(2);

            legend = new Legend();
            legend.columns(6);
            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.rows()).toEqual(1);
        });

    });

    describe("determining the number of columns in the legend", function () {
        beforeEach(function () {
            plot1.legend().visible(true);
            plot2.legend().visible(true);
            plot3.legend().visible(true);
            plot4.legend().visible(true);
        });

        it("should not change the number of columns if explicitly set", function () {
            legend.columns(3);
            expect(legend.columns()).toEqual(3);
            legend.normalize(graph);
            expect(legend.columns()).toEqual(3);
        });

        it("should set columns to 1 when neither columns or rows is set", function () {
            graph.plots().add(plot1);
            graph.plots().add(plot2);

            expect(legend.columns()).toBeUndefined();
            expect(legend.rows()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.columns()).toEqual(1);
        });

        it("should correctly compute the number of columns for the legend if rows is set", function () {
            graph.plots().add(plot1);
            graph.plots().add(plot2);
            graph.plots().add(plot3);

            legend.rows(1);
            expect(legend.columns()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.columns()).toEqual(3);

            legend = new Legend();
            legend.rows(2);
            expect(legend.columns()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.columns()).toEqual(2);

            graph.plots().add(plot4);

            legend = new Legend();
            legend.rows(3);
            expect(legend.columns()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.columns()).toEqual(2);

            legend = new Legend();
            legend.rows(6);
            expect(legend.columns()).toBeUndefined();
            legend.normalize(graph);
            expect(legend.columns()).toEqual(1);
        });

    });

});
