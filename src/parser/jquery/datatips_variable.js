window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["format"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.DatatipsVariable[parse] = function (xml) {
            var variable = new ns.core.DatatipsVariable();
            if (xml) {
                variable.format(xml.attr("format"));
            }
            return variable;
        };
        
        ns.core.DatatipsVariable.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variable ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
