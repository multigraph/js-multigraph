window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "fixed"];
    ns.mixin.add(function(ns, parse, serialize) {
        
        ns.core.NetworkMonitor[parse] = function (xml) {
            var networkmonitor = new ns.core.NetworkMonitor();
            if (xml) {
                networkmonitor.visible(xml.attr("visible"));
                networkmonitor.fixed(xml.attr("fixed"));
            }
            return networkmonitor;
        };
        
        ns.core.NetworkMonitor.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<networkmonitor ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
