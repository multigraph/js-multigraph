
//  "horizontalaxis" : {
//    "id" : STRING, "type" : DATATYPE(number), "length" : RELLEN(1.0), "base" : POINT(-1,1), "anchor" : DOUBLE(-1), "position" : POINT(0,0),
//    "min" : DATAVALUEORAUTO(auto), "max" : DATAVALUEORAUTO(auto), "minposition" : RELPOS(-1.0), "maxposition" : RELPOS(1.0), "color" : COLOR(black), "linewidth" : INTEGER(1),
//    "tickmin" : INTEGER(-3), "tickmax" : INTEGER(3), "tickcolor" : COLOR(black),
//    "labels" : {
//       "format" : STRING, "start" : DATAVALUE(0), "angle" : DOUBLE(0), "position" : POINT,
//       "anchor" : POINT, "color" : COLOR(black), "spacing" : STRING, "densityfactor" : DOUBLE(1.0),
//       "label" : [
//           { "format" : STRING, "start" : STRING, "angle" : DOUBLE, "position" : POINT, "anchor" : POINT, "spacing" : STRING, "densityfactor" : DOUBLE },
//           { "format" : STRING, "start" : STRING, "angle" : DOUBLE, "position" : POINT, "anchor" : POINT, "spacing" : STRING, "densityfactor" : DOUBLE },
//           ...
//        ]
//    }
//    "title" : { "base" : DOUBLE(0), "anchor" : POINT, "position" : POINT, "angle" : DOUBLE(0), "text" : "TITLETEXT", "font": STRING },
//    "grid" : { "color" : COLOR(0xeeeeee), "visible" : BOOLEAN(false) },
//    "pan" : { "allowed" : BOOLEAN(yes), "min" : DATAVALUE, "max" : DATAVALUE },
//    "zoom" : { "allowed" : BOOLEAN(yes), "min" : DATAMEASURE, "max" : DATAMEASURE, "anchor" : DATAVALUE },
//    "binding" : { "id" : STRING!, "min" : DATAVALUE!, "max" : DATAVALUE! }
//    "visible" : BOOLEAN(true)
//  }


// these are needed so that their .parseJSON methods will be defined when called below:
require('./labeler.js');
require('./axis_title.js');
require('./grid.js');
require('./pan.js');
require('./zoom.js');

var Axis = require('../../core/axis.js'),
    pF = require('../../util/parsingFunctions.js'),
    vF = require('../../util/validationFunctions.js'),
    uF = require('../../util/utilityFunctions.js');

var parseLabels = function (json, axis) {
    var spacings,
        labelers  = axis.labelers(),
        Labeler = require('../../core/labeler.js'),
        DataValue = require('../../core/data_value.js'),
        i;

    spacings = [];
    if (json !== undefined) {
        if (json.spacing !== undefined) {
            spacings = vF.typeOf(json.spacing) === 'array' ? json.spacing : [ json.spacing ];
        }
    }
    if (spacings.length > 0) {
        // If there was a spacing attr on the <labels> tag, create a new labeler for
        // each spacing present in it, using the other values from the <labels> tag
        for (i = 0; i < spacings.length; ++i) {
            labelers.add(Labeler.parseJSON(json, axis, undefined, spacings[i]));
        }
    } else if (json !== undefined && json.label !== undefined && json.label.length > 0) {
        // If there are <label> tags, parse the <labels> tag to get default values
        var defaults = Labeler.parseJSON(json, axis, undefined, null);
        // And loop over each <label> tag, creating labelers for each, splitting multiple
        // spacings on the same <label> tag into multiple labelers:
        json.label.forEach(function(e) {
            var spacing = [];
            if (e.spacing !== undefined) {
                spacing = vF.typeOf(e.spacing) === 'array' ? e.spacing : [ e.spacing ];
            }
            spacing.forEach(function(s) {
                labelers.add( Labeler.parseJSON(e, axis, defaults, s) );
            });
        });
    } else {
        // Otherwise create labelers using the default spacing, with the other values
        // from the <labels> tag
        var defaultValues = (uF.getDefaultValuesFromXSD()).horizontalaxis.labels;
        var defaultSpacings = axis.type() === DataValue.NUMBER ?
                defaultValues.defaultNumberSpacing :
                defaultValues.defaultDatetimeSpacing;
        for (i = 0; i < defaultSpacings.length; ++i) {
            labelers.add(Labeler.parseJSON(json, axis, undefined, defaultSpacings[i]));
        }
    }
};


