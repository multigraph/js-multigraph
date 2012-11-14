window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.PlotLegend[parse] = function (xml, plot) {
            var legend = new ns.core.PlotLegend();
            if (xml) {
                if (xml.attr("visible") !== undefined) {
                    if (xml.attr("visible").toLowerCase() === "true") {
                        legend.visible(true);
                    } else if (xml.attr("visible").toLowerCase() === "false") {
                        legend.visible(false);
                    } else {
                        legend.visible(xml.attr("visible"));
                    }
                }
                if (xml.attr("label") !== undefined) {
                    legend.label(new ns.core.Text(xml.attr("label")));
                }
            }

            if (legend.label() === undefined) {
                // TODO: remove this ugly patch with something that works properly
                if (typeof(plot.variable)==="function" && plot.variable().size() >= 2) { 
                    legend.label(new ns.core.Text(plot.variable().at(1).id()));
                } else {
                    legend.label(new ns.core.Text("plot"));
                }
            }
            return legend;
        };

    });

});
