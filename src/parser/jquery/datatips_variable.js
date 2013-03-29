window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.DatatipsVariable[parse] = function (xml) {
            var variable = new ns.core.DatatipsVariable(),
                attr;

            if (xml) {
                attr = xml.attr("format");
                if (attr !== undefined) {
                    variable.format(attr);
                }
            }
            return variable;
        };
        
    });

});
