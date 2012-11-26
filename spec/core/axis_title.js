/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Title", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
        AxisTitle = window.multigraph.core.AxisTitle,
        Text = window.multigraph.core.Text,
        Point = window.multigraph.math.Point,
        title;

    beforeEach(function () {
        title = new AxisTitle();
    });

    it("should be able to create a AxisTitle", function () {
        expect(title instanceof AxisTitle).toBe(true);
    });

    describe("axis pointer", function () {
        it("should be able to set/get the axis pointer", function () {
            var axis = new Axis(Axis.HORIZONTAL);
            title.axis(axis);
            expect(title.axis()).toBe(axis);
        });
    });

    describe("attibutes", function () {
        it("should be able to set/get the content attribute", function () {
            title.content(new Text("Test Axis Title"));
            expect(title.content().string()).toEqual("Test Axis Title");
        });

        it("should be able to set/get the anchor attribute", function () {
            title.anchor(new Point(-1, 1));
            expect(title.anchor().x()).toBe(-1);
            expect(title.anchor().y()).toBe(1);
        });

        it("should be able to set/get the base attribute", function () {
            title.base(-1);
            expect(title.base()).toBe(-1);
        });

        it("should be able to set/get the position attribute", function () {
            title.position(new Point(0, 1));
            expect(title.position().x()).toBe(0);
            expect(title.position().y()).toBe(1);
        });

        it("should be able to set/get the angle attribute", function () {
            title.angle(5);
            expect(title.angle()).toBe(5);
        });

    });

    describe("methods", function () {

        describe("initializeGeometry", function () {
            var Graph = window.multigraph.core.Graph,
                Box = window.multigraph.math.Box,
                titleDefaults = window.multigraph.utilityFunctions.getDefaultValuesFromXSD().horizontalaxis.title,
                graph,
                axis;

            beforeEach(function () {
                graph = new Graph();
                graph.plotBox(new Box(100, 100));
            });

            it("should correctly set the position attribute with a horizontal axis that has a perpOffset greater than half of the plotBox's height", function () {
                axis = new Axis(Axis.HORIZONTAL);
                axis.perpOffset(70);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.position().x()).toEqual(titleDefaults["position-horizontal-top"]().x());
                expect(title.position().y()).toEqual(titleDefaults["position-horizontal-top"]().y());
            });

            it("should correctly set the position attribute with a horizontal axis that has a perpOffset less than half of the plotBox's height", function () {
                axis = new Axis(Axis.HORIZONTAL);
                axis.perpOffset(20);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.position().x()).toEqual(titleDefaults["position-horizontal-bottom"]().x());
                expect(title.position().y()).toEqual(titleDefaults["position-horizontal-bottom"]().y());
            });

            it("should correctly set the position attribute with a vertical axis that has a perpOffset greater than half of the plotBox's width", function () {
                axis = new Axis(Axis.VERTICAL);
                axis.perpOffset(70);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.position().x()).toEqual(titleDefaults["position-vertical-right"]().x());
                expect(title.position().y()).toEqual(titleDefaults["position-vertical-right"]().y());
            });

            it("should correctly set the position attribute with a vertical axis that has a perpOffset less than half of the plotBox's width", function () {
                axis = new Axis(Axis.VERTICAL);
                axis.perpOffset(20);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.position().x()).toEqual(titleDefaults["position-vertical-left"]().x());
                expect(title.position().y()).toEqual(titleDefaults["position-vertical-left"]().y());
            });

            it("should not set the position attribute if it is already defined", function () {
                var position = new Point(0, 1);
                axis = new Axis(Axis.VERTICAL);
                axis.perpOffset(20);
                title = new AxisTitle(axis);
                title.position(position);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.position()).toEqual(position);
            });

            it("should correctly set the anchor attribute with a horizontal axis that has a perpOffset greater than half of the plotBox's height", function () {
                axis = new Axis(Axis.HORIZONTAL);
                axis.perpOffset(70);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.anchor().x()).toEqual(titleDefaults["anchor-horizontal-top"]().x());
                expect(title.anchor().y()).toEqual(titleDefaults["anchor-horizontal-top"]().y());
            });

            it("should correctly set the anchor attribute with a horizontal axis that has a perpOffset less than half of the plotBox's height", function () {
                axis = new Axis(Axis.HORIZONTAL);
                axis.perpOffset(20);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.anchor().x()).toEqual(titleDefaults["anchor-horizontal-bottom"]().x());
                expect(title.anchor().y()).toEqual(titleDefaults["anchor-horizontal-bottom"]().y());
            });

            it("should correctly set the anchor attribute with a vertical axis that has a perpOffset greater than half of the plotBox's width", function () {
                axis = new Axis(Axis.VERTICAL);
                axis.perpOffset(70);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.anchor().x()).toEqual(titleDefaults["anchor-vertical-right"]().x());
                expect(title.anchor().y()).toEqual(titleDefaults["anchor-vertical-right"]().y());
            });

            it("should correctly set the anchor attribute with a vertical axis that has a perpOffset less than half of the plotBox's width", function () {
                axis = new Axis(Axis.VERTICAL);
                axis.perpOffset(20);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.anchor().x()).toEqual(titleDefaults["anchor-vertical-left"]().x());
                expect(title.anchor().y()).toEqual(titleDefaults["anchor-vertical-left"]().y());
            });

            it("should not set the anchor attribute if it is already defined", function () {
                var anchor = new Point(0, 1);
                axis = new Axis(Axis.VERTICAL);
                axis.perpOffset(20);
                title = new AxisTitle(axis);
                title.anchor(anchor);
                title.content(new Text("foobar"));
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.anchor()).toEqual(anchor);
            });

            it("should call initializeGeometry for the 'content' attribute", function () {
                axis = new Axis(Axis.VERTICAL);
                axis.perpOffset(20);
                title = new AxisTitle(axis);
                title.content(new Text("foobar"));
                expect(title.content().origWidth()).toBeUndefined();
                expect(title.content().origHeight()).toBeUndefined();
                expect(title.content().rotatedWidth()).toBeUndefined();
                expect(title.content().rotatedHeight()).toBeUndefined();
                title.initializeGeometry(graph, { "angle" : title.angle() });
                expect(title.content().origWidth()).not.toBeUndefined();
                expect(title.content().origHeight()).not.toBeUndefined();
                expect(title.content().rotatedWidth()).not.toBeUndefined();
                expect(title.content().rotatedHeight()).not.toBeUndefined();                
            });

        });

    });

});
