/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph", function () {
    "use strict";

    var Graph = window.multigraph.Graph,
        g;

    beforeEach(function () {
        g = new Graph();
    });

    it("should be able to create a Graph", function () {
	expect(g instanceof Graph).toBe(true);
    });

    describe("Children", function () {
        var Axis = window.multigraph.Axis,
            Plot = window.multigraph.Plot,
            h,
            v,
            p;

        beforeEach(function () {
            h = new Axis(),
            v = new Axis(),
            p = new Plot();
        });

        it("should be able to add multiple tags to a Graph", function () {
            var h2 = new Axis();
            g.axes().add(h);
            g.axes().add(h2);
            g.axes().add(v);
            g.plots().add(p);
            expect(g.axes().at(0) === h).toBe(true);
            expect(g.axes().at(1) === h2).toBe(true);
            expect(g.axes().at(2) === v).toBe(true);
            expect(g.plots().at(0) === p).toBe(true);
        });

        it("should be able to add multiple tags with attr's to a Graph", function () {
            h.id("a id").min("10");
            v.max("200").orientation("vertical").id("Another id");
            p.horizontalaxis(h);
            g.axes().add(h);
            g.axes().add(v);
            g.plots().add(p);
// This code should work, but it does not
            expect(g.axes().at(0) === h).toBe(true);
            expect(g.axes().at(1) === v).toBe(true);
            expect(g.plots().at(0) === p).toBe(true);
// This code should not work, but it does
//            expect(g.axes().at(3) === h).toBe(true);
//            expect(g.axes().at(4) === v).toBe(true);
//            expect(g.plots().at(1) === p).toBe(true);
        });

        it("should be able to set/get attributes of tags added to a Graph", function () {
// Will need to modify indices after bugfix
            h.id("larry").min("10");
            v.max("200").orientation("vertical").id("curly");
            g.axes().add(h);
            g.axes().add(v);
            expect(g.axes().at(5).id() === "larry").toBe(true);
            expect(g.axes().at(6).max() === "200").toBe(true);
            g.axes().at(5).id("moe");
            expect(g.axes().at(5).id() === "moe").toBe(true);
        });

    });

    xit("should be able to create a fancy Graph", function () {
	var h = new Axis().id('xaxis');
	var h2 = new Axis().id('x2axis');
	var v = new Axis().id('yaxis');
	var p = new Plot();
        p.horizontalaxis(h);
        p.verticalaxis(v);
        var g = new Graph();
        g.axes().add(h);
        g.axes().add(h2);
        g.axes().add(v);
        g.plots().add(p);
	expect(h.id() === 'xaxis').toBe(true);
    });

});
