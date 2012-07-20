if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["id", "type", "pregap", "postgap", "anchor", "min", "minoffset", "max", "maxoffset", "positionbase", "tickmin", "tickmax", "highlightstyle", "linewidth"],
        children = ["title", "labels", "grid", "pan", "zoom", "binding", "axiscontrols"];

    ns.jQueryXMLMixin.add(function(ns, parse, serialize) {
        
        ns.Axis[parse] = function(xml) {
            var orientation = $(xml).prop("tagName").toLowerCase().replace("axis", ""),
                axis = new ns.Axis(orientation),
                childModelNames = ["Title", "Labels", "Grid", "Pan", "Zoom", "Binding", "AxisControls"],
                i;

            if (xml) {
                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0) {
                        axis[children[i]](ns.Axis[childModelNames[i]][parse](xml.find(children[i])));
                    }
                }

                axis.id(xml.attr("id"));
                axis.type(xml.attr("type"));
                axis.length(ns.math.Displacement.parse(xml.attr("length")));
                if (xml.attr("position")) {
                    axis.position(ns.math.Point.parse(xml.attr("position")));
                }
                axis.pregap(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("pregap")));
                axis.postgap(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("postgap")));
                if (xml.attr("anchor")) {
                    axis.anchor(parseFloat(xml.attr("anchor")));
                }
                if (xml.attr("base")) {
                    axis.base(ns.math.Point.parse(xml.attr("base")));
                }
                axis.minposition(ns.math.Displacement.parse(xml.attr("minposition")));
                axis.maxposition(ns.math.Displacement.parse(xml.attr("maxposition")));
                axis.min(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("min")));
                axis.minoffset(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("minoffset")));
                axis.max(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("max")));
                axis.maxoffset(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("maxoffset")));
                axis.positionbase(xml.attr("positionbase"));
                axis.color(ns.math.RGBColor.parse(xml.attr("color")));
                axis.tickmin(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmin")));
                axis.tickmax(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmax")));
                axis.highlightstyle(xml.attr("highlightstyle"));
                axis.linewidth(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("linewidth")));
            }
            return axis;
        };
        
        ns.Axis.prototype[serialize] = function() {
            var attributeStrings = [],
                childStrings = [],
                output = '<' + this.orientation() + 'axis ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            attributeStrings.push('length="' + this.length().serialize() + '"');
            attributeStrings.push('position="' + this.position().serialize() + '"');
            attributeStrings.push('base="' + this.base().serialize() + '"');
            attributeStrings.push('minposition="' + this.minposition().serialize() + '"');
            attributeStrings.push('maxposition="' + this.maxposition().serialize() + '"');

            childStrings = ns.utilityFunctions.serializeChildModels(this, children, childStrings, serialize);

            output += attributeStrings.join(' ');

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</' + this.orientation() + 'axis>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
