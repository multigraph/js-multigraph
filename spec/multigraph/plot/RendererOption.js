/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Renderer Option", function () {
    "use strict";

    var Option = window.multigraph.Plot.Renderer.Option,
        option;

    beforeEach(function () {
        option = new Option();
    });

    it("should be able to create a Renderer Option", function () {
        expect(option instanceof Option).toBe(true);
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
            option.min('70');
            expect(option.min() === '70').toBe(true);
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            option.max('5');
            expect(option.max() === '5').toBe(true);
        });

    });

});
