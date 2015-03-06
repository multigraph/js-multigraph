var jermaine = require('../../../lib/jermaine/src/jermaine.js');

// The Fill renderer is a 1-variable renderer which connects consecutive
// non-missing data points with line segments with a solid fill between
// the lines and the horizontal axis.
// 
// The line segements should occlude the solid fill.
// 
// This renderer accepts the following options:
// 
//     OPTION NAME:          linecolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
//     DESCRIPTION:          Color used for line segments
// 
//     OPTION NAME:          linewidth
//     DATA TYPE:            number
//     DEFAULT VALUE:        1
//     DESCRIPTION:          Width, in pixels, of line segments.  A
//                           value of 0 means do not draw line segments.
// 
//     OPTION NAME:          fillcolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x808080 (dark gray)
//     DESCRIPTION:          Color used for the fill area.
// 
//     OPTION NAME:          downfillcolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        null
//     DESCRIPTION:          Color used for fill area that is below the
//                           fillbase, if a fillbase is specified. If no
//                           downfillcolor is specifed, fillcolor will
//                           be used for all fill areas.
// 
//     OPTION NAME:          fillopacity
//     DATA TYPE:            number
//     DEFAULT VALUE:        1
//     DESCRIPTION:          Opacity used for the fill area.
// 
//     OPTION NAME:          fillbase
//     DATA TYPE:            DataValue
//     DEFAULT VALUE:        null
//     DESCRIPTION:          The location along the plot's vertical axis
//                           of the horizontal line that defines the
//                           bottom (or top) of the filled region; if no
//                           fillbase is specified, the fill will extend
//                           down to the bottom of the plot area.
// 
var Renderer = require('../renderer.js'),
    RGBColor = require('../../math/rgb_color.js'),
    utilityFunctions = require('../../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.renderer),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.renderer);

var FillRenderer = new jermaine.Model("FillRenderer", function () {
    this.isA(Renderer);
    this.hasA("numberOfVariables").which.defaultsTo(2);
});

FillRenderer.GRAY = parseInt("80", 16) / 255;

Renderer.declareOptions(FillRenderer, "FillRendererOptions", [
    {
        "name"          : "linecolor",
        "type"          : Renderer.RGBColorOption,
        "default"       : new RGBColor(0,0,0)
    },
    {
        "name"          : "linewidth",
        "type"          : Renderer.NumberOption,
        "default"       : 1
    },
    {
        "name"          : "fillcolor",
        "type"          : Renderer.RGBColorOption,
        "default"       : new RGBColor(FillRenderer.GRAY,FillRenderer.GRAY,FillRenderer.GRAY)
    },
    {
        "name"          : "downfillcolor",
        "type"          : Renderer.RGBColorOption,
        "default"       : null
    },
    {
        "name"          : "fillopacity",
        "type"          : Renderer.NumberOption,
        "default"       : 1.0
    },
    {
        "name"          : "fillbase",
        "type"          : Renderer.VerticalDataValueOption,
        "default"       : null
    }
]);

Renderer.FILL = new Renderer.Type("fill");

Renderer.addType({"type"  : Renderer.Type.parse("fill"),
                  "model" : FillRenderer});

module.exports = FillRenderer;
