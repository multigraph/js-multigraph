if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["allowed", "min", "max"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Pan[parse] = function (xml) {
            var pan = new nsObj.Axis.Pan();
            if (xml) {
                pan.allowed(xml.attr("allowed"));
                pan.min(xml.attr("min"));
                pan.max(xml.attr("max"));
            }
            return pan;
        };
        
        nsObj.Axis.Pan.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<pan ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
