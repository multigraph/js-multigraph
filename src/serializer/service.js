window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["location"];

    ns.mixin.add(function (ns, serialize) {
        
        ns.core.Service.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<service ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
