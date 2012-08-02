/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter Option", function () {
    "use strict";

    var FilterOption = window.multigraph.core.FilterOption,
        option;

    beforeEach(function () {
        option = new FilterOption();
    });

    it("should be able to create a FilterOption", function () {
        expect(option instanceof FilterOption).toBe(true);
    });

    describe("name attribute", function () {
        it("should be able to set/get the name attribute", function () {
            option.name("line");
            expect(option.name()).toBe("line");
        });

    });

    describe("value attribute", function () {
        it("should be able to set/get the value attribute", function () {
            option.value("70");
            expect(option.value()).toBe("70");
        });

    });

});
