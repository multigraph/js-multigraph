window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Multigraph[parse] = function (xml, mugl, messageHandler) {
            var multigraph = new ns.core.Multigraph(),
                graphs     = multigraph.graphs(),
                Graph      = ns.core.Graph,
                $ = ns.jQuery,
                child;
            multigraph.mugl(mugl); // set the mugl url
            if (xml) {
                child = xml.find(">graph");
                if (child.length > 0) {
                    $.each(child, function (i, e) {
                        graphs.add( Graph[parse]($(e), multigraph, messageHandler) );
                    });
                } else if (child.length === 0 && xml.children().length > 0) {
                    graphs.add( Graph[parse](xml, multigraph, messageHandler) );
                }
            }
            return multigraph;
        };

    });

});

