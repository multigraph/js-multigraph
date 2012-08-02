/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Binding", function () {
    "use strict";

    var Binding = window.multigraph.core.Binding,
        binding;

    beforeEach(function () {
        binding = new Binding("y", "70", "5");
    });

    it("should be able to create a Binding", function () {
        expect(binding instanceof Binding).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            binding.id("y");
            expect(binding.id()).toBe("y");
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            binding.min("70");
            expect(binding.min()).toBe("70");
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            binding.max("5");
            expect(binding.max()).toBe("5");
        });

    });

});
