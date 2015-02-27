/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Multigraph", function () {
    "use strict";

    var Graph = require('../../src/core/graph.js'),
        Multigraph = require('../../src/core/multigraph.js'),
        Axis = require('../../src/core/axis.js'),
        mg;

    beforeEach(function () {
        mg = new Multigraph();
    });

    it("should be able to create a Multigraph", function () {
        expect(mg instanceof Multigraph).toBe(true);
    });

    describe("Children", function () {
        var DataPlot = require('../../src/core/data_plot.js'),
            Window = require('../../src/core/window.js'),
            Legend = require('../../src/core/legend.js'),
            Background = require('../../src/core/background.js'),
            Plotarea = require('../../src/core/plotarea.js'),
            Data = require('../../src/core/data.js'),
            g,
            h,
            v,
            w,
            legend,
            background,
            plotarea,
            data,
            p;

        beforeEach(function () {
            g = new Graph(),
            h = new Axis(Axis.HORIZONTAL),
            v = new Axis(Axis.VERTICAL),
            w = new Window(),
            legend = new Legend(),
            background = new Background(),
            plotarea = new Plotarea(),
            data = new Data(),
            p = new DataPlot();
        });

        it("should be able to add a Graph to the Multigraph", function () {
            var h2 = new Axis(Axis.HORIZONTAL);
            g.axes().add(h);
            g.axes().add(h2);
            g.axes().add(v);
            g.plots().add(p);
            g.data().add(data);
            g.window(w);
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
                h2 = new Axis(Axis.HORIZONTAL);

            g.axes().add(h);
            g.axes().add(h2);
            g.axes().add(v);
            g.plots().add(p);
            g.data().add(data);
            g.window(w);
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

            mg.graphs().add(g2);
            mg.graphs().add(g);

            expect(mg.graphs().size()).toBe(2);
            expect(mg.graphs().at(0)).toBe(g2);
            expect(mg.graphs().at(1)).toBe(g);
        });

    });

    // temporarily disabling because DOM isn't available during testing with jasmine-node:
    xdescribe("ajaxthrottles", function () {
        it("should have an array of ajaxthrottles", function () {
            expect(require('../../src/util/validationFunctions.js').typeOf(mg.ajaxthrottles())).toBe('array');
        });
        it("should be able to add an ajaxthrottle", function() {
            mg.addAjaxThrottle("foo", 1,2,3);
            expect(mg.ajaxthrottles().length).toEqual(1);
            expect(typeof(mg.ajaxthrottles()[0].ajaxthrottle.ajax)).toBe('function');
        });
        it("should be able to add a single ajaxthrottle and retrieve it based on a url pattern",
           function() {
               mg.addAjaxThrottle("^http://www.example.com", 1,2,3);
               var t = mg.getAjaxThrottle("http://www.example.com/foo/bar");
               expect(t).not.toBeUndefined();
               expect(typeof(t.ajax)).toBe('function');
               t = mg.getAjaxThrottle("http://www.example.com/bat/bazr");
               expect(t).not.toBeUndefined();
               expect(typeof(t.ajax)).toBe('function');
               t = mg.getAjaxThrottle("http://www.google.com/no/matching/pattern");
               expect(t).toBeUndefined();
        });
        it("should be able to add two throttles with two different patterns and match on both of them",
           function() {
               mg.addAjaxThrottle("^http://www.example.com", 1,2,3);
               mg.addAjaxThrottle("^http://www.google.com", 4,5,6);

               var t1 = mg.getAjaxThrottle("http://www.example.com/foo/bar");
               expect(t1).not.toBeUndefined();

               var t2 = mg.getAjaxThrottle("http://www.google.com/foo/bar");
               expect(t2).not.toBeUndefined();
               expect(t2).not.toEqual(t1);

               var t3 = mg.getAjaxThrottle("http://www.yahoo.com/foo/bar");
               expect(t3).toBeUndefined();
        });
        it("should be able to add a throttle with an empty pattern and have it match everything",
           function() {
               mg.addAjaxThrottle("", 1,2,3);

               var t1 = mg.getAjaxThrottle("http://www.example.com/foo/bar");
               expect(t1).not.toBeUndefined();

               mg.addAjaxThrottle("^http://www.example.com", 1,2,3);
               var t2 = mg.getAjaxThrottle("http://www.example.com/foo/bar");
               expect(t2).not.toBeUndefined();
               expect(t2).toEqual(t1);
        });
    });

});
