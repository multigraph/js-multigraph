window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Pan[parse] = function (xml, type) {
            var pan = new ns.core.Pan(),
                DataValue = ns.core.DataValue,
                attr;
            if (xml) {
                attr = xml.attr("allowed");
                if (attr !== undefined) {
                    pan.allowed(ns.utilityFunctions.parseBoolean(attr));
                }
                attr = xml.attr("min");
                if (attr !== undefined) {
                    pan.min( DataValue.parse(type, attr) );
                }
                attr = xml.attr("max");
                if (attr !== undefined) {
                    pan.max( DataValue.parse(type, attr) );
                }
            }
            return pan;
        };
        
    });

});
