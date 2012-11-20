window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Multigraph[parse] = function (xml, messageHandler) {
            var multigraph = new ns.core.Multigraph();
            if (xml) {
                if (xml.find(">graph").length > 0) {
                    window.multigraph.jQuery.each(xml.find(">graph"), function (i,e) {
                        multigraph.graphs().add( ns.core.Graph[parse](window.multigraph.jQuery(e), messageHandler) );
                    });
                } else if (xml.find(">graph").length === 0 && xml.children().length > 0) {
                    multigraph.graphs().add( ns.core.Graph[parse](xml, messageHandler) );
                }
            }
            return multigraph;
        };

    });

});

