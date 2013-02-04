window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Pan[parse] = function (xml, type) {
            var pan = new ns.core.Pan(),
                allowed;
            if (xml) {
                allowed = xml.attr("allowed");
                if (allowed !== undefined) {
                    pan.allowed(ns.utilityFunctions.parseBoolean(allowed));
                }
                if (xml.attr("min") !== undefined) {
                    pan.min( window.multigraph.core.DataValue.parse(type, xml.attr("min")) );
                }
                if (xml.attr("max") !== undefined) {
                    pan.max( window.multigraph.core.DataValue.parse(type, xml.attr("max")) );
                }
            }
            return pan;
        };
        
    });

});
