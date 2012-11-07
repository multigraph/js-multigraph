window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Binding[parse] = function (xml) {
            var binding;
            if (xml && xml.attr("id") !== undefined && xml.attr("min") !== undefined && xml.attr("max") !== undefined) {
                binding = new ns.core.Binding(xml.attr("id"), xml.attr("min"), xml.attr("max"));
            }
            return binding;
        };
        
    });

});
