window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "frame", "opacity", "border", "rows", "columns", "cornerradius", "padding"];

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Legend[parse] = function (xml) {
            var legend = new ns.core.Legend();
            if (xml) {
                
                if (xml.attr("visible") !== undefined) {
                    if (xml.attr("visible").toLowerCase() === "true") {
                        legend.visible(true);
                    } else if (xml.attr("visible").toLowerCase() === "false") {
                        legend.visible(false);
                    } else {
                        legend.visible(xml.attr("visible"));
                    }
                }
                if (xml.attr("base") !== undefined) {
                    legend.base(window.multigraph.math.Point.parse(xml.attr("base")));
                }
                if (xml.attr("anchor") !== undefined) {
                    legend.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("position") !== undefined) {
                    legend.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
                legend.frame(xml.attr("frame"));
                legend.color(ns.math.RGBColor.parse(xml.attr("color")));
                legend.bordercolor(ns.math.RGBColor.parse(xml.attr("bordercolor")));
                if (xml.attr("opacity") !== undefined) {
                    legend.opacity(parseFloat(xml.attr("opacity")));
                }
                if (xml.attr("border") !== undefined) {
                    legend.border(parseInt(xml.attr("border"), 10));
                }
                if (xml.attr("rows") !== undefined) {
                    legend.rows(parseInt(xml.attr("rows"), 10));
                }
                if (xml.attr("columns") !== undefined) {
                    legend.columns(parseInt(xml.attr("columns"), 10));
                }
                if (xml.attr("cornerradius") !== undefined) {
                    legend.cornerradius(parseInt(xml.attr("cornerradius"), 10));
                }
                if (xml.attr("padding") !== undefined) {
                    legend.padding(parseInt(xml.attr("padding"), 10));
                }
                if (xml.find("icon").length > 0) {
                    legend.icon(ns.core.Icon[parse](xml.find("icon")));
                } else {
                    legend.icon(ns.core.Icon[parse]());
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

            if (this.base() !== undefined) {
                attributeStrings.push('base="' + this.base().serialize() + '"');
            }

            if (this.anchor() !== undefined) {
                attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            }

            if (this.position() !== undefined) {
                attributeStrings.push('position="' + this.position().serialize() + '"');
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
