window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.PlotLegend[parse] = function (xml, plot) {
            var legend = new ns.core.PlotLegend(),
                Text = ns.core.Text,
                attr;
            if (xml) {
                attr = xml.attr("visible");
                if (attr !== undefined) {
                    legend.visible(ns.utilityFunctions.parseBoolean(attr));
                }
                attr = xml.attr("label");
                if (attr !== undefined) {
                    legend.label(new Text(attr));
                }
            }

            if (legend.label() === undefined) {
                // TODO: remove this ugly patch with something that works properly
                if (typeof(plot.variable)==="function" && plot.variable().size() >= 2) { 
                    legend.label(new Text(plot.variable().at(1).id()));
                } else {
                    legend.label(new Text("plot"));
                }
            }
            return legend;
        };

    });

});
