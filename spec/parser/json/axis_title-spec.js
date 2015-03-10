/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Title JSON parsing", function () {
    "use strict";

    var Axis = require('../../../src/core/axis.js'),
        AxisTitle = require('../../../src/core/axis_title.js'),
        Text = require('../../../src/core/text.js'),
        Point = require('../../../src/math/point.js'),
        axis = new Axis(Axis.HORIZONTAL),
        JQueryXMLParser;

    var json,
        title,
        angle = 70,
        anchor = [1, 1],
        base = 0,
        position = [-1, 1],
        content = "A Title";

    require('../../../src/parser/json/axis_title.js');

    beforeEach(function () {
        json = { "angle" : angle, "anchor" : anchor, "base" : base, "position" : position, "text" : content };
        title = AxisTitle.parseJSON(json, axis);
    });

    it("should be able to parse a AxisTitle from JSON", function () {
        expect(title).not.toBeUndefined();
        expect(title instanceof AxisTitle).toBe(true);
    });

    it("should be able to parse a title from JSON and store an 'axis' pointer", function () {
        expect(title.axis() instanceof Axis).toBe(true);
        expect(title.axis()).toEqual(axis);
    });

    it("should be able to parse a title from JSON and read its 'position' attribute", function () {
        expect(title.position().x()).toEqual((Point.parse(position)).x());
        expect(title.position().y()).toEqual((Point.parse(position)).y());
    });

    it("should be able to parse a title from JSON and read its 'base' attribute", function () {
        expect(title.base()).toEqual(parseFloat(base));
    });

    it("should be able to parse a title from JSON and read its 'anchor' attribute", function () {
        expect(title.anchor().x()).toEqual((Point.parse(anchor)).x());
        expect(title.anchor().y()).toEqual((Point.parse(anchor)).y());
    });

    it("should be able to parse a title from JSON and read its 'angle' attribute", function () {
        expect(title.angle()).toEqual(parseFloat(angle));
    });

    it("should be able to parse a title from JSON and read its 'content'", function () {
        expect(title.content() instanceof Text).toBe(true);
        expect(title.content().string()).toEqual((new Text(content)).string());
    });

    it("should return `undefined` when parsing an empty title, ie `{}`", function () {
        json = {};
        title = AxisTitle.parseJSON(json, axis);
        expect(title).toBe(undefined);
    });

    it('should return `undefined` when parsing a title with empty text, ie `{"text":""}`', function () {
        json = {"text":""};
        title = AxisTitle.parseJSON(json, axis);
        expect(title).toBe(undefined);
    });

});
