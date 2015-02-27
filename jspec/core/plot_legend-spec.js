/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Legend", function () {
    "use strict";

    var PlotLegend = require('../../src/core/plot_legend.js'),
        Text = require('../../src/core/text.js'),
        legend;

    beforeEach(function () {
        legend = new PlotLegend();
    });

    it("should be able to create a PlotLegend", function () {
        expect(legend instanceof PlotLegend).toBe(true);
    });

    describe("visible attribute", function () {
        it("should be able to set/get the visible attribute", function () {
            legend.visible(true);
            expect(legend.visible()).toBe(true);
        });

    });

    describe("label attribute", function () {
        it("should be able to set/get the label attribute", function () {
            legend.label(new Text("fred"));
            expect(legend.label().string()).toBe("fred");
        });

    });

});
