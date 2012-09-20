window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["height", "width", "border"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Icon[parse] = function (xml) {
            var icon = new ns.core.Icon();
            if (xml) {
                if (xml.attr("height") !== undefined) {
                    icon.height(parseInt(xml.attr("height"), 10));
                }
                if (xml.attr("width") !== undefined) {
                    icon.width(parseInt(xml.attr("width"), 10));
                }
                if (xml.attr("border") !== undefined) {
                    icon.border(parseInt(xml.attr("border"), 10));
                }
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
