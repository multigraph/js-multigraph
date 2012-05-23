/*global describe, it, beforeEach, expect, xit, jasmine */

describe("JQueryXMLHandler", function () {
    "use strict";

    var jQueryXMLHandler = window.multigraph.jQueryXMLHandler;

    it("should be able to call the mixin function", function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        // how do we write a test to simply check to make sure that the above
        // call completed without throwing an error?
    });

    it("mixin call should result in Axis, Graph, Plot models having a 'parseXML' method", function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        expect(typeof(window.multigraph.Axis.parseXML) === 'function').toBe(true);
        expect(typeof(window.multigraph.Graph.parseXML) === 'function').toBe(true);
        expect(typeof(window.multigraph.Plot.parseXML) === 'function').toBe(true);
    });

    it("mixin call should result in Axis, Graph, Plot instances having a 'serialize' method", function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
        var a = new window.multigraph.Axis();
        expect(typeof(a.serialize) === 'function').toBe(true);
        var g = new window.multigraph.Graph();
        expect(typeof(g.serialize) === 'function').toBe(true);
        var p = new window.multigraph.Plot();
        expect(typeof(g.serialize) === 'function').toBe(true);
    });

});
