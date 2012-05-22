/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Plot = window.multigraph.Plot,
        p;

    beforeEach(function () {
        p = new Plot();
    }); 

    it("should be able to create a Plot", function () {
	expect(p instanceof Plot).toBe(true);
    });

    describe("Axes", function () {
        var h,
            v;

        beforeEach(function () {
            h = new Axis(),
            v = new Axis();            
        });

        it("should be able to add a horizontal axis to a Plot", function () {
            p.horizontalaxis(h);
	    expect(p.horizontalaxis() === h).toBe(true);
        });

        it("should be able to add a vertical axis to a Plot", function () {
            p.verticalaxis(v);
	    expect(p.verticalaxis() === v).toBe(true);
        });

        it("should be able to add axes with attributes to a Plot", function () {
            h.id("xaxis");
            v.min("auto").id("yaxis").orientation("vertical");
            p.horizontalaxis(h);
            p.verticalaxis(v);
	    expect(p.horizontalaxis() === h).toBe(true);
	    expect(p.verticalaxis() === v).toBe(true);
        });

        it("should be able to set/get attributes of axes added to a Plot", function () {
            p.horizontalaxis(h);
            p.verticalaxis(v);
            p.horizontalaxis().id("xaxis").min("auto");
            p.verticalaxis().id("yaxis").max("200");
	    expect(p.horizontalaxis().id() === 'xaxis').toBe(true);
	    expect(p.horizontalaxis().min() === 'auto').toBe(true);
	    expect(p.verticalaxis().id() === 'yaxis').toBe(true);
	    expect(p.verticalaxis().max() === '200').toBe(true);
        });

    });


});
