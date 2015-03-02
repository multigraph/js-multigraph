/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Multigraph Normalizer", function () {
    "use strict";

    var Graph = require('../../src/core/graph.js'),
        Multigraph = require('../../src/core/multigraph.js'),
        Data = require('../../src/core/data.js'),
        Axis = require('../../src/core/axis.js'),
        DataVariable = require('../../src/core/data_variable.js'),    
        mg,
        graph,
        data,
        variable1,
        variable2,
        variable3;

    beforeEach(function () {
        //var NormalizerMixin = require('../../src/normalizer/normalizer_mixin.js');
        //NormalizerMixin.apply();
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
