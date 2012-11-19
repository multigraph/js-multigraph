window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Graph[parse] = function (xml, messageHandler) {
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
                    graph.axes().add( ns.core.Axis[parse](window.multigraph.jQuery(e), ns.core.Axis.HORIZONTAL, messageHandler) );
                });
                window.multigraph.jQuery.each(xml.find(">verticalaxis"), function (i,e) {
                    graph.axes().add( ns.core.Axis[parse](window.multigraph.jQuery(e), ns.core.Axis.VERTICAL, messageHandler) );
                });
                if (xml.find(">data").length === 0) {
                    // On second throught, let's not throw an error if no <data> tag
                    // is specified, because conceivably there could be graphs in
                    // which all the plots are constant plots, so no data is needed.
                    // In particular, in our spec/mugl/constant-plot.xml test!
                    // I'm not sure what should be done here --- maybe issue a warning,
                    // or maybe don't do anything.
                    //    mbp Mon Nov 12 16:05:21 2012
                    //throw new Error("Graph Data Error: No data tags specified");
                }
                window.multigraph.jQuery.each(xml.find(">data"), function (i,e) {
                    graph.data().add( ns.core.Data[parse](window.multigraph.jQuery(e)) );
                });
                window.multigraph.jQuery.each(xml.find(">plot"), function (i,e) {
                    graph.plots().add( ns.core.Plot[parse](window.multigraph.jQuery(e), graph, messageHandler) );
                });
                graph.postParse();
            }
            return graph;
        };

    });

});

