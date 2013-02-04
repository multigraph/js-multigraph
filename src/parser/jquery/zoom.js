window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Zoom[parse] = function (xml, type) {
            var zoom = new ns.core.Zoom(),
                allowed;
            if (xml) {
                allowed = xml.attr("allowed");
                if (allowed !== undefined) {
                    zoom.allowed(ns.utilityFunctions.parseBoolean(allowed));
                }
                if (xml.attr("min") !== undefined) {
                    zoom.min( window.multigraph.core.DataMeasure.parse(type, xml.attr("min")) );
                }
                if (xml.attr("max") !== undefined) {
                    zoom.max( window.multigraph.core.DataMeasure.parse(type, xml.attr("max")) );
                }
                if (xml.attr("anchor") !== undefined) {
                    if (xml.attr("anchor").toLowerCase() === "none") {
                        zoom.anchor(null);
                    } else {
                        zoom.anchor( window.multigraph.core.DataValue.parse(type, xml.attr("anchor")) );
                    }
                }
            }
            return zoom;
        };
        
    });

});
