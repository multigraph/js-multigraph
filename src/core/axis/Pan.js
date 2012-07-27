if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.pan),
        Pan = new window.jermaine.Model( "Pan", function () {
        this.hasA("allowed").which.validatesWith(function (allowed) {
            return allowed === "yes" || allowed === "no";
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === "string";
        });
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === "string";
        });

        ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.pan, attributes);
    });

    ns.Axis.Pan = Pan;

}(window.multigraph));
