/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Multigraph Normalizer", function () {
    "use strict";

    var Graph = window.multigraph.core.Graph,
        Multigraph = window.multigraph.core.Multigraph,
        Axis = window.multigraph.core.Axis,
        mg;

    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
        mg = new Multigraph();
    });

    xit("should be able to normalize a Multigraph", function () {
    });

});
