/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Zoom XML parsing", function () {
    "use strict";

    var Zoom = require('../../../src/core/zoom.js'),
        DataMeasure = require('../../../src/core/data_measure.js'),
        DataValue = require('../../../src/core/data_value.js'),
        zoom,
        allowed = true,
        min = 0,
        max = 80,
        anchor = 1,
        type = "number",
        json = { "allowed" : allowed, "min" : min, "max" : max, "anchor" : anchor },
        zoom;

    require('../../../src/parser/json/zoom.js');

    beforeEach(function () {
        zoom = Zoom.parseJSON(json, type);
    });

    it("should be able to parse a Zoom from JSON", function () {
        expect(zoom).not.toBeUndefined();
        expect(zoom instanceof Zoom).toBe(true);
    });

    it("should be able to parse a zoom from JSON and read its 'allowed' attribute", function () {
        expect(zoom.allowed()).toEqual(allowed);
    });

    it("should be able to parse a zoom from JSON and read its 'min' attribute", function () {
        expect(zoom.min().getRealValue()).toEqual((DataMeasure.parse(type, min)).getRealValue());
    });

    it("should be able to parse a zoom from JSON and read its 'max' attribute", function () {
        expect(zoom.max().getRealValue()).toEqual((DataMeasure.parse(type, max)).getRealValue());
    });

    it("should be able to parse a zoom from JSON and read its 'anchor' attribute", function () {
        expect(zoom.anchor().getRealValue()).toEqual((DataValue.parse(type, anchor)).getRealValue());
    });

});
