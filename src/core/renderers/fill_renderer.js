// The Fill renderer is a 1-variable renderer which connects consecutive
// non-missing data points with line segments with a solid fill between
// the lines and the horizontal axis.
// 
// The line segements should occlude the solid fill.
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

    var FillRenderer,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.renderer);

    FillRenderer = new window.jermaine.Model( "FillRenderer", function () {
        this.isA(ns.Renderer);
    });

    FillRenderer.GRAY = parseInt("80", 16) / 255;

    ns.Renderer.declareOptions(FillRenderer, "FillRendererOptions", [
        {
            'name'          : 'linecolor',
            'type'          : ns.Renderer.RGBColorOption,
            'default'       : new window.multigraph.math.RGBColor(0,0,0)
        },
        {
            'name'          : 'linewidth',
            'type'          : ns.Renderer.NumberOption,
            'default'       : 1
        },
        {
            'name'          : 'fillcolor',
            'type'          : ns.Renderer.RGBColorOption,
            'default'       : new window.multigraph.math.RGBColor(FillRenderer.GRAY,FillRenderer.GRAY,FillRenderer.GRAY)
        },
        {
            'name'          : 'downfillcolor',
            'type'          : ns.Renderer.RGBColorOption,
            'default'       : null
        },
        {
            'name'          : 'fillopacity',
            'type'          : ns.Renderer.NumberOption,
            'default'       : 1.0
        },
        {
            'name'          : 'fillbase',
            'type'          : ns.Renderer.VerticalDataValueOption,
            'default'       : null
        }
    ]);

    ns.Renderer.addType({'type'  : "fill",
                         'model' : FillRenderer});

    ns.FillRenderer = FillRenderer;
});
