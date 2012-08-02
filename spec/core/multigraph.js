/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Multigraph", function () {
    "use strict";

    var Graph = window.multigraph.core.Graph,
        Multigraph = window.multigraph.core.Multigraph,
        Axis = window.multigraph.core.Axis,
        mg;

    beforeEach(function () {
        mg = new Multigraph();
    });

    it("should be able to create a Multigraph", function () {
        expect(mg instanceof Multigraph).toBe(true);
    });

    describe("Children", function () {
        var Plot = window.multigraph.core.Plot,
            Window = window.multigraph.core.Window,
            UI = window.multigraph.core.UI,
            NetworkMonitor = window.multigraph.core.NetworkMonitor,
            Debugger = window.multigraph.core.Debugger,
            Legend = window.multigraph.core.Legend,
            Background = window.multigraph.core.Background,
            Plotarea = window.multigraph.core.Plotarea,
            Data = window.multigraph.core.Data,
            g,
            h,
            v,
            w,
            ui,
            debug,
            legend,
            background,
            plotarea,
            data,
            p;

        beforeEach(function () {
            g = new Graph(),
            h = new Axis("horizontal"),
            v = new Axis("vertical"),
            w = new Window(),
            ui = new UI(),
            debug = new Debugger(),
            legend = new Legend(),
            background = new Background(),
            plotarea = new Plotarea(),
            data = new Data(),
            p = new Plot();
        });

        it("should be able to add a Graph to the Multigraph", function () {
            var h2 = new Axis("horizontal");
            g.axes().add(h);
            g.axes().add(h2);
            g.axes().add(v);
            g.plots().add(p);
            g.data().add(data);
            g.window(w);
            g.ui(ui);
            g.Debugger(debug);
            g.legend(legend);
            g.background(background);
            g.plotarea(plotarea);


            expect(mg.graphs().size()).toBe(0);
            mg.graphs().add(g);
            expect(mg.graphs().at(0)).toBe(g);
            expect(mg.graphs().size()).toBe(1);
        });

        it("should be able to add many Graphs to the Multigraph", function () {
            var g2 = new Graph(),
                h2 = new Axis("horizontal");

            g.axes().add(h);
            g.axes().add(h2);
            g.axes().add(v);
            g.plots().add(p);
            g.data().add(data);
            g.window(w);
            g.ui(ui);
            g.Debugger(debug);
            g.legend(legend);
            g.background(background);
            g.plotarea(plotarea);

            g2.axes().add(h);
            g2.axes().add(h2);
            g2.axes().add(h2);
            g2.axes().add(v);
            g2.plots().add(p);
            g2.data().add(data);
            g2.window(w);
            g2.ui(ui);

            mg.graphs().add(g2);
            mg.graphs().add(g);

            expect(mg.graphs().size()).toBe(2);
            expect(mg.graphs().at(0)).toBe(g2);
            expect(mg.graphs().at(1)).toBe(g);
        });

    });

});
