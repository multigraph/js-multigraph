/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph", function () {
    "use strict";

    var Graph = window.multigraph.core.Graph,
        Axis = window.multigraph.core.Axis,
        g,
        defaults = window.multigraph.utilityFunctions.getDefaultValuesFromXSD();

    beforeEach(function () {
        g = new Graph();
    });

    it("should be able to create a Graph", function () {
        expect(g instanceof Graph).toBe(true);
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

        it("should be able to add multiple tags to a Graph", function () {
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
            expect(g.axes().at(0) === h).toBe(true);
            expect(g.axes().at(1) === h2).toBe(true);
            expect(g.axes().at(2) === v).toBe(true);
            expect(g.plots().at(0) === p).toBe(true);
            expect(g.data().at(0) === data).toBe(true);
            expect(g.window() === w).toBe(true);
            expect(g.ui() === ui).toBe(true);
            expect(g.Debugger() === debug).toBe(true);
            expect(g.legend() === legend).toBe(true);
            expect(g.background() === background).toBe(true);
            expect(g.plotarea() === plotarea).toBe(true);
        });

        it("should be able to add multiple tags with attr's to a Graph", function () {
            h.id("a id").min("10");
            v.max("200").orientation("vertical").id("Another id");
            p.horizontalaxis(h);
            g.axes().add(h);
            g.axes().add(v);
            g.plots().add(p);
            expect(g.axes().at(0) === h).toBe(true);
            expect(g.axes().at(1) === v).toBe(true);
            expect(g.plots().at(0) === p).toBe(true);
        });

        it("should be able to set/get attributes of tags added to a Graph", function () {
            h.id("larry").min("10");
            v.max("200").orientation("vertical").id("curly");
            g.axes().add(h);
            g.axes().add(v);
            expect(g.axes().at(0).id() === "larry").toBe(true);
            expect(g.axes().at(1).max()).toBe("200");
            g.axes().at(0).id("moe");
            expect(g.axes().at(0).id() === "moe").toBe(true);
        });

    });

    it("should be able to create a Graph with an axis and then fetch that axis", function() {
        var g = new Graph();
        var a = new Axis('horizontal');
        a.id('x');
        g.axes().add(a);
        expect(g.axes().get(0) === a).toBe(true);
    });

    it("should be able to create two graphs, each with an axis, and keep the axes distinct", function() {
        var g1 = new Graph();
        var a1 = new Axis('vertical');
        a1.id('a1');
        g1.axes().add(a1);

        var g2 = new Graph();
        var a2 = new Axis('vertical');
        a2.id('a2');
        g2.axes().add(a2);

        expect(g1.axes().get(0).id() === 'a1').toBe(true);
        expect(g2.axes().get(0).id() === 'a2').toBe(true);
    });

    it("should be able to create a Graph with an axis having a given id, and then fetch that axis's id from the graph", function() {
        var g = new Graph();
        var a = new Axis();
        a.id('myaxis');
        g.axes().add(a);
        expect(g.axes().get(0).id() === 'myaxis').toBe(true);
    });

    describe("initializeGeometry", function() {

        it("should not throw an error", function() {
            expect(function() {
                g.initializeGeometry(300, 200);
            }).not.toThrow();
        });

        it("should set the correct window width and height", function() {
            g.initializeGeometry(300, 200);
            expect(g.windowBox().width() === 300).toBe(true);
            expect(g.windowBox().height() === 200).toBe(true);
        });

        it("should compute the correct paddingBox dimensions", function() {
            g.initializeGeometry(300, 200);
            expect(g.paddingBox().width() ===
                   (300 - defaults.window.margin().left() - defaults.window.margin().right() -
                    2*defaults.window.border -
                    defaults.window.padding().left() - defaults.window.padding().right())
                  ).toBe(true);
            expect(g.paddingBox().height() ===
                   (200 - defaults.window.margin().top() - defaults.window.margin().bottom() -
                    2*defaults.window.border -
                    defaults.window.padding().top() - defaults.window.padding().bottom())
                  ).toBe(true);
        });

        it("should compute the correct plotBox dimensions", function() {
            g.initializeGeometry(300, 200);
            expect(g.plotBox().width() ===
                   g.paddingBox().width() -
                   (defaults.plotarea.margin().left() +
                    defaults.plotarea.margin().right())
                  ).toBe(true);
            expect(g.plotBox().height() ===
                   g.paddingBox().height() -
                   (defaults.plotarea.margin().top() +
                    defaults.plotarea.margin().bottom())
                  ).toBe(true);
        });


    });


});
