if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.axiscontrols),
        AxisControls = new window.jermaine.Model( "AxisControls", function () {
            this.hasA("visible").which.validatesWith(function (visible) {
                return typeof(visible) === "string";
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.axiscontrols, attributes);
        });

    ns.Axis.AxisControls = AxisControls;

}(window.multigraph));
