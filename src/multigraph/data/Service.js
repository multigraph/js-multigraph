if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.data.service),
        Service = new ns.ModelTool.Model( "Service", function () {
            this.hasA("location").which.validatesWith(function (location) {
                return typeof(location) === "string";
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.data.service, attributes);
        });

    ns.Data.Service = Service;

}(window.multigraph));
