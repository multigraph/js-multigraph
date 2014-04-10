window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Legend[parse] = function (xml) {
            var legend = new ns.core.Legend(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseInteger     = utilityFunctions.parseInteger,
                parsePoint       = ns.math.Point.parse,
                parseRGBColor    = ns.math.RGBColor.parse,
                child;
            if (xml) {
                
                parseAttribute(xml.attr("visible"),      legend.visible,      utilityFunctions.parseBoolean);
                parseAttribute(xml.attr("base"),         legend.base,         parsePoint);
                parseAttribute(xml.attr("anchor"),       legend.anchor,       parsePoint);
                parseAttribute(xml.attr("position"),     legend.position,     parsePoint);
                parseAttribute(xml.attr("frame"),        legend.frame,        utilityFunctions.parseString);
                parseAttribute(xml.attr("color"),        legend.color,        parseRGBColor);
                parseAttribute(xml.attr("bordercolor"),  legend.bordercolor,  parseRGBColor);
                parseAttribute(xml.attr("opacity"),      legend.opacity,      parseFloat);
                parseAttribute(xml.attr("border"),       legend.border,       parseInteger);
                parseAttribute(xml.attr("rows"),         legend.rows,         parseInteger);
                parseAttribute(xml.attr("columns"),      legend.columns,      parseInteger);
                parseAttribute(xml.attr("cornerradius"), legend.cornerradius, parseInteger);
                parseAttribute(xml.attr("padding"),      legend.padding,      parseInteger);

                child = xml.find("icon");
                if (child.length > 0) {
                    legend.icon(ns.core.Icon[parse](child));
                }
            }
            return legend;
        };

    });

});
