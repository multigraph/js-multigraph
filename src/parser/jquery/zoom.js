window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["allowed", "min", "max", "anchor"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Zoom[parse] = function (xml) {
            var zoom = new ns.core.Zoom();
            if (xml) {
                zoom.allowed(xml.attr("allowed"));
                zoom.min(xml.attr("min"));
                zoom.max(xml.attr("max"));
                zoom.anchor(xml.attr("anchor"));
            }
            return zoom;
        };
        
        ns.core.Zoom.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<zoom ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
