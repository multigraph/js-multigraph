window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["id", "min", "max"];

    ns.mixin.add(function (ns, serialize) {
        
        ns.core.Binding.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<binding ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
