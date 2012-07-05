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
        Variable = new ns.ModelTool.Model( "Variable", function () {
            this.hasA("id").which.validatesWith(function (id) {
                return typeof(id) === "string";
            });
            this.hasA("column").which.validatesWith(function (column) {
                return typeof(column) === "string";
            });
            this.hasA("type").which.validatesWith(function (type) {
                return typeof(type) === "string" && (type.toLowerCase() === "number" || type.toLowerCase() === "datetime");
            });
            this.hasA("missingvalue").which.validatesWith(function (missingvalue) {
                return typeof(missingvalue) === "string";
            });
            this.hasA("missingop").which.validatesWith(function (missingop) {
                return typeof(missingop) === "string";
            });
            this.isBuiltWith("id");

            ns.utilityFunctions.insertDefaults(this, defaultValues.data.variables.variable, attributes);
        });

    ns.Data.Variables.Variable = Variable;

}(window.multigraph));
