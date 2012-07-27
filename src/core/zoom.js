window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.zoom),
        Zoom = new window.jermaine.Model( "Zoom", function () {
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

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.zoom, attributes);
    });

    ns.Zoom = Zoom;

});
