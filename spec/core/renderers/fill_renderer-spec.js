/*global describe, it, beforeEach, expect, xit, jasmine */

describe("FillRenderer", function () {
    "use strict";

    var Renderer = require('../../src/core/renderer.js'),
        FillRenderer = require('../../src/core/renderers/fillrenderer.js'),
        Axis = require('../../src/core/axis.js'),
        DataValue = require('../../src/core/data_value.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DataPlot = require('../../src/core/data_plot.js'),
        r;

    beforeEach(function () {
        var vaxis;
        r = (
            (new FillRenderer())
                .plot((new DataPlot())
                      .verticalaxis( (new Axis(Axis.VERTICAL)).type(DataValue.NUMBER) )
                      .horizontalaxis( (new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER) )
                     )
        );
    }); 

    it("should be able to create a FillRenderer", function () {
        expect(r instanceof FillRenderer).toBe(true);
    });

    it("should be able to get the default value of the 'linecolor' option",  function () {
        var linecolor = r.getOptionValue("linecolor");
        expect(linecolor instanceof require('../../src/math/rgb_color.js')).toBe(true);
        expect(linecolor.getHexString()).toEqual("0x000000");
    });
    it("should be able to set/get the 'linecolor' option",  function () {
        r.setOption("linecolor", require('../../src/math/rgb_color.js').parse("0x123456"));
        var linecolor = r.getOptionValue("linecolor");
        expect(linecolor instanceof require('../../src/math/rgb_color.js')).toBe(true);
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
        expect(fillcolor instanceof require('../../src/math/rgb_color.js')).toBe(true);
        expect(fillcolor.getHexString()).toEqual("0x808080");
    });
    it("should be able to set/get the 'fillcolor' option",  function () {
        r.setOption("fillcolor", require('../../src/math/rgb_color.js').parse("0x123456"));
        var fillcolor = r.getOptionValue("fillcolor");
        expect(fillcolor instanceof require('../../src/math/rgb_color.js')).toBe(true);
        expect(fillcolor.getHexString()).toEqual("0x123456");
    });

    it("should be able to get the default value of the 'downfillcolor' option",  function () {
        var downfillcolor = r.getOptionValue("downfillcolor");
        expect(downfillcolor).toBe(null);
    });
    it("should be able to set/get the 'downfillcolor' option",  function () {
        r.setOption("downfillcolor", require('../../src/math/rgb_color.js').parse("0x123456"));
        var downfillcolor = r.getOptionValue("downfillcolor");
        expect(downfillcolor instanceof require('../../src/math/rgb_color.js')).toBe(true);
        expect(downfillcolor.getHexString()).toEqual("0x123456");
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

    it("should be able to get the default value of the 'fillbase' option",  function () {
        var fillbase = r.getOptionValue("fillbase");
        expect(fillbase).toBe(null);
    });
    it("should be able to set/get the 'fillbase' option using NumberValue",  function () {
        r.setOptionFromString("fillbase", 7.45);
        var fillbase = r.getOptionValue("fillbase");
        expect(DataValue.isInstance(fillbase)).toBe(true);
        expect(typeof(fillbase.getRealValue())).toBe("number");
        expect(fillbase.getRealValue()).toEqual(7.45);
    });
    xit("should be able to set/get the 'fillbase' option using DatetimeValue",  function () {
        r.verticalaxis().type("datetime");
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
