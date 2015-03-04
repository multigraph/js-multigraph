/*global describe, it, beforeEach, expect, xit, jasmine */

describe("BarRenderer", function () {
    "use strict";

    var Renderer = require('../../../src/core/renderer.js'),
        BarRenderer = require('../../../src/core/renderers/bar_renderer.js'),
        Axis = require('../../../src/core/axis.js'),
        DataValue = require('../../../src/core/data_value.js'),
        DataMeasure = require('../../../src/core/data_measure.js'),
        NumberValue = require('../../../src/core/number_value.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        r;

    beforeEach(function () {
        r = (
            (new BarRenderer())
                .plot((new DataPlot())
                      .verticalaxis( (new Axis(Axis.VERTICAL)).type(DataValue.NUMBER) )
                      .horizontalaxis( (new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER) )
                     )
        );
    }); 

    it("should be able to create a BarRenderer", function () {
        expect(r instanceof BarRenderer).toBe(true);
    });

    it("should be able to get the default value of the 'barwidth' option",  function () {
        var barwidth = r.getOptionValue("barwidth");
        expect(DataMeasure.isInstance(barwidth)).toBe(true);
        expect(typeof(barwidth.getRealValue())).toBe("number");
        expect(barwidth.getRealValue()).toEqual(0);
    });
    it("should be able to set/get the 'barwidth' option using NumberMeasures",  function () {
        r.setOptionFromString("barwidth", 3.45);
        var barwidth = r.getOptionValue("barwidth");
        expect(DataMeasure.isInstance(barwidth)).toBe(true);
        expect(typeof(barwidth.getRealValue())).toBe("number");
        expect(barwidth.getRealValue()).toEqual(3.45);
    });
    xit("should be able to set/get the 'barwidth' option using DatetimeMeasures",  function () {
        r.horizontalaxis().type("datetime");
    });

    it("should be able to get the default value of the 'baroffset' option",  function () {
        var baroffset = r.getOptionValue("baroffset");
        expect(typeof(baroffset)).toEqual("number");
        expect(baroffset).toEqual(0);
    });
    it("should be able to set/get the 'baroffset' option",  function () {
        r.setOption("baroffset", 3.45);
        var baroffset = r.getOptionValue("baroffset");
        expect(typeof(baroffset)).toEqual("number");
        expect(baroffset).toEqual(3.45);
    });

    it("should be able to get the default value of the 'barbase' option",  function () {
        var barbase = r.getOptionValue("barbase");
        expect(barbase).toBe(null);
    });
    it("should be able to set/get the 'barbase' option using NumberValue",  function () {
        r.setOptionFromString("barbase", 3.45);
        var barbase = r.getOptionValue("barbase");
        expect(DataValue.isInstance(barbase)).toBe(true);
        expect(typeof(barbase.getRealValue())).toBe("number");
        expect(barbase.getRealValue()).toEqual(3.45);
    });
    xit("should be able to set/get the 'barbase' option using DatetimeValue",  function () {
        r.verticalaxis().type("datetime");
    });

    it("should be able to get the default value of the 'fillcolor' option",  function () {
        var fillcolor = r.getOptionValue("fillcolor");
        expect(fillcolor instanceof RGBColor).toBe(true);
        expect(fillcolor.getHexString()).toEqual("0x000000");
    });
    it("should be able to set/get the 'fillcolor' option",  function () {
        r.setOption("fillcolor", RGBColor.parse("0x123456"));
        var fillcolor = r.getOptionValue("fillcolor");
        expect(fillcolor instanceof RGBColor).toBe(true);
        expect(fillcolor.getHexString()).toEqual("0x123456");
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

    it("should be able to get the default value of the 'hidelines' option",  function () {
        var hidelines = r.getOptionValue("hidelines");
        expect(typeof(hidelines)).toEqual("number");
        expect(hidelines).toEqual(2);
    });
    it("should be able to set/get the 'hidelines' option",  function () {
        r.setOption("hidelines", 7.46);
        var hidelines = r.getOptionValue("hidelines");
        expect(typeof(hidelines)).toEqual("number");
        expect(hidelines).toEqual(7.46);
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
