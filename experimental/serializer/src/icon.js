window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["height", "width", "border"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.Icon.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<icon ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
