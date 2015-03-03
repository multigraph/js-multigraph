// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Axis = require('../core/axis.js');

    var parseLabels = function (xml, axis) {
        var spacingStrings = [],
            spacingString,
            labelsTag = xml.find("labels"),
            labelTags = xml.find("label"),
            labelers  = axis.labelers(),
            Labeler = require('../core/labeler.js'),
            DataValue = require('../core/data_value.js'),
            utilityFunctions = require('../util/utilityFunctions.js'),
            i;
        spacingString = $.trim(labelsTag.attr("spacing"));
        if (spacingString !== "") {
            spacingStrings = spacingString.split(/\s+/);
        }
        if (spacingStrings.length > 0) {
            // If there was a spacing attr on the <labels> tag, create a new labeler for
            // each spacing present in it, using the other values from the <labels> tag
            for (i = 0; i < spacingStrings.length; ++i) {
                labelers.add(Labeler.parseXML(labelsTag, axis, undefined, spacingStrings[i]));
            }
        } else if (labelTags.length > 0) {
            // If there are <label> tags, parse the <labels> tag to get default values
            var defaults = Labeler.parseXML(labelsTag, axis, undefined, null);
            // And loop over each <label> tag, creating labelers for each, splitting multiple
            // spacings on the same <label> tag into multiple labelers:
            $.each(labelTags, function (j, e) {
                spacingString = $.trim($(e).attr("spacing"));
                spacingStrings = [];
                if (spacingString !== "") {
                    spacingStrings = spacingString.split(/\s+/);
                }
                for (i = 0; i < spacingStrings.length; ++i) {
                    labelers.add( Labeler.parseXML($(e), axis, defaults, spacingStrings[i]) );
                }
            });
        } else {
            // Otherwise create labelers using the default spacing, with the other values
            // from the <labels> tag
            var defaultValues = (utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels;
            spacingString = axis.type() === DataValue.NUMBER ?
                defaultValues.defaultNumberSpacing :
                defaultValues.defaultDatetimeSpacing;
            spacingStrings = spacingString.split(/\s+/);
            for (i = 0; i < spacingStrings.length; ++i) {
                labelers.add(Labeler.parseXML(labelsTag, axis, undefined, spacingStrings[i]));
            }
        }
    };

    
    Axis.parseXML = function (xml, orientation, messageHandler, multigraph) {

        var DataValue = require('../core/data_value.js'),
            Point = require('../math/point.js'),
            RGBColor = require('../math/rgb_color.js'),
            Displacement = require('../math/displacement.js'),
            AxisTitle = require('../core/axis_title.js'),
            Grid = require('../core/grid.js'),
            Pan = require('../core/pan.js'),
            Zoom = require('../core/zoom.js'),
            AxisBinding = require('../core/axis_binding.js'),
            parsingFunctions = require('../util/parsingFunctions.js'),

            axis              = new Axis(orientation),
            parseAttribute    = parsingFunctions.parseAttribute,
            parseInteger      = parsingFunctions.parseInteger,
            parseString       = parsingFunctions.parseString,
            parseDisplacement = Displacement.parse,
            parsePoint        = Point.parse,
            parseRGBColor     = RGBColor.parse,
            attr, child,
            value;

        if (xml) {

            parseAttribute(xml.attr("id"),     axis.id,     parseString);
            parseAttribute(xml.attr("type"),   axis.type,   DataValue.parseType);
            parseAttribute(xml.attr("length"), axis.length, parseDisplacement);

            //
            // The following provides support for the deprecated "positionbase" axis attribute;
            // MUGL files should use the "base" attribute instead.  When we're ready to remove
            // support for the deprecated attribute, delete this block of code:
            //
            (function () {
                var positionbase = xml.attr("positionbase");
                if (positionbase) {
                    messageHandler.warning('Use of deprecated axis attribute "positionbase"; use "base" attribute instead');
                    if ((positionbase === "left") || (positionbase === "bottom")) {
                        axis.base(parsePoint("-1 -1"));
                    } else if (positionbase === "right") {
                        axis.base(parsePoint("1 -1"));
                    } else if (positionbase === "top") {
                        axis.base(parsePoint("-1 1"));
                    }
                }
            }());
            //
            // End of code to delete when removing support for deprecated "positionbase"
            // attribute.
            //

            attr = xml.attr("position");
            if (attr !== undefined) {
                try {
                    axis.position(parsePoint(attr));
                } catch (e) {
                    // If position did not parse as a Point, and if it can be interpreted
                    // as a number, construct the position point by interpreting that
                    // number as an offset from the 0 location along the perpendicular
                    // direction.
                    value = parseInt(attr, 10);
                    if (value !== value) { // test for isNaN
                        throw e;
                    }
                    if (orientation === Axis.HORIZONTAL) {
                        axis.position(new Point(0, value));
                    } else {
                        axis.position(new Point(value, 0));
                    }
                }
            }

            axis.min(xml.attr("min"));
            if (axis.min() !== "auto") {
                axis.dataMin(DataValue.parse(axis.type(), axis.min()));
            }
            axis.max(xml.attr("max"));
            if (axis.max() !== "auto") {
                axis.dataMax(DataValue.parse(axis.type(), axis.max()));
            }

            parseAttribute(xml.attr("pregap"),         axis.pregap,         parseFloat);
            parseAttribute(xml.attr("postgap"),        axis.postgap,        parseFloat);
            parseAttribute(xml.attr("anchor"),         axis.anchor,         parseFloat);
            parseAttribute(xml.attr("base"),           axis.base,           parsePoint);
            parseAttribute(xml.attr("minposition"),    axis.minposition,    parseDisplacement);
            parseAttribute(xml.attr("maxposition"),    axis.maxposition,    parseDisplacement);
            parseAttribute(xml.attr("minoffset"),      axis.minoffset,      parseFloat);
            parseAttribute(xml.attr("maxoffset"),      axis.maxoffset,      parseFloat);
            parseAttribute(xml.attr("color"),          axis.color,          parseRGBColor);
            parseAttribute(xml.attr("tickcolor"),      axis.tickcolor,      parseRGBColor);
            parseAttribute(xml.attr("tickwidth"),      axis.tickwidth,      parseInteger);
            parseAttribute(xml.attr("tickmin"),        axis.tickmin,        parseInteger);
            parseAttribute(xml.attr("tickmax"),        axis.tickmax,        parseInteger);
            parseAttribute(xml.attr("highlightstyle"), axis.highlightstyle, parseString);
            parseAttribute(xml.attr("linewidth"),      axis.linewidth,      parseInteger);
            
            child = xml.find("title");
            if (child.length > 0)                    { axis.title(AxisTitle.parseXML(child, axis));     }
            else                                     { axis.title(new AxisTitle(axis));               }
            child = xml.find("grid");
            if (child.length > 0)                    { axis.grid(Grid.parseXML(child));                 }
            child = xml.find("pan");
            if (child.length > 0)                    { axis.pan(Pan.parseXML(child, axis.type()));      }
            child = xml.find("zoom");
            if (child.length > 0)                    { axis.zoom(Zoom.parseXML(child, axis.type()));    }
            if (xml.find("labels").length > 0)       { parseLabels(xml, axis);                             }

            child = xml.find("binding");
            if (child.length > 0) {
                var bindingIdAttr  = child.attr("id"),
                    bindingMinAttr = child.attr("min"),
                    bindingMaxAttr = child.attr("max"),
                    bindingMinDataValue = DataValue.parse(axis.type(), bindingMinAttr),
                    bindingMaxDataValue = DataValue.parse(axis.type(), bindingMaxAttr);
                if (typeof(bindingIdAttr) !== "string" || bindingIdAttr.length <= 0) {
                    throw new Error("invalid axis binding id: '" + bindingIdAttr + "'");
                }
                if (! DataValue.isInstance(bindingMinDataValue)) {
                    throw new Error("invalid axis binding min: '" + bindingMinAttr + "'");
                }
                if (! DataValue.isInstance(bindingMaxDataValue)) {
                    throw new Error("invalid axis binding max: '" + bindingMaxAttr + "'");
                }
                AxisBinding.findByIdOrCreateNew(bindingIdAttr).addAxis(axis, bindingMinDataValue, bindingMaxDataValue, multigraph);
            }

        }
        return axis;
    };

    return Axis;
};
