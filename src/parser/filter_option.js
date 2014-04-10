window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.FilterOption[parse] = function (xml) {
            var option = new ns.core.FilterOption();
            if (xml) {
                option.name(xml.attr("name"));
                option.value(xml.attr("value") === "" ? undefined : xml.attr("value"));
            }
            return option;
        };
        
    });

});
