/*global describe, it, beforeEach, expect, xit, jasmine */

describe("PlotLegend parsing", function () {
    "use strict";

    var PlotLegend = window.multigraph.core.PlotLegend,
        Plot = window.multigraph.core.Plot,
        xmlString = '<legend visible="true" label="curly"/>',
        $xml,
        legend;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        legend = PlotLegend.parseXML($xml, new Plot());
    });

    it("should be able to parse a legend from XML", function () {
        expect(legend).not.toBeUndefined();
    });

    it("should be able to parse a legend from XML and read its 'visible' attribute", function () {
        expect(legend.visible()).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'label' attribute", function () {
        expect(legend.label().string()).toBe("curly");
    });

    it("should be able to parse a legend from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<legend visible="false" label="plot"/>';
        expect(legend.serialize()).toBe(xmlString);
        legend = PlotLegend.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2), new Plot());
        expect(legend.serialize()).toBe(xmlString2);
    });

});
