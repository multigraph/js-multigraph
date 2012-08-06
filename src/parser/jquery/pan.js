window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["allowed", "min", "max"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Pan[parse] = function (xml) {
            var pan = new ns.core.Pan();
            if (xml) {
                if (xml.attr("allowed") !== undefined) {
                    pan.allowed(xml.attr("allowed").toLowerCase());
                }
                pan.min(xml.attr("min"));
                pan.max(xml.attr("max"));
            }
            return pan;
        };
        
        ns.core.Pan.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<pan ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