Axis.parseJSON = function (json, orientation, messageHandler, multigraph) {

    var DataValue = require('../../core/data_value.js'),
        Point = require('../../math/point.js'),
        RGBColor = require('../../math/rgb_color.js'),
        Displacement = require('../../math/displacement.js'),
        AxisTitle = require('../../core/axis_title.js'),
        Grid = require('../../core/grid.js'),
        Pan = require('../../core/pan.js'),
        Zoom = require('../../core/zoom.js'),
        AxisBinding = require('../../core/axis_binding.js'),

        axis              = new Axis(orientation),
        parseAttribute    = pF.parseAttribute,
        parseDisplacement = Displacement.parse,
        parseJSONPoint    = function(p) { return new Point(p[0], p[1]); },
        parseRGBColor     = RGBColor.parse,
        attr, child,
        value;

    if (json) {

        parseAttribute(json.id,     axis.id);
        parseAttribute(json.type,   axis.type,   DataValue.parseType);
        parseAttribute(json.length, axis.length, parseDisplacement);

        //
        // The following provides support for the deprecated "positionbase" axis attribute;
        // MUGL files should use the "base" attribute instead.  When we're ready to remove
        // support for the deprecated attribute, delete this block of code:
        //
        (function () {
            var positionbase = json.positionbase;
            if (positionbase) {
                messageHandler.warning('Use of deprecated axis attribute "positionbase"; use "base" attribute instead');
                if ((positionbase === "left") || (positionbase === "bottom")) {
                    axis.base(new Point(-1, -1));
                } else if (positionbase === "right") {
                    axis.base(new Point(1, -1));
                } else if (positionbase === "top") {
                    axis.base(new Point(-1, 1));
                }
            }
        }());
        //
        // End of code to delete when removing support for deprecated "positionbase"
        // attribute.
        //

        attr = json.position;
        if (attr !== undefined) {
            if (vF.typeOf(attr) === 'array') {
                axis.position(parseJSONPoint(attr));
            } else {
                // If position is not an array, and if it can be interpreted
                // as a number, construct the position point by interpreting that
                // number as an offset from the 0 location along the perpendicular
                // direction.
                if (vF.isNumberNotNaN(attr)) {
                    if (orientation === Axis.HORIZONTAL) {
                        axis.position(new Point(0, attr));
                    } else {
                        axis.position(new Point(attr, 0));
                    }
                } else {
                    throw new Error("axis position '"+attr+"' is of the wrong type; it should be a number or a point");
                }
            }
        }

        // Note: we coerce the min and max values to strings here, because the "min" and "max" attrs
        // of the Axis object require strings.  See the comments about these properties in src/core/axis.js
        // for a discussion of why this is the case.
        if ("min" in json) {
            axis.min(uF.coerceToString(json.min));
        }
        if (axis.min() !== "auto") {
            axis.dataMin(DataValue.parse(axis.type(), axis.min()));
        }
        if ("max" in json) {
            axis.max(uF.coerceToString(json.max));
        }
        if (axis.max() !== "auto") {
            axis.dataMax(DataValue.parse(axis.type(), axis.max()));
        }

        parseAttribute(json.pregap,         axis.pregap);
        parseAttribute(json.postgap,        axis.postgap);
        parseAttribute(json.anchor,         axis.anchor);
        parseAttribute(json.base,           axis.base,           parseJSONPoint);
        parseAttribute(json.minposition,    axis.minposition,    parseDisplacement);
        parseAttribute(json.maxposition,    axis.maxposition,    parseDisplacement);
        parseAttribute(json.minoffset,      axis.minoffset);
        parseAttribute(json.maxoffset,      axis.maxoffset);
        parseAttribute(json.color,          axis.color,          parseRGBColor);
        parseAttribute(json.tickcolor,      axis.tickcolor,      parseRGBColor);
        parseAttribute(json.tickwidth,      axis.tickwidth);
        parseAttribute(json.tickmin,        axis.tickmin);
        parseAttribute(json.tickmax,        axis.tickmax);
        parseAttribute(json.highlightstyle, axis.highlightstyle);
        parseAttribute(json.linewidth,      axis.linewidth);
        
        if ("title" in json) {
            if (typeof(json.title) === 'boolean') {
                if (json.title) {
                    axis.title(new AxisTitle(axis));
                    } else {
                        axis.title(AxisTitle.parseJSON({}, axis));
                    }
            } else {
                axis.title(AxisTitle.parseJSON(json.title, axis));
            }
        } else {
            axis.title(new AxisTitle(axis));
        }

        if (json.grid) {
            axis.grid(Grid.parseJSON(json.grid));
        }

        if (json.visible !== undefined) {
            axis.visible(json.visible);
        }

        if ("pan" in json) {
            axis.pan(Pan.parseJSON(json.pan, axis.type()));
        }

        if ("zoom" in json) {
            axis.zoom(Zoom.parseJSON(json.zoom, axis.type()));
        }

        if (json.labels) {
            parseLabels(json.labels, axis);
        }

        if (json.binding) {
            var bindingMinDataValue = DataValue.parse(axis.type(), json.binding.min),
                bindingMaxDataValue = DataValue.parse(axis.type(), json.binding.max);
            if (typeof(json.binding.id) !== "string") {
                throw new Error("invalid axis binding id: '" + json.binding.id + "'");
            }
            if (! DataValue.isInstance(bindingMinDataValue)) {
                throw new Error("invalid axis binding min: '" + json.binding.min + "'");
            }
            if (! DataValue.isInstance(bindingMaxDataValue)) {
                throw new Error("invalid axis binding max: '" + json.binding.max + "'");
            }
            AxisBinding.findByIdOrCreateNew(json.binding.id).addAxis(axis, bindingMinDataValue, bindingMaxDataValue, multigraph);
        }

    }
    return axis;
};

module.exports = Axis;
