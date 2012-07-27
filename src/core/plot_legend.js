window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.legend),
        PlotLegend = new window.jermaine.Model( "PlotLegend", function () {
            this.hasA("visible").which.validatesWith(function (visible) {
                return visible === "true" || visible === "false";
            });
            this.hasA("label").which.validatesWith(function (label) {
                return typeof(label) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.legend, attributes);
        });

    ns.PlotLegend = PlotLegend;

});
