/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Graph Title JSON parsing", function () {
    "use strict";

    var Title = require('../../../src/core/title.js'),
        Graph = require('../../../src/core/graph.js'),
        Text = require('../../../src/core/text.js'),
        Point = require('../../../src/math/point.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        title,
        graph = new Graph(),
        frame = "padding",
        color = "0xfffaab",
        bordercolor = "0x127752",
        border = 2,
        opacity = 0,
        padding = 4,
        cornerradius = 10,
        anchor = [1,1],
        base = [0,0],
        position = [-1,1],
        text = "Graph Title",
        json;

    require('../../../src/parser/json/title.js');


    beforeEach(function () {
        json = {
            "color"        : color,
            "bordercolor"  : bordercolor,
            "border"       : border,
            "opacity"      : opacity,
            "padding"      : padding,
            "cornerradius" : cornerradius,
            "anchor"       : anchor,
            "base"         : base,
            "position"     : position,
            "frame"        : frame,
            "text"         : text
        };
        title = Title.parseJSON(json, graph);
    });

    it("should be able to parse a Title from JSON", function () {
        expect(title).not.toBeUndefined();
        expect(title instanceof Title).toBe(true);
    });

    it("should parse a title from JSON and properly store its 'graph' pointer", function () {
        expect(title.graph()).toBe(graph);
    });

    it("should be able to parse a title from JSON and read its 'frame' attribute", function () {
        expect(title.frame()).toEqual(frame.toLowerCase());
    });

    it("should be able to parse a title from JSON and read its 'border' attribute", function () {
        expect(title.border()).toEqual(border);
    });

    it("should be able to parse a title from JSON and read its 'color' attribute", function () {
        expect(title.color().getHexString("0x")).toEqual((RGBColor.parse(color)).getHexString("0x"));
    });

    it("should be able to parse a title from JSON and read its 'bordercolor' attribute", function () {
        expect(title.bordercolor().getHexString()).toEqual((RGBColor.parse(bordercolor)).getHexString("0x"));
    });

    it("should be able to parse a title from JSON and read its 'opacity' attribute", function () {
        expect(title.opacity()).toEqual(opacity);
    });

    it("should be able to parse a title from JSON and read its 'padding' attribute", function () {
        expect(title.padding()).toEqual(padding);
    });

    it("should be able to parse a title from JSON and read its 'cornerradius' attribute", function () {
        expect(title.cornerradius()).toEqual(cornerradius);
    });

    it("should be able to parse a title from JSON and read its 'anchor' attribute", function () {
        expect(title.anchor().x()).toEqual(anchor[0]);
        expect(title.anchor().y()).toEqual(anchor[1]);
    });

    it("should be able to parse a title from JSON and read its 'base' attribute", function () {
        expect(title.base().x()).toEqual(base[0]);
        expect(title.base().y()).toEqual(base[1]);
    });

    it("should be able to parse a title from JSON and read its 'position' attribute", function () {
        expect(title.position().x()).toEqual(position[0]);
        expect(title.position().y()).toEqual(position[1]);
    });

    it("should be able to parse a title from JSON and read its 'content'", function () {
        expect(title.text().string()).toEqual(new Text(text).string());
    });

});
