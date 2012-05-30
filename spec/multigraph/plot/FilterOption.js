/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter Option", function () {
    "use strict";

    var Option = window.multigraph.Plot.Filter.Option,
        option;

    beforeEach(function () {
        option = new Option();
    });

    it("should be able to create a Option", function () {
        expect(option instanceof Option).toBe(true);
    });

    describe("name attribute", function () {
        it("should be able to set/get the name attribute", function () {
            option.name('line');
            expect(option.name() === 'line').toBe(true);
        });

    });

    describe("value attribute", function () {
        it("should be able to set/get the value attribute", function () {
            option.value('70');
            expect(option.value() === '70').toBe(true);
        });

    });

});
