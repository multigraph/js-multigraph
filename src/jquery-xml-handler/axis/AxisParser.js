if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["id", "type", "position", "pregap", "postgap", "anchor", "base", "min", "minoffset", "minposition", "max", "maxoffset", "maxposition", "positionbase", "tickmin", "tickmax", "highlightstyle", "linewidth"],
        children = ["title", "labels", "grid", "pan", "zoom", "binding", "axiscontrols"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Axis[parse] = function(xml) {
            var orientation = $(xml).prop("tagName").toLowerCase().replace("axis", ""),
                axis = new nsObj.Axis(orientation),
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
                axis.length(nsObj.math.Displacement.parse(xml.attr("length")));
                axis.position(xml.attr("position"));
                axis.pregap(xml.attr("pregap"));
                axis.postgap(xml.attr("postgap"));
                axis.anchor(xml.attr("anchor"));
                axis.base(xml.attr("base"));
                axis.min(xml.attr("min"));
                axis.minoffset(xml.attr("minoffset"));
                axis.minposition(xml.attr("minposition"));
                axis.max(xml.attr("max"));
                axis.maxoffset(xml.attr("maxoffset"));
                axis.maxposition(xml.attr("maxposition"));
                axis.positionbase(xml.attr("positionbase"));
                axis.color(nsObj.math.RGBColor.parse(xml.attr("color")));
                axis.tickmin(nsObj.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmin")));
                axis.tickmax(nsObj.utilityFunctions.parseIntegerOrUndefined(xml.attr("tickmax")));
                axis.highlightstyle(xml.attr("highlightstyle"));
                axis.linewidth(nsObj.utilityFunctions.parseIntegerOrUndefined(xml.attr("linewidth")));
            }
            return axis;
        };
        
        nsObj.Axis.prototype[serialize] = function() {
            var attributeStrings = [],
                childStrings = [],
                output = '<' + this.orientation() + 'axis ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            attributeStrings.push('length="' + this.length().serialize() + '"')

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
