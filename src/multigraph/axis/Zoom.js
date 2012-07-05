if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.zoom),
        Zoom = new ns.ModelTool.Model( "Zoom", function () {
        this.hasA("allowed").which.validatesWith(function (allowed) {
            return allowed === "yes" || allowed === "no";
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === "string";
        });
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === "string";
        });
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return typeof(anchor) === "string";
        });

        ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.zoom, attributes);
    });

    ns.Axis.Zoom = Zoom;

}(window.multigraph));
