/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Filter", function () {
    "use strict";

    var Filter = window.multigraph.Plot.Filter,
        filter;

    beforeEach(function () {
        filter = new Filter();
    }); 

    it("should be able to create a Filter", function () {
        expect(filter instanceof Filter).toBe(true);
    });

    it("should be able to set/get the type attribute", function () {
        filter.type("strict");
        expect(filter.type() === "strict").toBe(true);
    });

    describe("Filter Option", function () {
        var Option = window.multigraph.Plot.Filter.Option,
            option;

        beforeEach(function () {
            option = new Option();
        });

        it("should be able to add a Option to a Filter", function () {
            filter.options().add(option);
            expect(filter.options().at(0) === option).toBe(true);
        });

        it("should be able to add multiple Options to a Filter", function () {
            var option2 = new Option();
            filter.options().add(option);
            filter.options().add(option2);
            expect(filter.options().at(0) === option).toBe(true);
            expect(filter.options().at(1) === option2).toBe(true);
        });

        it("should be able to add an Option with attributes to a Filter", function () {
            option.name("bob");
            option.value("fred");
            filter.options().add(option);
            expect(filter.options().at(0) === option).toBe(true);
        });

        it("should be able to add multiple Options with attributes to a Filter", function () {
            var option2 = new Option(),
                option3 = new Option();
            option.name("bob");
            option.value("fred");
            option2.name("larry");
            option2.value("curly");
            option3.name("moe");
            option3.value("fred");
            filter.options().add(option);
            filter.options().add(option3);
            filter.options().add(option2);
            expect(filter.options().at(0) === option).toBe(true);
            expect(filter.options().at(2) === option2).toBe(true);
            expect(filter.options().at(1) === option3).toBe(true);
        });

        it("should be able to set/get attributes of an Option added to a Filter", function () {
            filter.options().add(option);
            filter.options().at(0).name("jim");
            filter.options().at(0).value("bo");
            expect(filter.options().at(0).name() === "jim").toBe(true);
            expect(filter.options().at(0).value() === "bo").toBe(true);
        });

    });


});
