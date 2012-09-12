window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "label"];

    ns.mixin.add(function (ns, parse, serialize) {
        
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
                    legend.label(xml.attr("label"));
                }
            }

            if (legend.label() === undefined) {
                // TODO: remove this ugly patch with something that works properly
                if (plot.variable().size() >= 2) { 
                    legend.label(plot.variable().at(1).id());
                } else {
                    legend.label("plot")
                }
            }
            return legend;
        };
        
        ns.core.PlotLegend.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<legend ',
                i;

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
