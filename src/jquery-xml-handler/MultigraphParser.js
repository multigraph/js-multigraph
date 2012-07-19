if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLMixin.add(function(ns, parse, serialize) {

        ns.Multigraph[parse] = function(xml) {
            var Multigraph = new ns.Multigraph();
            if (xml) {
                if (xml.find(">graph").length > 0) {
                    $.each(xml.find(">graph"), function (i,e) {
                        Multigraph.graphs().add( ns.Graph[parse]($(e)) );
                    });
                } else if (xml.find(">graph").length === 0 && xml.children().length > 0) {
                    Multigraph.graphs().add( ns.Graph[parse](xml) );
                }
            }
            return Multigraph;
        };

        ns.Multigraph.prototype[serialize] = function () {
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

}(window.multigraph));

