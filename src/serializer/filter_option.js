window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["name", "value"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.FilterOption.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<option ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
