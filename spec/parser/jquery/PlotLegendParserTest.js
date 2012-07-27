/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Legend parsing", function () {
    "use strict";

    var Legend = window.multigraph.Plot.Legend,
        xmlString = '<legend visible="true" label="curly"/>',
        $xml,
        legend;

    beforeEach(function () {
        window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        legend = Legend.parseXML($xml);
    });

    it("should be able to parse a legend from XML", function () {
        expect(legend).not.toBeUndefined();
    });

    it("should be able to parse a legend from XML and read its 'visible' attribute", function () {
        expect(legend.visible() === 'true').toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'label' attribute", function () {
        expect(legend.label() === 'curly').toBe(true);
    });

    it("should be able to parse a legend from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<legend visible="false"/>';
        expect(legend.serialize() === xmlString).toBe(true);
	legend = Legend.parseXML($(xmlString2));
        expect(legend.serialize() === xmlString2).toBe(true);
    });

});
