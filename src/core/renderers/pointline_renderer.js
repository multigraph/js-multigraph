var Model = require('../../../lib/jermaine/src/core/model.js');

// The Pointline renderer is a 1-variable renderer which draws a shape
// at each non-missing data point, and connects consecutive
// non-missing data points with line segments.  The drawing of both
// the points, and the lines, is optional, so this renderer can be
// used to draw just points, just line segments, or both.
// 
// When both points and line segments are drawn, the points should
// be drawn on "top of" the line segments.
// 
// This renderer accepts the following options:
// 
//     OPTION NAME:          linewidth
//     DATA TYPE:            number
//     DEFAULT VALUE:        1
//     DESCRIPTION:          Width, in pixels, of line segments.  A
//                           value of 0 means do not draw line segments.
// 
//     OPTION NAME:          linecolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
//     DESCRIPTION:          Color used for line segments
// 
//     OPTION NAME:          pointsize
//     DATA TYPE:            number
//     DEFAULT VALUE:        0
//     DESCRIPTION:          The radius of drawn points.  A value
//                           of 0 means do not draw points.
// 
//     OPTION NAME:          pointcolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
//     DESCRIPTION:          Color used for drawing points
// 
//     OPTION NAME:          pointshape
//     DATA TYPE:            One of the constants PointlineRenderer.CIRCLE,
//                           PointlineRenderer.SQUARE, PointlineRenderer.TRIANGLE,
//                           PointlineRenderer.DIAMOND, PointlineRenderer.STAR,
//                           PointlineRenderer.PLUS, or PointlineRenderer.X.  These
//                           correspond to the strings "circle", "square", "triangle",
//                           "diamond", "star", "plus", and "x" in MUGL files.
//     DEFAULT VALUE:        PointlineRenderer.CIRCLE
//     DESCRIPTION:          The shape to use for drawing points.
// 
//     OPTION NAME:          pointopacity
//     DATA TYPE:            number
//     DEFAULT VALUE:        1.0
//     DESCRIPTION:          The opactiy of the drawn points, in the range 0-1.
//                           A value of 1 means completely opaque; a value of 0
//                           means completely invisible.
// 
//     OPTION NAME:          pointoutlinewidth
//     DATA TYPE:            number
//     DEFAULT VALUE:        0
//     DESCRIPTION:          The width, in pixels, of the outline to be drawn
//                           around each point.  A value of 0 means draw no
//                           outline.
// 
//     OPTION NAME:          pointoutlinecolor
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
//     DESCRIPTION:          The color to use for the outline around each point.
//
var Renderer = require('../renderer.js'),
    RGBColor = require('../../math/rgb_color.js'),
    utilityFunctions = require('../../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.renderer);

var PointlineRenderer = new Model("PointlineRenderer", function () {
    this.isA(Renderer);
    this.hasA("numberOfVariables").which.defaultsTo(2);
    //
    //this.isBuiltWith(...)  NO NO NO!!!
    //
    // DO NOT CALL isBuiltWith for a renderer subclass; Renderer.declareOptions calls isBuiltWith(), and it
    // will break if you also call it here!!!
});


PointlineRenderer.CIRCLE   = "circle";
PointlineRenderer.SQUARE   = "square";
PointlineRenderer.TRIANGLE = "triangle";
PointlineRenderer.DIAMOND  = "diamond";
PointlineRenderer.STAR     = "star";
PointlineRenderer.PLUS     = "plus";
PointlineRenderer.X        = "x";

PointlineRenderer.shapes = [ 
    PointlineRenderer.CIRCLE,
    PointlineRenderer.SQUARE,
    PointlineRenderer.TRIANGLE,
    PointlineRenderer.DIAMOND,
    PointlineRenderer.STAR,
    PointlineRenderer.PLUS,
    PointlineRenderer.X
];

PointlineRenderer.isShape = function (shape) {
    var i;
    for (i=0; i<PointlineRenderer.shapes.length; ++i) {
        if (PointlineRenderer.shapes[i] === shape) { return true; }
    }
    return false;
};

PointlineRenderer.parseShape = function (string) {
    if (string.toLowerCase() === PointlineRenderer.CIRCLE)   { return PointlineRenderer.CIRCLE;   }
    if (string.toLowerCase() === PointlineRenderer.SQUARE)   { return PointlineRenderer.SQUARE;   }
    if (string.toLowerCase() === PointlineRenderer.TRIANGLE) { return PointlineRenderer.TRIANGLE; }
    if (string.toLowerCase() === PointlineRenderer.DIAMOND)  { return PointlineRenderer.DIAMOND;  }
    if (string.toLowerCase() === PointlineRenderer.STAR)     { return PointlineRenderer.STAR;     }
    if (string.toLowerCase() === PointlineRenderer.PLUS)     { return PointlineRenderer.PLUS;     }
    if (string.toLowerCase() === PointlineRenderer.X)        { return PointlineRenderer.X;        }
    throw new Error("unknown point shape: " + string);
};

/*
 * This function converts a "shape" enum object to a string.  In reality, the objects ARE
 * the strings, so we just return the object.
 */
PointlineRenderer.serializeShape = function (shape) {
    return shape;
};

PointlineRenderer.ShapeOption = new Model("PointlineRenderer.ShapeOption", function () {
    this.isA(Renderer.Option);
    this.hasA("value").which.validatesWith(PointlineRenderer.isShape);
    this.isBuiltWith("value");
    this.respondsTo("serializeValue", function () {
        return PointlineRenderer.serializeShape(this.value());
    });
    this.respondsTo("parseValue", function (string) {
        this.value( PointlineRenderer.parseShape(string) );
    });
    this.respondsTo("valueEq", function (value) {
        return (this.value()===value);
    });
});


Renderer.declareOptions(PointlineRenderer, "PointlineRendererOptions", [
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
        "name"          : "pointshape",
        "type"          : PointlineRenderer.ShapeOption,
        "default"       : PointlineRenderer.CIRCLE
    },
    {
        "name"          : "pointsize",
        "type"          : Renderer.NumberOption,
        "default"       : 0
    },
    {
        "name"          : "pointcolor",
        "type"          : Renderer.RGBColorOption,
        "default"       : new RGBColor(0,0,0)
    },
    {
        "name"          : "pointopacity",
        "type"          : Renderer.NumberOption,
        "default"       : 1.0
    },
    {
        "name"          : "pointoutlinewidth",
        "type"          : Renderer.NumberOption,
        "default"       : 0
    },
    {
        "name"          : "pointoutlinecolor",
        "type"          : Renderer.RGBColorOption,
        "default"       : new RGBColor(0,0,0)
    }
]);

Renderer.POINTLINE = new Renderer.Type("pointline");
Renderer.POINT     = new Renderer.Type("point");
Renderer.LINE      = new Renderer.Type("line");

Renderer.addType({"type"  : Renderer.Type.parse("pointline"),
                  "model" : PointlineRenderer});
Renderer.addType({"type"  : Renderer.Type.parse("line"),
                  "model" : PointlineRenderer});
Renderer.addType({"type"  : Renderer.Type.parse("point"),
                  "model" : PointlineRenderer});

module.exports = PointlineRenderer;

