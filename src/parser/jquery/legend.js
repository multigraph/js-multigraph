window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "base", "anchor", "position", "frame", "opacity", "border", "rows", "columns", "cornerradius", "padding"];

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Legend[parse] = function (xml) {
            var legend = new ns.core.Legend();
            if (xml) {
                legend.visible(xml.attr("visible"));
                legend.base(xml.attr("base"));
                legend.anchor(xml.attr("anchor"));
                legend.position(xml.attr("position"));
                legend.frame(xml.attr("frame"));
                legend.color(ns.math.RGBColor.parse(xml.attr("color")));
                legend.bordercolor(ns.math.RGBColor.parse(xml.attr("bordercolor")));
                legend.opacity(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("opacity")));
                legend.border(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));
                legend.rows(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("rows")));
                legend.columns(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("columns")));
                legend.cornerradius(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("cornerradius")));
                legend.padding(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("padding")));
                if (xml.find("icon").length > 0) {
                    legend.icon(ns.core.Icon[parse](xml.find("icon")));
                }
            }
            return legend;
        };

        ns.core.Legend.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<legend ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output +=  attributeStrings.join(' ');
            if (this.icon()) {
                output += '>' + this.icon()[serialize]() + '</legend>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
});
