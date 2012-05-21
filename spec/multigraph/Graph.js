/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph", function () {
    "use strict";

    var Axis = window.multigraph.Axis;
    var Plot = window.multigraph.Plot;
    var Graph = window.multigraph.Graph;

    it("should be able to create a Graph", function () {
        var g  = new Graph();
	expect(g instanceof Graph).toBe(true);
    });

    it("should be able to create a fancy Graph", function () {
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

    /*
    it("should be able to add axes to a Plot", function () {
        var p  = new Plot();
        var h = new Axis();
        h.id('xaxis');
        var v = new Axis();
        v.id('yaxis');
        p.horizontalaxis(h);
        p.verticalaxis(v);
	expect(p.horizontalaxis().id() === 'xaxis').toBe(true);
	expect(p.verticalaxis().id() === 'yaxis').toBe(true);
    });
    */


});
