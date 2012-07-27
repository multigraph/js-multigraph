window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["id", "min", "max"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Binding[parse] = function (xml) {
            var binding;
            if (xml && xml.attr("id") !== undefined && xml.attr("min") !== undefined && xml.attr("max") !== undefined) {
                binding = new ns.core.Binding(xml.attr("id"), xml.attr("min"), xml.attr("max"));
            }
            return binding;
        };
        
        ns.core.Binding.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<binding ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
