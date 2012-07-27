window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.data.variables.variable),
        DataValue = ns.DataValue,
        DataVariable = new window.jermaine.Model( "DataVariable", function () {
            this.hasA("id").which.isA("string");
            this.hasA("column").which.isA("integer");
            this.hasA("type").which.isOneOf(DataValue.types());
            this.hasA("missingvalue").which.validatesWith(DataValue.isInstance);

            this.hasA("missingop").which.isOneOf(DataValue.comparators());
            this.isBuiltWith("id", "%column", "%type"); //NOTE: remove optional '%' soon!

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.data.variables.variable, attributes);
        });

    ns.DataVariable = DataVariable;

});
