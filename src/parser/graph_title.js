window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Title[parse] = function (xml, graph) {
            var title,
                parsePoint       = ns.math.Point.parse,
                parseRGBColor    = ns.math.RGBColor.parse,
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseInteger     = utilityFunctions.parseInteger;

            if (xml) {
                var text = xml.text();
                if (text !== "") {
                    title = new ns.core.Title(new ns.core.Text(text), graph);
                } else {
                    return undefined;
                }                
                parseAttribute(xml.attr("frame"),        title.frame,        function (value) { return value.toLowerCase(); });
                parseAttribute(xml.attr("border"),       title.border,       parseInteger);
                parseAttribute(xml.attr("color"),        title.color,        parseRGBColor);
                parseAttribute(xml.attr("bordercolor"),  title.bordercolor,  parseRGBColor);
                parseAttribute(xml.attr("opacity"),      title.opacity,      parseFloat);
                parseAttribute(xml.attr("padding"),      title.padding,      parseInteger);
                parseAttribute(xml.attr("cornerradius"), title.cornerradius, parseInteger);
                parseAttribute(xml.attr("anchor"),       title.anchor,       parsePoint);
                parseAttribute(xml.attr("base"),         title.base,         parsePoint);
                parseAttribute(xml.attr("position"),     title.position,     parsePoint);
            }
            return title;
        };

    });

});
