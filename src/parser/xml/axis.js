// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.

//  <horizontalaxis id="STRING" type="DATATYPE(number)" length="RELLEN(1.0)" base="POINT(-1,1)" anchor="DOUBLE(-1)" position="POINT(0,0)"
//      min="DATAVALUEORAUTO(auto)" max="DATAVALUEORAUTO(auto)" minposition="RELPOS(-1.0)" maxposition="RELPOS(1.0)" color="COLOR(black)" linewidth="INTEGER(1)"
//      tickmin="INTEGER(-3)" tickmax="INTEGER(3)" tickcolor="COLOR(black)">
//    <labels format="STRING" start="DATAVALUE(0)" angle="DOUBLE(0)" position="POINT" anchor="POINT" color="COLOR(black)" spacing="STRING" densityfactor="DOUBLE(1.0)">
//        <label format="STRING" start="STRING" angle="DOUBLE" position="POINT" anchor="POINT" spacing="STRING" densityfactor="DOUBLE">
//        <label format="STRING" start="STRING" angle="DOUBLE" position="POINT" anchor="POINT" spacing="STRING" densityfactor="DOUBLE">
//      </label>
//    </labels>
//    <title base="DOUBLE(0)" anchor="POINT" position="POINT" angle="DOUBLE(0)">TITLETEXT</title>
//    <grid color="COLOR(0xeeeeee)" visible="BOOLEAN(false)" />
//    <pan allowed="BOOLEAN(yes)" min="DATAVALUE" max="DATAVALUE" />
//    <zoom allowed="BOOLEAN(yes)" min="DATAMEASURE" max="DATAMEASURE" anchor="DATAVALUE" />
//    <binding id="STRING!" min="DATAVALUE!" max="DATAVALUE!" />
//  </horizontalaxis>

module.exports = function($) {
    var Axis = require('../../core/axis.js'),
        pF = require('../../util/parsingFunctions.js');

    // if parseXML method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Axis.parseXML)==="function") { return Axis; };

    var parseLabels = function (xml, axis) {
        var spacingStrings = [],
            spacingString,
            labelsTag = xml.find("labels"),
            labelTags = xml.find("label"),
            labelers  = axis.labelers(),
            Labeler = require('../../core/labeler.js'),
            DataValue = require('../../core/data_value.js'),
            utilityFunctions = require('../../util/utilityFunctions.js'),
            i;
        spacingString = $.trim(pF.getXMLAttr(labelsTag,"spacing"));
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
                spacingString = $.trim(pF.getXMLAttr($(e), "spacing"));
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
            parseInteger      = pF.parseInteger,
            parseDisplacement = Displacement.parse,
            parsePoint        = Point.parse,
            parseRGBColor     = RGBColor.parse,
            attr, child,
            value;

        if (xml) {

            parseAttribute(pF.getXMLAttr(xml, "id"),     axis.id);
            parseAttribute(pF.getXMLAttr(xml, "type"),   axis.type,   DataValue.parseType);
            parseAttribute(pF.getXMLAttr(xml, "length"), axis.length, parseDisplacement);

            //
            // The following provides support for the deprecated "positionbase" axis attribute;
            // MUGL files should use the "base" attribute instead.  When we're ready to remove
            // support for the deprecated attribute, delete this block of code:
            //
            (function () {
                var positionbase = pF.getXMLAttr(xml, "positionbase");
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

            attr = pF.getXMLAttr(xml, "position");
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

            axis.min(pF.getXMLAttr(xml, "min"));
            if (axis.min() !== "auto") {
                axis.dataMin(DataValue.parse(axis.type(), axis.min()));
            }
            axis.max(pF.getXMLAttr(xml, "max"));
            if (axis.max() !== "auto") {
                axis.dataMax(DataValue.parse(axis.type(), axis.max()));
            }

            parseAttribute(pF.getXMLAttr(xml, "pregap"),         axis.pregap,         parseFloat);
            parseAttribute(pF.getXMLAttr(xml, "postgap"),        axis.postgap,        parseFloat);
            parseAttribute(pF.getXMLAttr(xml, "anchor"),         axis.anchor,         parseFloat);
            parseAttribute(pF.getXMLAttr(xml, "base"),           axis.base,           parsePoint);
            parseAttribute(pF.getXMLAttr(xml, "minposition"),    axis.minposition,    parseDisplacement);
            parseAttribute(pF.getXMLAttr(xml, "maxposition"),    axis.maxposition,    parseDisplacement);
            parseAttribute(pF.getXMLAttr(xml, "minoffset"),      axis.minoffset,      parseFloat);
            parseAttribute(pF.getXMLAttr(xml, "maxoffset"),      axis.maxoffset,      parseFloat);
            parseAttribute(pF.getXMLAttr(xml, "color"),          axis.color,          parseRGBColor);
            parseAttribute(pF.getXMLAttr(xml, "tickcolor"),      axis.tickcolor,      parseRGBColor);
            parseAttribute(pF.getXMLAttr(xml, "tickwidth"),      axis.tickwidth,      parseInteger);
            parseAttribute(pF.getXMLAttr(xml, "tickmin"),        axis.tickmin,        parseInteger);
            parseAttribute(pF.getXMLAttr(xml, "tickmax"),        axis.tickmax,        parseInteger);
            parseAttribute(pF.getXMLAttr(xml, "highlightstyle"), axis.highlightstyle);
            parseAttribute(pF.getXMLAttr(xml, "linewidth"),      axis.linewidth,      parseInteger);
            
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
                var bindingIdAttr  = pF.getXMLAttr(child,"id"),
                    bindingMinAttr = pF.getXMLAttr(child,"min"),
                    bindingMaxAttr = pF.getXMLAttr(child,"max"),
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
