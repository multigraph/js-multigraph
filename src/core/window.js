window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.window),
        Window = new window.jermaine.Model("Window", function () {

            this.hasA("width").which.isA("integer");

            this.hasA("height").which.isA("integer");

            this.hasA("border").which.isA("integer");

            this.hasA("margin").which.validatesWith(function (margin) {
                return margin instanceof window.multigraph.math.Insets;
            });

            this.hasA("padding").which.validatesWith(function (padding) {
                return padding instanceof window.multigraph.math.Insets;
            });

            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return bordercolor instanceof window.multigraph.math.RGBColor;
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.window, attributes);
        });

    ns.Window = Window;
});
