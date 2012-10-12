/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Multigraph Normalizer", function () {
    "use strict";

    var Graph = window.multigraph.core.Graph,
        Multigraph = window.multigraph.core.Multigraph,
        Data = window.multigraph.core.Data,
        Axis = window.multigraph.core.Axis,
        DataVariable = window.multigraph.core.DataVariable,    
        mg,
        graph,
        data,
        variable1,
        variable2,
        variable3;

    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
        mg = new Multigraph();
        graph = new Graph();
        variable1 = new DataVariable("x");
        variable2 = new DataVariable("y");
        variable3 = new DataVariable("y1");
        data = new Data([variable1, variable2, variable3]);
    });

    it("should be able to normalize a Multigraph", function () {
        expect(function () {
            mg.normalize();
        }).not.toThrow();

        graph.data().add(data);
        mg.graphs().add(graph);

        mg.normalize();
        expect(function () {
            mg.normalize();
        }).not.toThrow();

    });

});
