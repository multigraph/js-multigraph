window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Zoom[parse] = function (xml, type) {
            var core = ns.core,
                zoom = new core.Zoom(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseDataMeasure = utilityFunctions.parseDataMeasure,
                attr;
            if (xml) {
                parseAttribute(xml.attr("allowed"), zoom.allowed, utilityFunctions.parseBoolean);
                parseAttribute(xml.attr("min"),     zoom.min,     parseDataMeasure(type));
                parseAttribute(xml.attr("max"),     zoom.max,     parseDataMeasure(type));
                attr = xml.attr("anchor");
                if (attr !== undefined) {
                    if (attr.toLowerCase() === "none") {
                        zoom.anchor(null);
                    } else {
                        zoom.anchor( core.DataValue.parse(type, attr) );
                    }
                }
            }
            return zoom;
        };
        
    });

});
