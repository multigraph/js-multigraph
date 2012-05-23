/*global describe, it, beforeEach, expect, xit, jasmine */

/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot parsing", function () {
    "use strict";

    var Plot = window.multigraph.Plot;
    var Axis = window.multigraph.Axis;
    var jQueryXMLHandler = window.multigraph.jQueryXMLHandler;
    var xaxis_xmlString = '<horizontalaxis id="x" min="0" max="10"/>';
    var yaxis_xmlString = '<verticalaxis   id="x" min="0" max="10"/>';
    var plot_xmlString  = '<plot><horizontalaxis ref="x"/><verticalaxis ref="y"/></plot>';
    var $xml;
/*
    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(plot_xmlString);
    });

    it("should be able to parse a plot from XML", function () {
	var a = Plot.parseXML($xml);
        expect(a).not.toBeUndefined();
    });

    it("should be able to parse an axis from XML and read its 'id' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.id() === 'x').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'min' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.min() === '0').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'max' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.max() === '10').toBe(true);
    });

    it("should be able to parse an axis from XML, then serialize it, and get the same XML as the original", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.serialize() === xmlString).toBe(true);
    });
*/

});
