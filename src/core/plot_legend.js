window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot.legend),
        PlotLegend = new window.jermaine.Model("PlotLegend", function () {
            this.hasA("visible").which.isA("boolean");
            this.hasA("label").which.validatesWith(function (label) {
                return label instanceof ns.Text;
            });

            utilityFunctions.insertDefaults(this, defaultValues.plot.legend, attributes);
        });

    ns.PlotLegend = PlotLegend;

});
