/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Multigraph", function () {
    "use strict";

    var Graph = window.multigraph.Graph,
        Multigraph = window.multigraph.Multigraph,
        Axis = window.multigraph.Axis,
        mg;

    beforeEach(function () {
        mg = new Multigraph();
    });

    it("should be able to create a Multigraph", function () {
        expect(mg instanceof Multigraph).toBe(true);
    });

    describe("Children", function () {
        var Plot = window.multigraph.Plot,
            Window = window.multigraph.Window,
            UI = window.multigraph.UI,
            NetworkMonitor = window.multigraph.NetworkMonitor,
            Debugger = window.multigraph.Debugger,
            Legend = window.multigraph.Legend,
            Background = window.multigraph.Background,
            Plotarea = window.multigraph.Plotarea,
            Data = window.multigraph.Data,
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
            h = new Axis('horizontal'),
            v = new Axis('vertical'),
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
            var h2 = new Axis('horizontal');
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


            expect(mg.graphs().size() === 0).toBe(true);
            mg.graphs().add(g);
            expect(mg.graphs().at(0) === g).toBe(true);
            expect(mg.graphs().size() === 1).toBe(true);
        });

        it("should be able to add many Graphs to the Multigraph", function () {
            var g2 = new Graph(),
                h2 = new Axis('horizontal');

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

            expect(mg.graphs().size() === 2).toBe(true);
            expect(mg.graphs().at(0) === g2).toBe(true);
            expect(mg.graphs().at(1) === g).toBe(true);
        });

    });

});
