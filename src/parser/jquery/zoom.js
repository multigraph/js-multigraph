window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Zoom[parse] = function (xml, type) {
            var core = ns.core,
                zoom = new core.Zoom(),
                DataMeasure = core.DataMeasure,
                attr;
            if (xml) {
                attr = xml.attr("allowed");
                if (attr !== undefined) {
                    zoom.allowed(ns.utilityFunctions.parseBoolean(attr));
                }
                attr = xml.attr("min");
                if (attr !== undefined) {
                    zoom.min( DataMeasure.parse(type, attr) );
                }
                attr = xml.attr("max");
                if (attr !== undefined) {
                    zoom.max( DataMeasure.parse(type, attr) );
                }
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
