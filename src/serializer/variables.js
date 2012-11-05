window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["missingvalue", "missingop"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.Variables.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variables ',
                i;

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            if (this.variable().size() > 0) {
                output += '>';
                for (i = 0; i < this.variable().size(); i++) {
                    output += this.variable().at(i)[serialize]();
                }
                output += '</variables>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
