window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Filter[parse] = function (xml) {
            var filter = new ns.core.Filter(),
                $ = ns.jQuery,
                utilityFunctions = ns.utilityFunctions,
                child;
            if (xml) {
                child = xml.find("option");
                if (child.length > 0) {
                    $.each(child, function (i, e) {
                        filter.options().add( ns.core.FilterOption[parse]($(e)) );
                    });
                }
                utilityFunctions.parseAttribute(xml.attr("type"), filter.type, utilityFunctions.parseString);
            }
            return filter;
        };

    });

});
