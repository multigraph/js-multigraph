window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.PlotLegend[parse] = function (xml, plot) {
            var legend = new ns.core.PlotLegend(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                Text = ns.core.Text,
                child;
            if (xml) {
                parseAttribute(xml.attr("visible"), legend.visible, utilityFunctions.parseBoolean);
                parseAttribute(xml.attr("label"),   legend.label,   function (value) { return new Text(value); });
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
