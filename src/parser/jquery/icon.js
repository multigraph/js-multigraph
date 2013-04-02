window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Icon[parse] = function (xml) {
            var icon = new ns.core.Icon(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseInteger     = utilityFunctions.parseInteger;
            if (xml) {
                parseAttribute(xml.attr("height"), icon.height, parseInteger);
                parseAttribute(xml.attr("width"),  icon.width,  parseInteger);
                parseAttribute(xml.attr("border"), icon.border, parseInteger);
            }
            return icon;
        };
        
    });

});
