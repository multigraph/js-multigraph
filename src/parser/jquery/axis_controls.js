window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible"];
    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.AxisControls[parse] = function (xml) {
            var axiscontrols = new ns.core.AxisControls();
            if (xml) {
                axiscontrols.visible(xml.attr("visible"));
            }
            return axiscontrols;
        };
        
        ns.core.AxisControls.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<axiscontrols ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
