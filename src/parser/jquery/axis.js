window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {


        var parseLabels = function (xml, axis) {
            var spacingStrings = [],
                labelers = axis.labelers(),
                i,
                j;
            if (window.multigraph.jQuery.trim(xml.find("labels").attr("spacing"))!=="") {
                spacingStrings = window.multigraph.jQuery.trim(xml.find("labels").attr("spacing")).split(/\s+/);
            }
            if (spacingStrings.length > 0) {
                // If there was a spacing attr on the <labels> tag, create a new labeler for
                // each spacing present in it, using the other values from the <labels> tag
                for (i=0; i<spacingStrings.length; ++i) {
                    //labelers.push(ns.core.Labeler[parse](xml.find("labels"), axis, undefined, spacingStrings[i]));
                    labelers.add(ns.core.Labeler[parse](xml.find("labels"), axis, undefined, spacingStrings[i]));
                }
            } else {
                // Otherwise, parse the <labels> tag to get default values
                var defaults = ns.core.Labeler[parse](xml.find("labels"), axis, undefined, null);
                // And loop over each <label> tag, creating labelers for each, splitting multiple
                // spacings on the same <label> tag into multiple labelers:
                window.multigraph.jQuery.each(xml.find("label"), function (j, e) {
                    spacingStrings = [];
                    if (window.multigraph.jQuery.trim(window.multigraph.jQuery(e).attr("spacing"))!=="") {
                        spacingStrings = window.multigraph.jQuery.trim(window.multigraph.jQuery(e).attr("spacing")).split(/\s+/);
                    }
                    for (i=0; i<spacingStrings.length; ++i) {
                        //labelers.push( ns.core.Labeler[parse](window.multigraph.jQuery(e), axis, defaults, spacingStrings[i]) );
                        labelers.add( ns.core.Labeler[parse](window.multigraph.jQuery(e), axis, defaults, spacingStrings[i]) );
                    }
                });
            }
        };

        
        ns.core.Axis[parse] = function (xml, orientation, messageHandler) {

            var axis = new ns.core.Axis(orientation),
                i,
                j,
                value;

            if (xml) {

                axis.id(xml.attr("id"));
                if (xml.attr("type")) {
                    axis.type(ns.core.DataValue.parseType(xml.attr("type")));
                }
                axis.length(window.multigraph.math.Displacement.parse(xml.attr("length")));

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
                            axis.base(window.multigraph.math.Point.parse("-1 -1"));
                        } else if (positionbase === "right") {
                            axis.base(window.multigraph.math.Point.parse("1 -1"));
                        } else if (positionbase === "top") {
                            axis.base(window.multigraph.math.Point.parse("-1 1"));
                        }
                    }
                }());
                //
                // End of code to delete when removing support for deprecated "positionbase"
                // attribute.
                //

                if (xml.attr("position")) {
                    try {
                        axis.position(window.multigraph.math.Point.parse(xml.attr("position")));
                    } catch (e) {
                        // If position did not parse as a Point, and if it can be interpreted
                        // as a number, construct the position point by interpreting that
                        // number as an offset from the 0 location along the perpendicular
                        // direction.
                        value = parseInt(xml.attr("position"),10);
                        if (value !== value) { // test for isNaN
                            throw e;
                        }
                        if (orientation === ns.core.Axis.HORIZONTAL) {
                            axis.position(new window.multigraph.math.Point(0, value));
                        } else {
                            axis.position(new window.multigraph.math.Point(value, 0));
                        }
                    }
                }
                if (xml.attr("pregap") !== undefined) {
                    axis.pregap(parseFloat(xml.attr("pregap")));
                }
                if (xml.attr("postgap") !== undefined) {
                    axis.postgap(parseFloat(xml.attr("postgap")));
                }
                if (xml.attr("anchor")) {
                    axis.anchor(parseFloat(xml.attr("anchor")));
                }
                if (xml.attr("base")) {
                    axis.base(window.multigraph.math.Point.parse(xml.attr("base")));
                }
                if (xml.attr("minposition") !== undefined) {
                    axis.minposition(window.multigraph.math.Displacement.parse(xml.attr("minposition")));
                }
                if (xml.attr("maxposition") !== undefined) {
                    axis.maxposition(window.multigraph.math.Displacement.parse(xml.attr("maxposition")));
                }
                axis.min(xml.attr("min"));
                if (axis.min() !== "auto") {
                    axis.dataMin(ns.core.DataValue.parse(axis.type(), axis.min()));
                }
                if (xml.attr("minoffset") !== undefined) {
                    axis.minoffset(parseFloat(xml.attr("minoffset")));
                }
                axis.max(xml.attr("max"));
                if (axis.max() !== "auto") {
                    axis.dataMax(ns.core.DataValue.parse(axis.type(), axis.max()));
                }
                if (xml.attr("maxoffset") !== undefined) {
                    axis.maxoffset(parseFloat(xml.attr("maxoffset")));
                }
                axis.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                if (xml.attr("tickcolor")) {
                    axis.tickcolor(window.multigraph.math.RGBColor.parse(xml.attr("tickcolor")));
                }
                if (xml.attr("tickmin") !== undefined) {
                    axis.tickmin(parseInt(xml.attr("tickmin"), 10));
                }
                if (xml.attr("tickmax") !== undefined) {
                    axis.tickmax(parseInt(xml.attr("tickmax"), 10));
                }
                axis.highlightstyle(xml.attr("highlightstyle"));
                if (xml.attr("linewidth") !== undefined) {
                    axis.linewidth(parseInt(xml.attr("linewidth"), 10));
                }

                if (xml.find("title").length > 0)        { axis.title(ns.core.AxisTitle[parse](xml.find("title"), axis));            }
                if (xml.find("grid").length > 0)         { axis.grid(ns.core.Grid[parse](xml.find("grid")));                         }
                if (xml.find("pan").length > 0)          { axis.pan(ns.core.Pan[parse](xml.find("pan"), axis.type()));               }
                if (xml.find("zoom").length > 0)         { axis.zoom(ns.core.Zoom[parse](xml.find("zoom"), axis.type()));            }
                if (xml.find("labels").length > 0)       { parseLabels(xml, axis);                                                   }

                if (xml.find("binding").length > 0) {
                    var bindingIdAttr = xml.find("binding").attr("id");
                    var bindingMinAttr = xml.find("binding").attr("min");
                    var bindingMaxAttr = xml.find("binding").attr("max");
                    var bindingMinDataValue = ns.core.DataValue.parse(axis.type(), bindingMinAttr);
                    var bindingMaxDataValue = ns.core.DataValue.parse(axis.type(), bindingMaxAttr);
                    if (typeof(bindingIdAttr) !== "string" || bindingIdAttr.length <= 0) {
                        throw new Error("invalid axis binding id: '" + bindingIdAttr + "'");
                    }
                    if (! ns.core.DataValue.isInstance(bindingMinDataValue)) {
                        throw new Error("invalid axis binding min: '" + bindingMinAttr + "'");
                    }
                    if (! ns.core.DataValue.isInstance(bindingMaxDataValue)) {
                        throw new Error("invalid axis binding max: '" + bindingMaxAttr + "'");
                    }
                    ns.core.AxisBinding.findByIdOrCreateNew(bindingIdAttr).addAxis(axis, bindingMinDataValue, bindingMaxDataValue);
                }

            }
            return axis;
        };

    });

});
