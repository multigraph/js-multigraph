window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Filter[parse] = function (xml) {
            var filter = new ns.core.Filter();
            if (xml) {
                if (xml.find("option").length > 0) {
                    window.multigraph.jQuery.each(xml.find(">option"), function (i, e) {
                        filter.options().add( ns.core.FilterOption[parse](window.multigraph.jQuery(e)) );
                    });
                }
                filter.type(xml.attr("type"));
            }
            return filter;
        };

    });

});
