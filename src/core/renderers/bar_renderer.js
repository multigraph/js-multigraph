// The Bar renderer is a 1-variable renderer which draws a bar at each
// non-missing data point with an outline around the bar and a solid
// fill between the bar and the horizontal axis.
// 
// This renderer accepts the following options:
// 
//     OPTION NAME:          linewidth
//     DESCRIPTION:          Width, in pixels, of line segments.  A
//                           value of 0 means do not draw line segments.
//     DATA TYPE:            number
//     DEFAULT VALUE:        1
// 
//     OPTION NAME:          linecolor
//     DESCRIPTION:          Color used for line segments
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
// 
//     OPTION NAME:          fillcolor
//     DESCRIPTION:          ...
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x808080 (dark gray)
// 
//     OPTION NAME:          fillopacity
//     DESCRIPTION:          
//     DATA TYPE:            number
//     DEFAULT VALUE:        1.0
// 
window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var BarRenderer,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.renderer);

    BarRenderer = new window.jermaine.Model( "BarRenderer", function () {
        this.isA(ns.Renderer);
    });

    BarRenderer.GRAY = parseInt("80", 16) / 255;

    ns.Renderer.declareOptions(BarRenderer, "BarRendererOptions", [
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
            "name"          : "barbase",
            "type"          : ns.Renderer.VerticalDataValueOption,
            "default"       : null
        },
        {
            "name"          : "fillcolor",
            "type"          : ns.Renderer.RGBColorOption,
            "default"       : new window.multigraph.math.RGBColor(0,0,0)
        },
        {
            "name"          : "linecolor",
            "type"          : ns.Renderer.RGBColorOption,
            "default"       : new window.multigraph.math.RGBColor(0,0,0)
        },
        {
            "name"          : "hidelines",
            "type"          : ns.Renderer.NumberOption,
            "default"       : 2
        }
    ]);

    ns.Renderer.addType({"type"  : "bar",
                         "model" : BarRenderer});

    ns.BarRenderer = BarRenderer;
});
