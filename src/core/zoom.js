window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis.zoom),
        Zoom = new window.jermaine.Model("Zoom", function () {

            this.hasA("allowed").which.isA("boolean");
            this.hasA("min").which.validatesWith(function (min) {
                return ns.DataMeasure.isInstance(min);
            });
            this.hasA("max").which.validatesWith(function (max) {
                return ns.DataMeasure.isInstance(max);
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return ns.DataValue.isInstance(anchor) || anchor === null;
            });

            utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.zoom, attributes);
        });

    ns.Zoom = Zoom;

});
