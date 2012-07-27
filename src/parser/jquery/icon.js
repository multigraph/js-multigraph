window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["height", "width", "border"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Icon[parse] = function (xml) {
            var icon = new ns.core.Icon();
            if (xml) {
                icon.height(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("height")));
                icon.width(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("width")));
                icon.border(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));
            }
            return icon;
        };
        
        ns.core.Icon.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<icon ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
