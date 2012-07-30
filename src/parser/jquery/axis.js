window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["id", "type", "pregap", "postgap", "anchor", "min", "minoffset", "max", "maxoffset", "positionbase", "tickmin", "tickmax", "highlightstyle", "linewidth"],
        children = ["title", "labels", "grid", "pan", "zoom", "binding", "axiscontrols"];

    ns.mixin.add(function(ns, parse, serialize) {
        
        ns.core.Axis[parse] = function(xml) {
            var orientation = $(xml).prop("tagName").toLowerCase().replace("axis", ""),
                axis = new ns.core.Axis(orientation),
                childModelNames = ["AxisTitle", "Labels", "Grid", "Pan", "Zoom", "Binding", "AxisControls"],
                i;

            if (xml) {

                axis.id(xml.attr("id"));
                if (xml.attr("type")) {
                    axis.type(ns.core.DataValue.parseType(xml.attr("type")));
                }
                axis.length(window.multigraph.math.Displacement.parse(xml.attr("length")));
                if (xml.attr("position")) {
                    axis.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
                axis.pregap(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("pregap")));
                axis.postgap(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("postgap")));
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
                axis.minoffset(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("minoffset")));
                axis.max(xml.attr("max"));
                if (axis.max() !== "auto") {
                    axis.dataMax(ns.core.DataValue.parse(axis.type(), axis.max()));
                }
                axis.maxoffset(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("maxoffset")));
                axis.positionbase(xml.attr("positionbase"));
                axis.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                axis.tickmin(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmin")));
                axis.tickmax(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmax")));
                axis.highlightstyle(xml.attr("highlightstyle"));
                axis.linewidth(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("linewidth")));

                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0 && children[i] !== "labels") {
                        axis[children[i]](ns.core[childModelNames[i]][parse](xml.find(children[i])));
                    }
                }

                axis.labels(ns.core.Labels[parse](xml.find(">labels"), axis));

            }
            return axis;
        };
        
        ns.core.Axis.prototype[serialize] = function() {
            var attributeStrings = [],
                childStrings = [],
                output = '<' + this.orientation() + 'axis ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            attributeStrings.push('length="' + this.length().serialize() + '"');
            attributeStrings.push('position="' + this.position().serialize() + '"');
            attributeStrings.push('base="' + this.base().serialize() + '"');
            attributeStrings.push('minposition="' + this.minposition().serialize() + '"');
            attributeStrings.push('maxposition="' + this.maxposition().serialize() + '"');

            childStrings = window.multigraph.utilityFunctions.serializeChildModels(this, children, childStrings, serialize);

            output += attributeStrings.join(' ');

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</' + this.orientation() + 'axis>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
