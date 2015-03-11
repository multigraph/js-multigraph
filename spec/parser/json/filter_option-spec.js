/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Filter Option JSON parsing", function () {
    "use strict";

    var FilterOption = require('../../../src/core/filter_option.js'),
        option,
        name = "dotsize",
        value = 12,
        json;

    require('../../../src/parser/json/filter_option.js');

    beforeEach(function () {
        json = { "name" : name, "value" : value };
        option = FilterOption.parseJSON(json);
    });

    it("should be able to parse an option from JSON", function () {
        expect(option).not.toBeUndefined();
        expect(option instanceof FilterOption).toBe(true);
    });

    it("should be able to parse a option from JSON and read its 'name' attribute", function () {
        expect(option.name()).toEqual(name);
    });

    it("should be able to parse a option from JSON and read its 'value' attribute", function () {
        expect(option.value()).toEqual(String(value));
    });

});
