/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Filter JSON parsing", function () {
    "use strict";

    var Filter = require('../../../src/core/filter.js'),
        FilterOption = require('../../../src/core/filter_option.js'),
        filter,
        type = "number",
        json;

    require('../../../src/parser/json/filter.js');

    beforeEach(function () {
        json = { "type" : type };
        filter = Filter.parseJSON(json);
    });

    it("should be able to parse a filter from JSON", function () {
        expect(filter).not.toBeUndefined();
        expect(filter instanceof Filter).toBe(true);
    });

    it("should be able to parse a filter from JSON and read its 'type' attribute", function () {
        expect(filter.type()).toEqual(type);
    });

    describe("Option parsing", function () {

        describe("with one option child tag", function () {
            var option1Name = "x1",
                option1Value = 9000;

            beforeEach(function () {
                json = {
                    "type" : "number",
                    "options" : {}
                };
                json.options[option1Name] = option1Value;
                filter = Filter.parseJSON(json);
            });

            it("should be able to parse a filter with a option child tag from JSON", function () {
                expect(filter).not.toBeUndefined();
                expect(filter instanceof Filter).toBe(true);
            });

            it("should properly parse the option children of a filter with a option child tag from JSON", function () {
                expect(filter.options().size()).toEqual(1);
                expect(filter.options().at(0) instanceof FilterOption).toBe(true);
                expect(filter.options().at(0).name()).toEqual(option1Name);
                expect(filter.options().at(0).value()).toEqual(String(option1Value));
            });

        });

        describe("with multiple option child tags", function () {
            var option1Name = "x1",
                option1Value = 9000,
                option2Name = "x2",
                option2Value = 8000,
                option3Name = "x3",
                option3Value = 7000;

            beforeEach(function () {
                json = {
                    "type" : "number",
                    "options" : {}
                };
                json.options[option1Name] =  option1Value;
                json.options[option2Name] =  option2Value;
                json.options[option3Name] =  option3Value;

                filter = Filter.parseJSON(json);
            });

            it("should be able to parse a filter with multiple option child tags from JSON", function () {
                expect(filter).not.toBeUndefined();
                expect(filter instanceof Filter).toBe(true);
            });

            it("should properly parse the option children of a filter with multiple option child tags from JSON", function () {
                expect(filter.options().size()).toEqual(3);
                expect(filter.options().at(0) instanceof FilterOption).toBe(true);
                expect(filter.options().at(1) instanceof FilterOption).toBe(true);
                expect(filter.options().at(2) instanceof FilterOption).toBe(true);
                expect(filter.options().at(0).name()).toEqual(option1Name);
                expect(filter.options().at(0).value()).toEqual(String(option1Value));
                expect(filter.options().at(1).name()).toEqual(option2Name);
                expect(filter.options().at(1).value()).toEqual(String(option2Value));
                expect(filter.options().at(2).name()).toEqual(option3Name);
                expect(filter.options().at(2).value()).toEqual(String(option3Value));
            });

        });

    });

});
