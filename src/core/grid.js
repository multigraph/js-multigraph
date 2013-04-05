window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis.grid),
        Grid = new window.jermaine.Model("Grid", function () {
            this.hasA("color").which.validatesWith(function (color) {
                return color instanceof window.multigraph.math.RGBColor;
            });
            this.hasA("visible").which.isA("boolean");

            utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.grid, attributes);
        });

    ns.Grid = Grid;

});
