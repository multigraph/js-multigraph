window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.datatips.variable),
        DatatipsVariable = new window.jermaine.Model("DatatipsVariable", function () {
            this.hasA("format").which.validatesWith(function (format) {
                return typeof(format) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.datatips.variable, attributes);
        });

    ns.DatatipsVariable = DatatipsVariable;

});
