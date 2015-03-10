/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Pan JSON parsing", function () {
    "use strict";

    var Pan = require('../../../src/core/pan.js'),
        DataValue = require('../../../src/core/data_value.js'),
        allowed = true,
        min = 0,
        max = 5,
        type = "number",
        json = { "allowed" : allowed, "min" : min, "max" : max },
        pan;

    require('../../../src/parser/json/pan.js');

    beforeEach(function () {
        pan = Pan.parseJSON(json, type);
    });

    it("should be able to parse a Pan from JSON", function () {
        expect(pan).not.toBeUndefined();
        expect(pan instanceof Pan).toBe(true);
    });

    it("should be able to parse a pan from JSON and read its 'allowed' attribute", function () {
        expect(pan.allowed()).toEqual(allowed);
    });

    it("should be able to parse a pan from JSON and read its 'min' attribute", function () {
        expect(pan.min().getRealValue()).toEqual((DataValue.parse(type, min)).getRealValue());
    });

    it("should be able to parse a pan from JSON and read its 'max' attribute", function () {
        expect(pan.max().getRealValue()).toEqual((DataValue.parse(type, max)).getRealValue());
    });

});
