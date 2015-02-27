/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph Title", function () {
    "use strict";

    var Title = require('../../src/core/title.js'),
        Graph = require('../../src/core/graph.js'),
        Text = require('../../src/core/text.js'),
        Point = require('../../src/math/point.js'),
        title;

    beforeEach(function () {
        title = new Title(new Text("foobar"), new Graph());
    });

    it("should be able to create a Title", function () {
        expect(title instanceof Title).toBe(true);
    });

    describe("attributes", function () {

        it("should be able to set/get the graph pointer", function () {
            var graph = new Graph();
            title = new Title(new Text("foobar"), graph);
            expect(title.graph()).toBe(graph);
        });

        it("should be able to set/get the text attribute", function () {
            var text = new Text("Graph Title");
            title = new Title(text, new Graph());
            expect(title.text()).toBe(text);
        });

        it("should be able to set/get the frame attribute", function () {
            var frame = "plot";
            title.frame(frame);
            expect(title.frame()).toEqual(frame);
        });

        it("should be able to set/get the border attribute", function () {
            var border = 2;
            title.border(border);
            expect(title.border()).toEqual(border);
        });

        it("should be able to set/get the color attribute", function () {
            var color = require('../../src/math/rgb_color.js').parse("0x12ffa8");
            title.color(color);
            expect(title.color()).toBe(color);
        });

        it("should be able to set/get the bordercolor attribute", function () {
            var bordercolor = require('../../src/math/rgb_color.js').parse("0xadd728");
            title.bordercolor(bordercolor);
            expect(title.bordercolor()).toBe(bordercolor);
        });

        it("should be able to set/get the opacity attribute", function () {
            var opacity = 1;
            title.opacity(opacity);
            expect(title.opacity()).toEqual(opacity);
        });

        it("should be able to set/get the padding attribute", function () {
            var padding = 4;
            title.padding(padding);
            expect(title.padding()).toEqual(padding);
        });

        it("should be able to set/get the cornerradius attribute", function () {
            var cornerradius = 5;
            title.cornerradius(cornerradius);
            expect(title.cornerradius()).toEqual(cornerradius);
        });

        it("should be able to set/get the base attribute", function () {
            var base = new Point(1, 1);
            title.base(base);
            expect(title.base()).toBe(base);
        });

        it("should be able to set/get the position attribute", function () {
            var position = new Point(0, 1);
            title.position(position);
            expect(title.position()).toBe(position);
        });

        it("should be able to set/get the anchor attribute", function () {
            var anchor = new Point(-1, 1);
            title.anchor(anchor);
            expect(title.anchor()).toBe(anchor);
        });

    });

});
