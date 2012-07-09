if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "base", "anchor", "position", "frame", "opacity", "border", "rows", "columns", "cornerradius", "padding"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Legend[parse] = function (xml) {
            var legend = new nsObj.Legend();
            if (xml) {
                legend.visible(xml.attr("visible"));
                legend.base(xml.attr("base"));
                legend.anchor(xml.attr("anchor"));
                legend.position(xml.attr("position"));
                legend.frame(xml.attr("frame"));
                legend.color(nsObj.math.RGBColor.parse(xml.attr("color")));
                legend.bordercolor(nsObj.math.RGBColor.parse(xml.attr("bordercolor")));
                legend.opacity(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("opacity")));
                legend.border(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));
                legend.rows(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("rows")));
                legend.columns(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("columns")));
                legend.cornerradius(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("cornerradius")));
                legend.padding(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("padding")));
                if (xml.find("icon").length > 0) {
                    legend.icon(nsObj.Legend.Icon[parse](xml.find("icon")));
                }
            }
            return legend;
        };

        nsObj.Legend.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<legend ',
                i;

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output +=  attributeStrings.join(' ');
            if (this.icon()) {
                output += '>' + this.icon()[serialize]() + '</legend>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
}(window.multigraph));
