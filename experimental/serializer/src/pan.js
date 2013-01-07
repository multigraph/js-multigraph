window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["min", "max"];

    ns.mixin.add(function (ns, serialize) {
        
        ns.core.Pan.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<pan ';

            if (this.allowed()) {
                attributeStrings.push('allowed="yes"');
            } else {
                attributeStrings.push('allowed="no"');
            }
            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
