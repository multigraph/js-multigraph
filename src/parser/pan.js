window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Pan[parse] = function (xml, type) {
            var pan = new ns.core.Pan(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseDataValue   = utilityFunctions.parseDataValue;
            if (xml) {
                parseAttribute(xml.attr("allowed"), pan.allowed, utilityFunctions.parseBoolean);
                parseAttribute(xml.attr("min"),     pan.min,     parseDataValue(type));
                parseAttribute(xml.attr("max"),     pan.max,     parseDataValue(type));
            }
            return pan;
        };
        
    });

});
