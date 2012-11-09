/*global describe, it, beforeEach, expect, xit, jasmine */

describe("AxisBinding", function () {
    "use strict";

    var AxisBinding = window.multigraph.core.AxisBinding,
        Axis = window.multigraph.core.Axis,
        binding;

    beforeEach(function () {
        binding = new AxisBinding("myBinding");
    });

    it("should be able to create a AxisBinding", function () {
        expect(binding instanceof AxisBinding).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            binding.id("newId");
            expect(binding.id()).toBe("newId");
        });

    });

});
