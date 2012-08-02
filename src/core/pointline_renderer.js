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
        }
    ]);



/*

<plot>
  <renderer type="bar">
    <option name="color" value="red"   min="0" />
    <option name="color" value="blue"  max="0"/>
  ...


BarRenderer
  hasAn("options").which.isA(BarRendererOptions)

BarRendererOptions
  hasMany("color").which.isA(ColorOption)
  hasMany("barwidth").which.isA(BarWidthOption)

RootOption
  hasA("min")
  hasA("max")

RGBColorOption
  isA(RootOption)
  hasA("value").which.isA(RGBColor)
  respondsTo("serialize", ...)
RGBColorOption.parse = function() { ... }

NumberOption
  isA(RootOption)
  hasA("value").which.isA("number")

this.options().color().at(0).value()
this.options().color().at(1).value()




Renderer
  options = {
    'color' : [
       { 'value' : 'red',  'min' : 0, 'max' : undefined },
       { 'value' : 'blue', 'min' : undefined, 'max' : 0 }
    ],

    'barwidth' : [
    ],


  }  

Renderer.respondsTo("getOptionValue", function (name, val) {
});





BarRenderer
  hasAn("options").which.isA(BarRendererOptions)

BarRendererOptions
  hasMany("color").which.isA(ColorOption)
  hasMany("barwidth").which.isA(BarWidthOption)

    ns.Renderer.declareOptions(PointlineRenderer, [
        {
            'name'     : 'color',
            'type'     : RGBColorRendererOption,
            'defaults' : new RGBColor(0,0,0)
        },
        {
            'name'    : 'barwidth',
            'type'    : NumberRendererOption,
            'default' : 1

        },



    ns.Renderer.declareOptions(PointlineRenderer, [
        {
            'name'          : 'linecolor',
            'type'          : ns.Renderer.optionTypes.RGBColor,
            'defaultsTo'    : function () { return new RGBColor(0,0,0); }
        },
        {
            'name'          : 'linewidth',
            'defaultsTo'    : function () { return 1; },
            'type'          : ns.Renderer.optionTypes.number
        },
        {
            'name'          : 'pointsize',
            'defaultsTo'    : function () { return 0; },
            'type'          : ns.Renderer.optionTypes.number
        },
        {
            'name'           : 'pointshape',
            'defaultsTo'     : function () { return PointlineRenderer.CIRCLE; },
            'type'           {
                'validatesWith'  : PointlineRenderer.isShape,
                'parsersWith'    : PointlineRenderer.parseShape,
                'serializesWith' : PointlineRenderer.parseShape
            }
        },
        {
            'name'          : 'pointcolor',
            'type'          : ns.Renderer.optionTypes.RGBColor,
            'defaultsTo'    : function () { return new RGBColor(0,0,0); },
        },
        {
            'name'          : 'pointopacity',
            'defaultsTo'    : function () { return 1.0; },
            'type'          : ns.Renderer.optionTypes.number
        },
        {
            'name'          : 'pointoutlinewidth',
            'defaultsTo'    : function () { return 0; },
            'type'          : ns.Renderer.optionTypes.number
        },
        {
            'name'          : 'pointoutlinecolor',
            'type'          : ns.Renderer.optionTypes.RGBColor,
            'defaultsTo'    : function () { return new RGBColor(0,0,0); },
        },
    ]);


*/

    ns.Renderer.addType({'type'  : "pointline",
                         'model' : PointlineRenderer});
    ns.Renderer.addType({'type'  : "line",
                         'model' : PointlineRenderer});

    ns.PointlineRenderer = PointlineRenderer;
});
