if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var DataVariable,
        Variables,
        defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.data.variables);

    if (ns.Data.Variables && ns.Data.Variables.DataVariable) {
        DataVariable = ns.Data.Variables.DataVariable;
    }

    Variables = new window.jermaine.Model( "Variables", function () {
        this.hasMany("variable").which.validatesWith(function (variable) {
            return variable instanceof ns.Data.Variables.DataVariable;
        });
        this.hasA("missingvalue").which.validatesWith(function (missingvalue) {
            return typeof(missingvalue) === "string";
        });
        this.hasA("missingop").which.validatesWith(function (missingop) {
            return typeof(missingop) === "string";
        });

        ns.utilityFunctions.insertDefaults(this, defaultValues.data.variables, attributes);
    });

    ns.Data.Variables = Variables;

    if (DataVariable) {
        ns.Data.Variables.DataVariable = DataVariable;
    }

}(window.multigraph));
