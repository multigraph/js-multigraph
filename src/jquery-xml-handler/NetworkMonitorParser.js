if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "fixed"];
    ns.jQueryXMLMixin.add(function(nsObj, parse, serialize) {
        
        nsObj.NetworkMonitor[parse] = function (xml) {
            var networkmonitor = new nsObj.NetworkMonitor();
            if (xml) {
                networkmonitor.visible(xml.attr("visible"));
                networkmonitor.fixed(xml.attr("fixed"));
            }
            return networkmonitor;
        };
        
        nsObj.NetworkMonitor.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<networkmonitor ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
