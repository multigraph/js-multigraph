var Model = require('../../../lib/jermaine/src/core/model.js');

// The Band renderer is a 2-variable renderer which fills the region
// between two data lines with a solid color, and draws a line segment
// between consecutive data points in each line.
// 
// It is very similar to the fill renderer except that the filled region
// extends between the two (vertical axis) data values at each data point, instead
// of between a single (vertical axis) value and a horizontal base line.
// 
// The line segements should occlude the solid fill.
// 
// This renderer accepts the following options:
// 
//     OPTION NAME:          linecolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
//     DESCRIPTION:          Color used for line segments.
// 
//     OPTION NAME:          linewidth
//     DATA TYPE:            number
//     DEFAULT VALUE:        1
//     DESCRIPTION:          Width, in pixels, of line segments.  A
//                           value of 0 means do not draw line segments.
// 
//     OPTION NAME:          line1color
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        none (linecolor is used)
//     DESCRIPTION:          Color used for line segments connecting the
//                           values of variable 1.   If both linecolor and
//                           line1color are specified, line1color is used.
// 
//     OPTION NAME:          line1width
//     DATA TYPE:            number
//     DEFAULT VALUE:        -1 (linewidth is used)
//     DESCRIPTION:          Width, in pixels, of line segments connecting the
//                           values of variable 1.  A value of 0 means do not
//                           draw line segments.   If both linewidth and
//                           line1width are specified, line1width is used.
// 
//     OPTION NAME:          line2color
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        none (linecolor is used)
//     DESCRIPTION:          Color used for line segments connecting the
//                           values of variable 2.   If both linecolor and
//                           line2color are specified, line2color is used.
// 
//     OPTION NAME:          line2width
//     DATA TYPE:            number
//     DEFAULT VALUE:        -1 (linewidth is used)
//     DESCRIPTION:          Width, in pixels, of line segments connecting the
//                           values of variable 2.  A value of 0 means do not
//                           draw line segments.   If both linewidth and
//                           line2width are specified, line2width is used.
// 
//     OPTION NAME:          fillcolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x808080 (dark gray)
//     DESCRIPTION:          Color used for the fill area.
// 
//     OPTION NAME:          fillopacity
//     DATA TYPE:            number
//     DEFAULT VALUE:        1
//     DESCRIPTION:          Opacity used for the fill area.
//

var Renderer = require('../renderer.js'),
    RGBColor = require('../../math/rgb_color.js');

var BandRenderer = new Model("BandRenderer", function () {
    this.isA(Renderer);
    this.hasA("numberOfVariables").which.defaultsTo(3);
});

BandRenderer.GRAY = parseInt("80", 16) / 255;

Renderer.declareOptions(BandRenderer, "BandRendererOptions", [
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
        "name"          : "line1color",
        "type"          : Renderer.RGBColorOption,
        "default"       : null
    },
    {
        "name"          : "line1width",
        "type"          : Renderer.NumberOption,
        "default"       : -1
    },
    {
        "name"          : "line2color",
        "type"          : Renderer.RGBColorOption,
        "default"       : null
    },
    {
        "name"          : "line2width",
        "type"          : Renderer.NumberOption,
        "default"       : -1
    },
    {
        "name"          : "fillcolor",
        "type"          : Renderer.RGBColorOption,
        "default"       : new RGBColor(BandRenderer.GRAY,BandRenderer.GRAY,BandRenderer.GRAY)
    },
    {
        "name"          : "fillopacity",
        "type"          : Renderer.NumberOption,
        "default"       : 1.0
    }
]);

Renderer.BAND = new Renderer.Type("band");

Renderer.addType({"type"  : Renderer.Type.parse("band"),
                  "model" : BandRenderer});

module.exports = BandRenderer;
