window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Multigraph[parse] = function (xml, mugl, messageHandler) {
            var multigraph = new ns.core.Multigraph();
            multigraph.mugl(mugl); // set the mugl url
            if (xml) {
                if (xml.find(">graph").length > 0) {
                    window.multigraph.jQuery.each(xml.find(">graph"), function (i,e) {
                        multigraph.graphs().add( ns.core.Graph[parse](window.multigraph.jQuery(e), multigraph, messageHandler) );
                    });
                } else if (xml.find(">graph").length === 0 && xml.children().length > 0) {
                    multigraph.graphs().add( ns.core.Graph[parse](xml, multigraph, messageHandler) );
                }
            }
            return multigraph;
        };

    });

});

