window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.AxisTitle[parse] = function (xml, axis) {
            var title = new ns.core.AxisTitle(axis),
                nonEmptyTitle = false,
                parsePoint = ns.math.Point.parse,
                text,
                parseTitleAttribute = function (value, attribute, preprocessor) {
                    if (ns.utilityFunctions.parseAttribute(value, attribute, preprocessor)) {
                        nonEmptyTitle = true;
                    }
                };

            if (xml) {
                text = xml.text();
                if (text !== "") {
                    title.content(new ns.core.Text(text));
                    nonEmptyTitle = true;
                }
                parseTitleAttribute(xml.attr("anchor"),   title.anchor,   parsePoint);
                parseTitleAttribute(xml.attr("base"),     title.base,     parseFloat);
                parseTitleAttribute(xml.attr("position"), title.position, parsePoint);
                parseTitleAttribute(xml.attr("angle"),    title.angle,    parseFloat);
            }

            if (nonEmptyTitle === true) { 
                return title;
            }
            return undefined;
        };
        
    });

});
