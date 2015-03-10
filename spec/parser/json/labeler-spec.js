/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Label JSON parsing", function () {
    "use strict";

    var Labeler = require('../../../src/core/labeler.js'),
        Axis = require('../../../src/core/axis.js'),
        DataFormatter = require('../../../src/core/data_formatter.js'),
        DataMeasure = require('../../../src/core/data_measure.js'),
        DataValue = require('../../../src/core/data_value.js'),
        Point = require('../../../src/math/point.js'),
        labeler,
        start = 7,
        angle = 45,
        format = "%2d",
        anchor = [1,1],
        position = [-1,1],
        spacing = 200,
        densityfactor = 0.9,
        axisType = DataValue.NUMBER,
        json = { "start": start, "angle": angle, "format": format, "anchor": anchor,
                 "position": position, "spacing": spacing, "densityfactor": densityfactor };

    require('../../../src/parser/json/labeler.js');

    beforeEach(function () {
        labeler = Labeler.parseJSON(json, (new Axis(Axis.HORIZONTAL)).type(axisType));
    });

    it("should be able to parse a Labeler from JSON", function () {
        expect(labeler).not.toBeUndefined();
        expect(labeler instanceof Labeler).toBe(true);
    });

    it("should be able to parse a labeler from JSON and read its 'formatter' attribute", function () {
        expect(labeler.formatter().getFormatString()).toEqual((DataFormatter.create(axisType, format)).getFormatString());
    });

    it("should be able to parse a labeler from JSON and read its 'start' attribute", function () {
        expect(labeler.start().getRealValue()).toEqual((DataValue.parse(axisType, start)).getRealValue());
    });

    it("should be able to parse a labeler from JSON and read its 'angle' attribute", function () {
        expect(labeler.angle()).toEqual(parseFloat(angle));
    });

    it("should be able to parse a labeler from JSON and read its 'position' attribute", function () {
        expect(labeler.position().x()).toEqual(position[0]);
        expect(labeler.position().y()).toEqual(position[1]);
    });

    it("should be able to parse a labeler from JSON and read its 'anchor' attribute", function () {
        expect(labeler.anchor().x()).toEqual(anchor[0]);
        expect(labeler.anchor().y()).toEqual(anchor[1]);
    });

    it("should be able to parse a labeler from JSON and read its 'spacing' attribute", function () {
        expect(labeler.spacing().getRealValue()).toEqual((DataMeasure.parse(axisType, spacing)).getRealValue());
    });

    it("should be able to parse a labeler from JSON and read its 'densityfactor' attribute", function () {
        expect(labeler.densityfactor()).toEqual(parseFloat(densityfactor));
    });

});
