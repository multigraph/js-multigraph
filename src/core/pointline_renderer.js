// The Pointline renderer is a 1-variable renderer which draws a shape at
// each non-missing data point, and connects consecutive non-missing data
// points with line segments.  The drawing of both the points, and the
// lines, is optional, so this renderer can be used to draw just points,
// just line segments, or both.
// 
// When both points and line segments are drawn, the points should
// occlude the line segments.
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
//     OPTION NAME:          pointsize
//     DESCRIPTION:          The diameter of drawn points.  A value
//                           of 0 means do not draw points.
//     DATA TYPE:            number
//     DEFAULT VALUE:        0
// 
//     OPTION NAME:          pointcolor
//     DESCRIPTION:          ...
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
// 
//     OPTION NAME:          pointshape
//     DESCRIPTION:          
//     DATA TYPE:            PointlineRenderer.***
//     DEFAULT VALUE:        PointlineRenderer.CIRCLE
// 
//     OPTION NAME:          pointopacity
//     DESCRIPTION:          
//     DATA TYPE:            number
//     DEFAULT VALUE:        1.0
// 
//     OPTION NAME:          pointoutlinewidth
//     DESCRIPTION:          
//     DATA TYPE:            number
//     DEFAULT VALUE:        0
// 
//     OPTION NAME:          pointoutlinecolor
//     DESCRIPTION:          
//     DATA TYPE:            RGBColor
//     DEFAULT VALUE:        0x000000 (black)
//
window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var PointlineRenderer,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.renderer);

    PointlineRenderer = new window.jermaine.Model( "PointlineRenderer", function () {
        this.isA(ns.Renderer);

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

    PointlineRenderer.isShape = function(shape) {
        var i;
        for (i=0; i<PointlineRenderer.shapes.length; ++i) {
            if (PointlineRenderer.shapes[i] === shape) { return true; }
        }
        return false;
    };

    PointlineRenderer.parseShape = function(string) {
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

    PointlineRenderer.ShapeOption = new window.jermaine.Model( "PointlineRenderer.ShapeOption", function () {
        this.isA(ns.Renderer.Option);
        this.hasA("value").which.validatesWith(PointlineRenderer.isShape);
        this.isBuiltWith("value");
        this.respondsTo("serializeValue", function () {
            return PointlineRenderer.serializeShape(this.value());
        });
        this.respondsTo("parseValue", function (string) {
            this.value( PointlineRenderer.parseShape(string) );
        });
    });


    ns.Renderer.declareOptions(PointlineRenderer, "PointlineRendererOptions", [
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
            'name'          : 'pointshape',
            'type'          : PointlineRenderer.ShapeOption,
            'default'       : PointlineRenderer.CIRCLE
        },
        {
            'name'          : 'pointsize',
            'type'          : ns.Renderer.NumberOption,
            'default'       : 0
        },
        {
            'name'          : 'pointcolor',
            'type'          : ns.Renderer.RGBColorOption,
            'default'       : new window.multigraph.math.RGBColor(0,0,0)
        },
        {
            'name'          : 'pointopacity',
            'type'          : ns.Renderer.NumberOption,
            'default'       : 1.0
        },
        {
            'name'          : 'pointoutlinewidth',
            'type'          : ns.Renderer.NumberOption,
            'default'       : 0
        },
        {
            'name'          : 'pointoutlinecolor',
            'type'          : ns.Renderer.RGBColorOption,
            'default'       : new window.multigraph.math.RGBColor(0,0,0)
        }
    ]);

    ns.Renderer.addType({'type'  : "pointline",
                         'model' : PointlineRenderer});
    ns.Renderer.addType({'type'  : "line",
                         'model' : PointlineRenderer});

    ns.PointlineRenderer = PointlineRenderer;
});
