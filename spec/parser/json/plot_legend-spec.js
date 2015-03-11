/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("PlotLegend JSON parsing", function () {
    "use strict";

    var PlotLegend = require('../../../src/core/plot_legend.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        Text = require('../../../src/core/text.js'),
        legend,
        visible = true,
        label = "curly",
        json;

    require('../../../src/parser/json/plot_legend.js');

    beforeEach(function () {
        json = {
            "visible" : visible,
            "label"   : label
        };
        legend = PlotLegend.parseJSON(json, new DataPlot());
    });

    it("should be able to parse a legend from XML", function () {
        expect(legend).not.toBeUndefined();
        expect(legend instanceof PlotLegend).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'visible' attribute", function () {
        expect(legend.visible()).toEqual(visible);
    });

    it("should be able to parse a legend from XML and read its 'label' attribute", function () {
        expect(legend.label().string()).toEqual((new Text(label)).string());
    });

});
