/*global describe, it, beforeEach, expect, xit, jasmine */

describe("core.RendererOption", function () {
    "use strict";

    var RendererOption = window.multigraph.core.RendererOption,
        option;

    beforeEach(function () {
        option = new RendererOption('barwidth', '2');
    });

    it("should be able to create a Renderer.RendererOption", function () {
        expect(option instanceof RendererOption).toBe(true);
    });

    describe("name attribute", function () {
        it("should be able to set/get the name attribute", function () {
            option.name('linewidth');
            expect(option.name() === 'linewidth').toBe(true);
        });

    });

    describe("value attribute", function () {
        it("should be able to set/get the value attribute", function () {
            option.value('45');
            expect(option.value() === '45').toBe(true);
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            option.min("70");
            expect(option.min()).toBe("70");
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            option.max("5");
            expect(option.max()).toBe("5");
        });

    });

});
