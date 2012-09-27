// The RangeBar renderer is a 2-variable renderer which draws a
// vertical bar between two data values, and optionally outlines
// around the bars.  It is very similar to the Bar renderer except
// that the bar is drawn between two data values, instead of between a
// single data value and a base line.
// 
// The line segements should occlude the solid fill.
// 
// This renderer accepts the following options:
// 
//     OPTION NAME:          barwidth
//     DATA TYPE:            DataMeasure
//     DEFAULT VALUE:        ???
//     DESCRIPTION:          Width, in relative terms to the type of the
//                           axis the plot is on, of the bars.
//                           
//     OPTION NAME:          baroffset
//     DATA TYPE:            number
//     DEFAULT VALUE:        0
//     DESCRIPTION:          The offset, in pixels, of the left edge of
//                           each bar from the corresponding data value.
// 
//     OPTION NAME:          fillcolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x808080 (dark gray)
//     DESCRIPTION:          Color used for filling the bars.
// 
//     OPTION NAME:          fillopacity
//     DATA TYPE:            number
//     DEFAULT VALUE:        1
//     DESCRIPTION:          Opacity used for the fill area.
// 
//     OPTION NAME:          linecolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
//     DESCRIPTION:          Color used for outlines around the bars.
// 
//     OPTION NAME:          linewidth
//     DATA TYPE:            number
//     DEFAULT VALUE:        0
//     DESCRIPTION:          Width, in pixels, of outlines around
//                           the bars.  A value of 0 (which is the
//                           default) means don't draw outlines.
// 
//     OPTION NAME:          hidelines
//     DATA TYPE:            number
//     DEFAULT VALUE:        2
//     DESCRIPTION:          Bars which are less wide, in pixels, than
//                           this number do not render their outlines.
// 
window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var RangeBarRenderer;

    RangeBarRenderer = new window.jermaine.Model( "RangeBarRenderer", function () {
        this.isA(ns.Renderer);
    });

    ns.Renderer.declareOptions(RangeBarRenderer, "RangeBarRendererOptions", [
        {
            "name"          : "barwidth",
            "type"          : ns.Renderer.HorizontalDataMeasureOption,
            "default"       : new ns.DataMeasure.parse("number", 0)
        },
        {
            "name"          : "baroffset",
            "type"          : ns.Renderer.NumberOption,
            "default"       : 0
        },
        {
            "name"          : "fillcolor",
            "type"          : ns.Renderer.RGBColorOption,
            "default"       : window.multigraph.math.RGBColor.parse("0x808080")
        },
        {
            "name"          : "fillopacity",
            "type"          : ns.Renderer.NumberOption,
            "default"       : 1.0
        },
        {
            "name"          : "linecolor",
            "type"          : ns.Renderer.RGBColorOption,
            "default"       : new window.multigraph.math.RGBColor(0,0,0)
        },
        {
            "name"          : "linewidth",
            "type"          : ns.Renderer.NumberOption,
            "default"       : 1
        },
        {
            "name"          : "hidelines",
            "type"          : ns.Renderer.NumberOption,
            "default"       : 2
        }
    ]);

    ns.Renderer.addType({"type"  : ns.Renderer.Type.parse("rangebar"),
                         "model" : RangeBarRenderer});

    ns.RangeBarRenderer = RangeBarRenderer;
});
