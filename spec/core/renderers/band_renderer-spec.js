/*global describe, it, beforeEach, expect, xit, jasmine */

describe("BandRenderer", function () {
    "use strict";

    var Renderer = require('../../src/core/renderer.js'),
        BandRenderer = require('../../src/core/renderers/band_renderer.js'),
        Axis = require('../../src/core/axis.js'),
        DataValue = require('../../src/core/data_value.js'),
        NumberValue = require('../../src/core/number_value.js'),
        DataPlot = require('../../src/core/data_plot.js'),
        r;

    beforeEach(function () {
        var vaxis;
        r = (
            (new BandRenderer())
                .plot((new DataPlot())
                      .verticalaxis( (new Axis(Axis.VERTICAL)).type(DataValue.NUMBER) )
                      .horizontalaxis( (new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER) )
                     )
        );
    }); 

    it("should be able to create a BandRenderer", function () {
        expect(r instanceof BandRenderer).toBe(true);
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
    it("should be able to get the default value of the 'line1color' option",  function () {
        var line1color = r.getOptionValue("line1color");
        expect(line1color).toBe(null);
    });
    it("should be able to set/get the 'line1color' option",  function () {
        r.setOption("line1color", require('../../src/math/rgb_color.js').parse("0x123456"));
        var line1color = r.getOptionValue("line1color");
        expect(line1color instanceof require('../../src/math/rgb_color.js')).toBe(true);
        expect(line1color.getHexString()).toEqual("0x123456");
    });
    it("should be able to get the default value of the 'line2color' option",  function () {
        var line2color = r.getOptionValue("line2color");
        expect(line2color).toBe(null);
    });
    it("should be able to set/get the 'line2color' option",  function () {
        r.setOption("line2color", require('../../src/math/rgb_color.js').parse("0x123456"));
        var line2color = r.getOptionValue("line2color");
        expect(line2color instanceof require('../../src/math/rgb_color.js')).toBe(true);
        expect(line2color.getHexString()).toEqual("0x123456");
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

    it("should be able to get the default value of the 'line1width' option",  function () {
        var line1width = r.getOptionValue("line1width");
        expect(typeof(line1width)).toEqual("number");
        expect(line1width).toEqual(-1);
    });
    it("should be able to set/get the 'line1width' option",  function () {
        r.setOption("line1width", 3.45);
        var line1width = r.getOptionValue("line1width");
        expect(typeof(line1width)).toEqual("number");
        expect(line1width).toEqual(3.45);
    });

    it("should be able to get the default value of the 'line2width' option",  function () {
        var line2width = r.getOptionValue("line2width");
        expect(typeof(line2width)).toEqual("number");
        expect(line2width).toEqual(-1);
    });
    it("should be able to set/get the 'line2width' option",  function () {
        r.setOption("line2width", 3.45);
        var line2width = r.getOptionValue("line2width");
        expect(typeof(line2width)).toEqual("number");
        expect(line2width).toEqual(3.45);
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
