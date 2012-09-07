window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.legend),
        PlotLegend = new window.jermaine.Model( "PlotLegend", function () {
            this.hasA("visible").which.isA("boolean");
            this.hasA("label").which.isA("string");

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.legend, attributes);
        });

    ns.PlotLegend = PlotLegend;

});
