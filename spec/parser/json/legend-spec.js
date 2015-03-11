/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Legend JSON parsing", function () {
    "use strict";

    var Legend = require('../../../src/core/legend.js'),
        Icon = require('../../../src/core/icon.js'),
        Point = require('../../../src/math/point.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        color = "0x56839c",
        bordercolor = "0x941394",
        base = [-1,-1],
        anchor = [0,0],
        position = [0.5,1],
        visibleBool = true,
        frame = "padding",
        opacity = 1,
        border = 10,
        rows = 4,
        columns = 3,
        cornerradius = 5,
        padding = 4,
        legend,
        json;

    require('../../../src/parser/json/legend.js');
    require('../../../src/parser/json/icon.js');

    beforeEach(function () {
        json = {
            "color"        : color,
            "bordercolor"  : bordercolor,
            "base"         : base,
            "anchor"       : anchor,
            "position"     : position,
            "visible"      : visibleBool,
            "frame"        : frame,
            "opacity"      : opacity,
            "border"       : border,
            "rows"         : rows,
            "columns"      : columns,
            "cornerradius" : cornerradius,
            "padding"      : padding
        };
        legend = Legend.parseJSON(json);
    });

    it("should be able to parse a legend from JSON", function () {
        expect(legend).not.toBeUndefined();
        expect(legend instanceof Legend).toBe(true);
    });

    it("should be able to parse a legend from JSON and read its 'base' attribute", function () {
        expect(legend.base().x()).toEqual(base[0]);
        expect(legend.base().y()).toEqual(base[1]);
    });

    it("should be able to parse a legend from JSON and read its 'anchor' attribute", function () {
        expect(legend.anchor().x()).toEqual(anchor[0]);
        expect(legend.anchor().y()).toEqual(anchor[1]);
    });

    it("should be able to parse a legend from JSON and read its 'position' attribute", function () {
        expect(legend.position().x()).toEqual(position[0]);
        expect(legend.position().y()).toEqual(position[1]);
    });

    it("should be able to parse a legend from JSON and read its 'frame' attribute", function () {
        expect(legend.frame()).toEqual(frame.toLowerCase());
    });

    it("should be able to parse a legend from JSON and read its 'color' attribute", function () {
        expect(legend.color().getHexString("0x")).toEqual((RGBColor.parse(color)).getHexString("0x"));
    });

    it("should be able to parse a legend from JSON and read its 'bordercolor' attribute", function () {
        expect(legend.bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolor)).getHexString("0x"));
    });

    it("should be able to parse a legend from JSON and read its 'opacity' attribute", function () {
        expect(legend.opacity()).toEqual(opacity);
    });

    it("should be able to parse a legend from JSON and read its 'border' attribute", function () {
        expect(legend.border()).toEqual(border);
    });

    it("should be able to parse a legend from JSON and read its 'rows' attribute", function () {
        expect(legend.rows()).toEqual(rows);
    });

    it("should be able to parse a legend from JSON and read its 'columns' attribute", function () {
        expect(legend.columns()).toEqual(columns);
    });

    it("should be able to parse a legend from JSON and read its 'cornerradius' attribute", function () {
        expect(legend.cornerradius()).toEqual(cornerradius);
    });

    it("should be able to parse a legend from JSON and read its 'padding' attribute", function () {
        expect(legend.padding()).toEqual(padding);
    });

    describe("Icon parsing", function () {
        var height = 35,
            width = 50,
            border = 2;

        beforeEach(function () {
            json = {
                "color"        : "0x56839c",
                "bordercolor"  : "0x941394",
                "base"         : [-1,-1],
                "anchor"       : [0,0],
                "position"     : [0.3,0.2],
                "visible"      : "true",
                "frame"        : "padding",
                "opacity"      : 1,
                "border"       : 10,
                "rows"         : 4,
                "columns"      : 3,
                "cornerradius" : 5,
                "padding"      : 2,
                "icon" : {
                    "height" : height,
                    "width"  : width,
                    "border" : border
                }
            };
            legend = Legend.parseJSON(json);
        });

        it("should be able to parse a legend with children from JSON", function () {
            expect(legend).not.toBeUndefined();
            expect(legend instanceof Legend).toBe(true);
            expect(legend.icon()).not.toBeUndefined();
            expect(legend.icon() instanceof Icon).toBe(true);
        });

        it("should properly parse a legend tag with an icon child tag from JSON", function () {
            expect(legend.icon().height()).toEqual(height);
            expect(legend.icon().width()).toEqual(width);
            expect(legend.icon().border()).toEqual(border);
        });

    });

});
