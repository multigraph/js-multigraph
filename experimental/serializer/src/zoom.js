window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["min", "max"];

    ns.mixin.add(function (ns, serialize) {

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
