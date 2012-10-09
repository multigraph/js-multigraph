window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Graph[parse] = function (xml) {
            var graph = new ns.core.Graph();
            if (xml) {
                // NOTE: 'OBJ.find(">TAG")' returns a list of JQuery objects corresponding to the immediate
                // (1st generation) child nodes of OBJ corresponding to xml tag TAG
                if (xml.find(">window").length > 0) {
                    graph.window( ns.core.Window[parse](xml.find(">window")) );
                } else {
                    graph.window( ns.core.Window[parse]() );
                }

                if (xml.find(">legend").length > 0) {
                    graph.legend( ns.core.Legend[parse](xml.find(">legend")) );
                } else {
                    graph.legend( ns.core.Legend[parse]() );
                }
                if (xml.find(">background").length > 0) {
                    graph.background( ns.core.Background[parse](xml.find(">background")) );
                }
                if (xml.find(">plotarea").length > 0) {
                    graph.plotarea( ns.core.Plotarea[parse](xml.find(">plotarea")) );
                }
                if (xml.find(">title").length > 0) {
                    graph.title( ns.core.Title[parse](xml.find(">title")) );
                }
                window.multigraph.jQuery.each(xml.find(">horizontalaxis"), function (i,e) {
                    graph.axes().add( ns.core.Axis[parse](window.multigraph.jQuery(e), ns.core.Axis.HORIZONTAL) );
                });
                window.multigraph.jQuery.each(xml.find(">verticalaxis"), function (i,e) {
                    graph.axes().add( ns.core.Axis[parse](window.multigraph.jQuery(e), ns.core.Axis.VERTICAL) );
                });
                window.multigraph.jQuery.each(xml.find(">data"), function (i,e) {
                    graph.data().add( ns.core.Data[parse](window.multigraph.jQuery(e)) );
                });
                window.multigraph.jQuery.each(xml.find(">plot"), function (i,e) {
                    graph.plots().add( ns.core.Plot[parse](window.multigraph.jQuery(e), graph) );
                });
                graph.postParse();
            }
            return graph;
        };

        ns.core.Graph.prototype[serialize] = function () {
            var xmlstring = '<graph>',
                i;
            if (this.window()) {
                xmlstring += this.window()[serialize]();
            }
            if (this.legend()) {
                xmlstring += this.legend()[serialize]();
            }
            if (this.background()) {
                xmlstring += this.background()[serialize]();
            }
            if (this.plotarea()) {
                xmlstring += this.plotarea()[serialize]();
            }
            if (this.title()) {
                xmlstring += this.title()[serialize]();
            }
            for (i = 0; i < this.axes().size(); ++i) {
                xmlstring += this.axes().at(i)[serialize]();
            }
            for (i = 0; i < this.plots().size(); ++i) {
                xmlstring += this.plots().at(i)[serialize]();
            }
            for (i = 0; i < this.data().size(); ++i) {
                xmlstring += this.data().at(i)[serialize]();
            }

            xmlstring += "</graph>";
            return xmlstring;
        };

    });

});

