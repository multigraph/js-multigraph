window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["format"];

    ns.mixin.add(function (ns, serialize) {
        
        ns.core.DatatipsVariable.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variable ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
