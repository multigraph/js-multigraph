if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.data.csv),
        CSV = new ns.ModelTool.Model( "CSV", function () {
            this.hasA("location").which.validatesWith(function (location) {
                return typeof(location) === "string";
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.data.csv, attributes);
        });

    ns.Data.CSV = CSV;

}(window.multigraph));
