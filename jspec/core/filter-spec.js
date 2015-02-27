/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter", function () {
    "use strict";

    var Filter = require('../../src/core/filter.js'),
        filter;

    beforeEach(function () {
        filter = new Filter();
    }); 

    it("should be able to create a Filter", function () {
        expect(filter instanceof Filter).toBe(true);
    });

    it("should be able to set/get the type attribute", function () {
        filter.type("strict");
        expect(filter.type()).toBe("strict");
    });

    describe("Filter Option", function () {
        var FilterOption = require('../../src/core/filter_option.js'),
            option;

        beforeEach(function () {
            option = new FilterOption();
        });

        it("should be able to add a FilterOption to a Filter", function () {
            filter.options().add(option);
            expect(filter.options().at(0)).toBe(option);
        });

        it("should be able to add multiple FilterOptions to a Filter", function () {
            var option2 = new FilterOption();
            filter.options().add(option);
            filter.options().add(option2);
            expect(filter.options().at(0)).toBe(option);
            expect(filter.options().at(1)).toBe(option2);
        });

        it("should be able to add an FilterOption with attributes to a Filter", function () {
            option.name("bob");
            option.value("fred");
            filter.options().add(option);
            expect(filter.options().at(0)).toBe(option);
        });

        it("should be able to add multiple FilterOptions with attributes to a Filter", function () {
            var option2 = new FilterOption(),
                option3 = new FilterOption();
            option.name("bob");
            option.value("fred");
            option2.name("larry");
            option2.value("curly");
            option3.name("moe");
            option3.value("fred");
            filter.options().add(option);
            filter.options().add(option3);
            filter.options().add(option2);
            expect(filter.options().at(0)).toBe(option);
            expect(filter.options().at(2)).toBe(option2);
            expect(filter.options().at(1)).toBe(option3);
        });

        it("should be able to set/get attributes of an FilterOption added to a Filter", function () {
            filter.options().add(option);
            filter.options().at(0).name("jim");
            filter.options().at(0).value("bo");
            expect(filter.options().at(0).name()).toBe("jim");
            expect(filter.options().at(0).value()).toBe("bo");
        });

    });


});
