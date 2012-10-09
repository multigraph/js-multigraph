window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Multigraph[parse] = function (xml) {
            var multigraph = new ns.core.Multigraph();
            if (xml) {
                if (xml.find(">graph").length > 0) {
                    window.multigraph.jQuery.each(xml.find(">graph"), function (i,e) {
                        multigraph.graphs().add( ns.core.Graph[parse](window.multigraph.jQuery(e)) );
                    });
                } else if (xml.find(">graph").length === 0 && xml.children().length > 0) {
                    multigraph.graphs().add( ns.core.Graph[parse](xml) );
                }
            }
            return multigraph;
        };

        ns.core.Multigraph.prototype[serialize] = function () {
            var output = '<mugl>',
                i;

            for (i = 0; i < this.graphs().size(); ++i) {
                output += this.graphs().at(i)[serialize]();
            }

            output += '</mugl>';

            if (this.graphs().size() === 1) {
                output = output.replace('<mugl><graph>', '<mugl>');
                output = output.replace('</graph></mugl>', '</mugl>');
            }

            return output;
        };

    });

});

