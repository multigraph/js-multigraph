/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot", function () {
    "use strict";

    var Axis = window.multigraph.Axis;
    var Plot = window.multigraph.Plot;

    it("should be able to create a Plot", function () {
        var p  = new Plot();
	expect(p instanceof Plot).toBe(true);
    });

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


});
