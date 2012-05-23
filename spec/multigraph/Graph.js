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
            expect(g.axes().at(0) === h).toBe(true);
            expect(g.axes().at(1) === v).toBe(true);
            expect(g.plots().at(0) === p).toBe(true);
        });

        xit("should be able to set/get attributes of tags added to a Graph", function () {
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

    it("should be able to create a Graph with an axis and then fetch that axis", function() {
        var Axis  = window.multigraph.Axis;
        var g = new Graph();
        var a = new Axis();
        a.id('x');
        g.axes().add(a);
        console.log(g.axes());
        expect(g.axes().get(0) === a).toBe(true);
    });

    xit("should be able to create two graphs, each with an axis, and keep the axes distinct", function() {
        var g1 = new Graph();
        var a1 = new Axis();
        a1.id('a1');
        g1.axes().add(a1);

        var g2 = new Graph();
        var a2 = new Axis();
        a2.id('a2');
        g2.axes().add(a2);

        console.log('g1.axes().size() => ' + g1.axes().size());
        console.log('g2.axes().size() => ' + g2.axes().size());

        expect(g1.axes().get(0).id() === 'a1').toBe(true);
        expect(g2.axes().get(0).id() === 'a2').toBe(true);
        //expect(g1.axes().size() === 1).toBe(true);

    });

    xit("should have a certain good behavior", function() {
        var arr = [];
        var a = { 'name' : 'fred' };
        arr.push(a);
        console.log('at 1, a.name => ' + a.name);
        console.log('at 1, arr[0].name => ' + arr[0].name);
        a.name = 'joe';
        console.log('at 2, a.name => ' + a.name);
        console.log('at 2, arr[0].name => ' + arr[0].name);
    });

    xit("should be able to create a Graph with an axis having a given id, and then fetch that axis's id from the graph", function() {
        var g = new Graph();
        var a = new Axis();
        a.id('x');
        console.log('at 1, a.id() => ' + a.id());
        console.log('at 1, g.axes().get(0).id() => ' + g.axes().get(0).id());
        g.axes().add(a);
        console.log('at 2, a.id() => ' + a.id());
        console.log('at 2, g.axes().get(0).id() => ' + g.axes().get(0).id());
        g.axes().get(0).id('y');
        console.log('at 3, a.id() => ' + a.id());
        console.log('at 3, g.axes().get(0).id() => ' + g.axes().get(0).id());
        expect(g.axes().get(0).id() === 'x').toBe(true);
    });

});
