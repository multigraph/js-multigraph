window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Filter[parse] = function (xml) {
            var filter = new ns.core.Filter(),
                $ = ns.jQuery,
                attr, child;
            if (xml) {
                child = xml.find("option");
                if (child.length > 0) {
                    $.each(child, function (i, e) {
                        filter.options().add( ns.core.FilterOption[parse]($(e)) );
                    });
                }
                attr = xml.attr("type");
                if (attr !== undefined) {
                    filter.type(attr);
                }
            }
            return filter;
        };

    });

});
