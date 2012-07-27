window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Variables,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.data.variables);

    Variables = new window.jermaine.Model( "Variables", function () {
        this.hasMany("variable").which.validatesWith(function (variable) {
            return variable instanceof ns.DataVariable;
        });
        this.hasA("missingvalue").which.validatesWith(function (missingvalue) {
            return typeof(missingvalue) === "string";
        });
        this.hasA("missingop").which.validatesWith(function (missingop) {
            return typeof(missingop) === "string";
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.data.variables, attributes);
    });

    ns.Variables = Variables;

});
