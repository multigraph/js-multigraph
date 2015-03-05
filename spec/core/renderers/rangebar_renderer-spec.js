/*global describe, it, beforeEach, expect, xit, jasmine */

describe("RangeBarRenderer", function () {
    "use strict";

    var Renderer = require('../../../src/core/renderer.js'),
        RangeBarRenderer = require('../../../src/core/renderers/rangebar_renderer.js'),
        Axis = require('../../../src/core/axis.js'),
        DataValue = require('../../../src/core/data_value.js'),
        NumberValue = require('../../../src/core/number_value.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        r;

    beforeEach(function () {
        r = (
            (new RangeBarRenderer())
                .plot((new DataPlot())
                      .verticalaxis( (new Axis(Axis.VERTICAL)).type(DataValue.NUMBER) )
                      .horizontalaxis( (new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER) )
                     )
        );
    }); 

    it("should be able to create a RangeBarRenderer", function () {
        expect(r instanceof RangeBarRenderer).toBe(true);
    });

    it("should be able to get the default value of the 'linecolor' option",  function () {
        var linecolor = r.getOptionValue("linecolor");
        expect(linecolor instanceof RGBColor).toBe(true);
        expect(linecolor.getHexString()).toEqual("0x000000");
    });
    it("should be able to set/get the 'linecolor' option",  function () {
        r.setOption("linecolor", RGBColor.parse("0x123456"));
        var linecolor = r.getOptionValue("linecolor");
        expect(linecolor instanceof RGBColor).toBe(true);
        expect(linecolor.getHexString()).toEqual("0x123456");
    });

    it("should be able to get the default value of the 'linewidth' option",  function () {
        var linewidth = r.getOptionValue("linewidth");
        expect(typeof(linewidth)).toEqual("number");
        expect(linewidth).toEqual(1);
    });
    it("should be able to set/get the 'linewidth' option",  function () {
        r.setOption("linewidth", 3.45);
        var linewidth = r.getOptionValue("linewidth");
        expect(typeof(linewidth)).toEqual("number");
        expect(linewidth).toEqual(3.45);
    });

    it("should be able to get the default value of the 'fillcolor' option",  function () {
        var fillcolor = r.getOptionValue("fillcolor");
        expect(fillcolor instanceof RGBColor).toBe(true);
        expect(fillcolor.getHexString()).toEqual("0x808080");
    });
    it("should be able to set/get the 'fillcolor' option",  function () {
        r.setOption("fillcolor", RGBColor.parse("0x123456"));
        var fillcolor = r.getOptionValue("fillcolor");
        expect(fillcolor instanceof RGBColor).toBe(true);
        expect(fillcolor.getHexString()).toEqual("0x123456");
    });
    it("separate instances should have separate 'fillcolor' values",  function () {
        var r2 = (
            (new RangeBarRenderer())
                .plot((new DataPlot())
                      .verticalaxis( (new Axis(Axis.VERTICAL)).type(DataValue.NUMBER) )
                      .horizontalaxis( (new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER) )
                     )
        );
        r.setOption("fillcolor", new RGBColor(1,1,1));
        expect(r2.getOptionValue("fillcolor").r()).not.toEqual(1); // since r2 fillcolor is still default 0x808080
    });

    it("should be able to get the default value of the 'fillopacity' option",  function () {
        var fillopacity = r.getOptionValue("fillopacity");
        expect(typeof(fillopacity)).toEqual("number");
        expect(fillopacity).toEqual(1);
    });
    it("should be able to set/get the 'fillopacity' option",  function () {
        r.setOption("fillopacity", 0.75);
        var fillopacity = r.getOptionValue("fillopacity");
        expect(typeof(fillopacity)).toEqual("number");
        expect(fillopacity).toEqual(0.75);
    });

    it("should throw an error if we try to get the value of an invalid option", function () {
        expect(function () {
            var v = r.getOptionValue("notAnOption");
        }).toThrow();
    });
    it("should throw an error if we try to set the value of an invalid option", function () {
        expect(function () {
            r.setOption("notAnOption", 0);
        }).toThrow();
    });

});
