window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Legend[parse] = function (xml) {
            var legend = new ns.core.Legend(),
                Point    = ns.math.Point,
                RGBColor = ns.math.RGBColor,
                attr;
            if (xml) {
                
                attr = xml.attr("visible");
                if (attr !== undefined) {
                    legend.visible(ns.utilityFunctions.parseBoolean(attr));
                }
                attr = xml.attr("base");
                if (attr !== undefined) {
                    legend.base(Point.parse(attr));
                }
                attr = xml.attr("anchor");
                if (attr !== undefined) {
                    legend.anchor(Point.parse(attr));
                }
                attr = xml.attr("position");
                if (attr !== undefined) {
                    legend.position(Point.parse(attr));
                }
                attr = xml.attr("frame");
                if (attr !== undefined) {
                    legend.frame(attr);
                }
                attr = xml.attr("color");
                if (attr !== undefined) {
                    legend.color(RGBColor.parse(attr));
                }
                attr = xml.attr("bordercolor");
                if (attr !== undefined) {
                    legend.bordercolor(RGBColor.parse(attr));
                }
                attr = xml.attr("opacity");
                if (attr !== undefined) {
                    legend.opacity(parseFloat(attr));
                }
                attr = xml.attr("border");
                if (attr !== undefined) {
                    legend.border(parseInt(attr, 10));
                }
                attr = xml.attr("rows");
                if (attr !== undefined) {
                    legend.rows(parseInt(attr, 10));
                }
                attr = xml.attr("columns");
                if (attr !== undefined) {
                    legend.columns(parseInt(attr, 10));
                }
                attr = xml.attr("cornerradius");
                if (attr !== undefined) {
                    legend.cornerradius(parseInt(attr, 10));
                }
                attr = xml.attr("padding");
                if (attr !== undefined) {
                    legend.padding(parseInt(attr, 10));
                }
                attr = xml.find("icon");
                if (attr.length > 0) {
                    legend.icon(ns.core.Icon[parse](attr));
                }
            }
            return legend;
        };

    });

});
