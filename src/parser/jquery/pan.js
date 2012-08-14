window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["min", "max"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Pan[parse] = function (xml, type) {
            var pan = new ns.core.Pan(),
                allowed;
            if (xml) {
                allowed = xml.attr("allowed");
                if (allowed !== undefined) {
                    switch (allowed.toLowerCase()) {
                        case "yes":
                            allowed = true;
                            break;
                        case "no":
                            allowed = false;
                            break;
                        default:
                            break;
                    }

                    pan.allowed(allowed);
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
        
        ns.core.Pan.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<pan ';

            if (this.allowed()) {
                attributeStrings.push('allowed="yes"')
            } else {
                attributeStrings.push('allowed="no"')
            }
            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
