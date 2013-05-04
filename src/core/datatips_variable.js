window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot.datatips.variable),
        DatatipsVariable = new window.jermaine.Model("DatatipsVariable", function () {
            this.hasA("formatString").which.isA("string");
            this.hasA("formatter").which.validatesWith(ns.DataFormatter.isInstance);

            utilityFunctions.insertDefaults(this, defaultValues.plot.datatips.variable, attributes);
        });

    ns.DatatipsVariable = DatatipsVariable;

});
