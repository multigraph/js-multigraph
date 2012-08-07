/*global describe, it, beforeEach, expect, xit, jasmine */

describe("PointlineRenderer", function () {
    "use strict";

    var Renderer = window.multigraph.core.Renderer,
        PointlineRenderer = window.multigraph.core.PointlineRenderer,
        Axis = window.multigraph.core.Axis,
        DataValue = window.multigraph.core.DataValue,
        NumberValue = window.multigraph.core.NumberValue,
        r;

    beforeEach(function () {
        var vaxis;
        r = new PointlineRenderer();
        r.verticalaxis( (new Axis(Axis.VERTICAL)).type(DataValue.NUMBER) );
    }); 

    it("should be able to create a PointlineRenderer", function () {
        expect(r instanceof PointlineRenderer).toBe(true);
    });

    it("should be able to get the default value of the 'linecolor' option",  function () {
        var linecolor = r.getOptionValue("linecolor");
        expect(linecolor instanceof window.multigraph.math.RGBColor).toBe(true);
        expect(linecolor.getHexString()).toEqual("0x000000");
    });
    it("should be able to set/get the 'linecolor' option",  function () {
        r.setOption("linecolor", window.multigraph.math.RGBColor.parse("0x123456"));
        var linecolor = r.getOptionValue("linecolor");
        expect(linecolor instanceof window.multigraph.math.RGBColor).toBe(true);
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

    it("should be able to get the default value of the 'pointshape' option",  function () {
        var pointshape = r.getOptionValue("pointshape");
        expect(PointlineRenderer.isShape(pointshape)).toBe(true);
        expect(pointshape).toEqual(PointlineRenderer.CIRCLE);
        expect(pointshape).not.toEqual(PointlineRenderer.SQUARE);
        expect(pointshape).not.toEqual(PointlineRenderer.TRIANGLE);
        expect(pointshape).not.toEqual(PointlineRenderer.DIAMOND);
        expect(pointshape).not.toEqual(PointlineRenderer.STAR);
        expect(pointshape).not.toEqual(PointlineRenderer.PLUS);
        expect(pointshape).not.toEqual(PointlineRenderer.X);
    });
    it("should be able to set/get the 'pointshape' option",  function () {
        r.setOption("pointshape", PointlineRenderer.SQUARE);
        var pointshape = r.getOptionValue("pointshape");
        expect(pointshape).toEqual(PointlineRenderer.SQUARE);
    });

    it("should be able to get the default value of the 'pointsize' option",  function () {
        var pointsize = r.getOptionValue("pointsize");
        expect(typeof(pointsize)).toEqual("number");
        expect(pointsize).toEqual(0);
    });
    it("should be able to set/get the 'pointsize' option",  function () {
        r.setOption("pointsize", 7.46);
        var pointsize = r.getOptionValue("pointsize");
        expect(typeof(pointsize)).toEqual("number");
        expect(pointsize).toEqual(7.46);
    });

    it("should be able to get the default value of the 'pointcolor' option",  function () {
        var pointcolor = r.getOptionValue("pointcolor");
        expect(pointcolor instanceof window.multigraph.math.RGBColor).toBe(true);
        expect(pointcolor.getHexString()).toEqual("0x000000");
    });
    it("should be able to set/get the 'pointcolor' option",  function () {
        r.setOption("pointcolor", window.multigraph.math.RGBColor.parse("0x345678"));
        var pointcolor = r.getOptionValue("pointcolor");
        expect(pointcolor instanceof window.multigraph.math.RGBColor).toBe(true);
        expect(pointcolor.getHexString()).toEqual("0x345678");
    });

    it("should be able to get the default value of the 'pointopacity' option",  function () {
        var pointopacity = r.getOptionValue("pointopacity");
        expect(typeof(pointopacity)).toEqual("number");
        expect(pointopacity).toEqual(1.0);
    });
    it("should be able to set/get the 'pointopacity' option",  function () {
        r.setOption("pointopacity", 0.53);
        var pointopacity = r.getOptionValue("pointopacity");
        expect(typeof(pointopacity)).toEqual("number");
        expect(pointopacity).toEqual(0.53);
    });

    it("should be able to get the default value of the 'pointoutlinewidth' option",  function () {
        var pointoutlinewidth = r.getOptionValue("pointoutlinewidth");
        expect(typeof(pointoutlinewidth)).toEqual("number");
        expect(pointoutlinewidth).toEqual(0);
    });
    it("should be able to set/get the 'pointoutlinewidth' option",  function () {
        r.setOption("pointoutlinewidth", 2.1);
        var pointoutlinewidth = r.getOptionValue("pointoutlinewidth");
        expect(typeof(pointoutlinewidth)).toEqual("number");
        expect(pointoutlinewidth).toEqual(2.1);
    });

    it("should be able to get the default value of the 'pointoutlinecolor' option",  function () {
        var pointoutlinecolor = r.getOptionValue("pointoutlinecolor");
        expect(pointoutlinecolor instanceof window.multigraph.math.RGBColor).toBe(true);
        expect(pointoutlinecolor.getHexString()).toEqual("0x000000");
    });
    it("should be able to set/get the 'pointoutlinecolor' option",  function () {
        r.setOption("pointoutlinecolor", window.multigraph.math.RGBColor.parse("0x56789a"));
        var pointoutlinecolor = r.getOptionValue("pointoutlinecolor");
        expect(pointoutlinecolor instanceof window.multigraph.math.RGBColor).toBe(true);
        expect(pointoutlinecolor.getHexString()).toEqual("0x56789a");
    });

    it("should throw an error if we try to get the value of an invalid option", function () {
        expect(function() {
            var v = r.getOptionValue("notAnOption");
        }).toThrow();
    });
    it("should throw an error if we try to set the value of an invalid option", function () {
        expect(function() {
            r.setOption("notAnOption", 0);
        }).toThrow();
    });

});
