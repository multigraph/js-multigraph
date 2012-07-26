if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

if (!window.multigraph.Data.Variables) {
    window.multigraph.Data.Variables = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.data.variables.variable),
        DataValue = ns.DataValue,
        DataVariable = new ns.ModelTool.Model( "DataVariable", function () {
            this.hasA("id").which.isA("string");
            this.hasA("column").which.isA("integer");
            this.hasA("type").which.isOneOf(DataValue.types());
            this.hasA("missingvalue").which.validatesWith(DataValue.isInstance);
            this.hasA("missingop").which.isOneOf(DataValue.comparators());
            this.isBuiltWith("id");

            ns.utilityFunctions.insertDefaults(this, defaultValues.data.variables.variable, attributes);
        });

    ns.Data.Variables.DataVariable = DataVariable;

}(window.multigraph));
