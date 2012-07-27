window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.axiscontrols),
        AxisControls = new window.jermaine.Model( "AxisControls", function () {
            this.hasA("visible").which.validatesWith(function (visible) {
                return typeof(visible) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.axiscontrols, attributes);
        });

    ns.AxisControls = AxisControls;

});
