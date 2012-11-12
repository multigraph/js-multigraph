/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Binding serialization", function () {
    "use strict";

    var Binding = window.multigraph.core.Binding,
        xmlString,
        binding;

    beforeEach(function () {
        window.multigraph.serializer.mixin.apply(window.multigraph, "serialize");
    });

    it("should properly serialize axis binding models", function () {
        xmlString = '<binding id="y" min="-10" max="50"/>';
        binding = new Binding("y", "-10", "50");
        expect(binding.serialize()).toEqual(xmlString);

        xmlString = '<binding id="x" min="60" max="70"/>';
        binding = new Binding("x", "60", "70");
        expect(binding.serialize()).toEqual(xmlString);
    });

});
