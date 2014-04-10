window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Plotarea[parse] = function (xml) {
            var plotarea = new ns.core.Plotarea(),
                margin = plotarea.margin(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseInteger     = utilityFunctions.parseInteger,
                parseRGBColor    = ns.math.RGBColor.parse;
            if (xml) {
                parseAttribute(xml.attr("marginbottom"), margin.bottom,        parseInteger);
                parseAttribute(xml.attr("marginleft"),   margin.left,          parseInteger);
                parseAttribute(xml.attr("margintop"),    margin.top,           parseInteger);
                parseAttribute(xml.attr("marginright"),  margin.right,         parseInteger);
                parseAttribute(xml.attr("border"),       plotarea.border,      parseInteger);
                parseAttribute(xml.attr("color"),        plotarea.color,       parseRGBColor);
                parseAttribute(xml.attr("bordercolor"),  plotarea.bordercolor, parseRGBColor);
            }
            return plotarea;
        };
        
    });

});
