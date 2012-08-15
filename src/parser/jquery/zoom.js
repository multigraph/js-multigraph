window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["min", "max"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Zoom[parse] = function (xml, type) {
            var zoom = new ns.core.Zoom(),
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

                    zoom.allowed(allowed);
                }
                if (xml.attr("min") !== undefined) {
                    zoom.min( window.multigraph.core.DataMeasure.parse(type, xml.attr("min")) );
                }
                if (xml.attr("max") !== undefined) {
                    zoom.max( window.multigraph.core.DataMeasure.parse(type, xml.attr("max")) );
                }
                if (xml.attr("anchor") !== undefined) {
                    if (xml.attr("anchor").toLowerCase() === "none") {
                        zoom.anchor(null);
                    } else {
                        zoom.anchor( window.multigraph.core.DataValue.parse(type, xml.attr("anchor")) );
                    }
                }
            }
            return zoom;
        };
        
        ns.core.Zoom.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<zoom ';

            if (this.allowed()) {
                attributeStrings.push('allowed="yes"');
            } else {
                attributeStrings.push('allowed="no"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            if (this.anchor() === null) {
                attributeStrings.push('anchor="none"');
            } else {
                attributeStrings.push('anchor="' + this.anchor() + '"');
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
