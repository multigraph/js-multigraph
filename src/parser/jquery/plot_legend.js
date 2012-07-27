window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "label"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.PlotLegend[parse] = function (xml) {
            var legend = new ns.core.PlotLegend();
            if (xml) {
                legend.visible(xml.attr("visible"));
                legend.label(xml.attr("label"));
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
