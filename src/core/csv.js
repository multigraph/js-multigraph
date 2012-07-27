window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.data.csv),
        CSV = new window.jermaine.Model( "CSV", function () {
            this.hasA("location").which.validatesWith(function (location) {
                return typeof(location) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.data.csv, attributes);
        });

    ns.CSV = CSV;

});
