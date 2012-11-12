/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("PlotLegend parsing", function () {
    "use strict";

    var PlotLegend = window.multigraph.core.PlotLegend,
        DataPlot = window.multigraph.core.DataPlot,
        Text = window.multigraph.core.Text,
        xmlString,
        $xml,
        legend,
        visibleBool = true,
        labelString = "curly";

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        xmlString = ''
            + '<legend'
            +     ' visible="' + visibleBool + '"'
            +     ' label="' + labelString + '"'
            +     '/>';
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        legend = PlotLegend.parseXML($xml, new DataPlot());
    });

    it("should be able to parse a legend from XML", function () {
        expect(legend).not.toBeUndefined();
        expect(legend instanceof PlotLegend).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'visible' attribute", function () {
        expect(legend.visible()).toEqual(visibleBool);
    });

    it("should be able to parse a legend from XML and read its 'label' attribute", function () {
        expect(legend.label().string()).toEqual((new Text(labelString)).string());
    });

});
