/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Axis Grid JSON parsing", function () {
    "use strict";

    var Grid = require('../../../src/core/grid.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        grid,
        color = "0x984545",
        visible = false,
        json = { "color" : color, "visible" : visible };

    require('../../../src/parser/json/grid.js');

    beforeEach(function () {
        grid = Grid.parseJSON(json);
    });

    it("should be able to parse a grid from JSON", function () {
        expect(grid).not.toBeUndefined();
        expect(grid instanceof Grid).toBe(true);
    });

    it("should be able to parse a grid from JSON and read its 'color' property", function () {
        expect(grid.color().getHexString("0x")).toEqual((RGBColor.parse(color)).getHexString("0x"));
    });

    it("should be able to parse a grid from JSON and read its 'visible' property", function () {
        expect(grid.visible()).toEqual(visible);
    });

});
