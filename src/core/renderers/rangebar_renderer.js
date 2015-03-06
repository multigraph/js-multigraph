var jermaine = require('../../../lib/jermaine/src/jermaine.js');

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
//     DESCRIPTION:          The offset of the left edge of each bar
//                           from the corresponding data value, as a
//                           fraction (0-1) of the barwidth.
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
var Renderer = require('../renderer.js'),
    RGBColor = require('../../math/rgb_color.js'),
    DataMeasure = require('../data_measure.js'),
    utilityFunctions = require('../../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.renderer);

var RangeBarRenderer = new jermaine.Model("RangeBarRenderer", function () {
    this.isA(Renderer);
    this.hasA("numberOfVariables").which.defaultsTo(3);
});

Renderer.declareOptions(RangeBarRenderer, "RangeBarRendererOptions", [
    {
        "name"          : "barwidth",
        "type"          : Renderer.HorizontalDataMeasureOption,
        "default"       : new DataMeasure.parse("number", 0)
    },
    {
        "name"          : "baroffset",
        "type"          : Renderer.NumberOption,
        "default"       : 0
    },
    {
        "name"          : "fillcolor",
        "type"          : Renderer.RGBColorOption,
        "default"       : RGBColor.parse("0x808080")
    },
    {
        "name"          : "fillopacity",
        "type"          : Renderer.NumberOption,
        "default"       : 1.0
    },
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
        "name"          : "hidelines",
        "type"          : Renderer.NumberOption,
        "default"       : 2
    }
]);

Renderer.RANGEBAR = new Renderer.Type("rangebar");

Renderer.addType({"type"  : Renderer.Type.parse("rangebar"),
                  "model" : RangeBarRenderer});

module.exports = RangeBarRenderer;
