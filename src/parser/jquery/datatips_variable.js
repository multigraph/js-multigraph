window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.DatatipsVariable[parse] = function (xml) {
            var variable = new ns.core.DatatipsVariable(),
                utilityFunctions = ns.utilityFunctions;

            if (xml) {
                utilityFunctions.parseAttribute(xml.attr("format"), variable.formatString, utilityFunctions.parseString);
            }
            return variable;
        };
        
    });

});
