/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Legend serialization", function () {
    "use strict";

    var PlotLegend = window.multigraph.core.PlotLegend,
        Text = window.multigraph.core.Text,
        xmlString,
        legend;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize plot legend models", function () {
        xmlString = '<legend visible="true" label="curly"/>';
        legend = new PlotLegend();
        legend.visible(true);
        legend.label(new Text("curly"));
        expect(legend.serialize()).toBe(xmlString);

        xmlString = '<legend visible="false" label="plot"/>';
        legend = new PlotLegend();
        legend.visible(false);
        legend.label(new Text("plot"));
        expect(legend.serialize()).toBe(xmlString);
    });

});
