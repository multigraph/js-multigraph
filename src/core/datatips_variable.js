window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot.datatips.variable),
        DatatipsVariable = new window.jermaine.Model("DatatipsVariable", function () {
            this.hasA("format").which.validatesWith(function (format) {
                return typeof(format) === "string";
            });

            utilityFunctions.insertDefaults(this, defaultValues.plot.datatips.variable, attributes);
        });

    ns.DatatipsVariable = DatatipsVariable;

});
