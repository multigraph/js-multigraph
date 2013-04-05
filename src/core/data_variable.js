window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.data.variables.variable),
        DataVariable = new window.jermaine.Model("DataVariable", function () {
            this.hasA("id").which.isA("string");
            this.hasA("column").which.isA("integer");
            this.hasA("type").which.isOneOf(ns.DataValue.types()).and.defaultsTo(ns.DataValue.NUMBER);
            this.hasA("data").which.validatesWith(function (data) {
                return data instanceof window.multigraph.core.Data;
            });
            this.hasA("missingvalue").which.validatesWith(ns.DataValue.isInstance);

            this.hasA("missingop").which.isOneOf(ns.DataValue.comparators());
            this.isBuiltWith("id", "%column", "%type");

            utilityFunctions.insertDefaults(this, defaultValues.data.variables.variable, attributes);
        });

    ns.DataVariable = DataVariable;

});
