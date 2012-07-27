/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Binding", function () {
    "use strict";

    var Binding = window.multigraph.Axis.Binding,
        binding;

    beforeEach(function () {
        binding = new Binding('y', '70', '5');
    });

    it("should be able to create a Binding", function () {
        expect(binding instanceof Binding).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
            binding.id('y');
            expect(binding.id() === 'y').toBe(true);
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            binding.min('70');
            expect(binding.min() === '70').toBe(true);
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            binding.max('5');
            expect(binding.max() === '5').toBe(true);
        });

    });

});
