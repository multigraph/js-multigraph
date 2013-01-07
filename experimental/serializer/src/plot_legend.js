window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["visible"];

    ns.mixin.add(function (ns, serialize) {
        
        ns.core.PlotLegend.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<legend ',
                i;

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            if (this.label() !== undefined) {
                attributeStrings.push('label="' + this.label().string() + '"');
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
