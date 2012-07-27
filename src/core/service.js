window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.data.service),
        Service = new window.jermaine.Model( "Service", function () {
            this.hasA("location").which.validatesWith(function (location) {
                return typeof(location) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.data.service, attributes);
        });

    ns.Service = Service;

});
