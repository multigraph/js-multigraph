window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plotarea),
        Plotarea = new window.jermaine.Model("Plotarea", function () {

            this.hasA("margin").which.validatesWith(function (margin) {
                return margin instanceof window.multigraph.math.Insets;
            });

            this.hasA("border").which.isA("integer");

            this.hasA("color").which.validatesWith(function (color) {
                return color === null || color instanceof window.multigraph.math.RGBColor;
            });

            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return bordercolor instanceof window.multigraph.math.RGBColor;
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plotarea, attributes);
        });

    ns.Plotarea = Plotarea;
});
