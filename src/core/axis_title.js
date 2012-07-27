window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.title),
        AxisTitle = new window.jermaine.Model( "AxisTitle", function () {
            this.hasA("content").which.isA("string");
            this.hasA("position").which.validatesWith(function (position) {
                return window.multigraph.utilityFunctions.validateCoordinatePair(position);
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return window.multigraph.utilityFunctions.validateCoordinatePair(anchor);
            });
            this.hasA("angle").which.isA("number");

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.title, attributes);
        });

    ns.AxisTitle = AxisTitle;

});
