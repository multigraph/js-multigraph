window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues["debugger"]),
        Debugger = new window.jermaine.Model( "Debugger", function () {
            this.hasA("visible").which.validatesWith(function (visible) {
                return typeof(visible) === "string";
            });
            this.hasA("fixed").which.validatesWith(function (fixed) {
                return typeof(fixed) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues["debugger"], attributes);

        });

    ns.Debugger = Debugger;

});
