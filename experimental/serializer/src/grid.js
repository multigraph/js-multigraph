window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["visible"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.Grid.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<grid ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
