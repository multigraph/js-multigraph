if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.grid),
        Grid = new ns.ModelTool.Model( 'Grid', function () {
            this.hasA("color").which.validatesWith(function (color) {
                return ns.utilityFunctions.validateColor(color);
            });
            this.hasA("visible").which.validatesWith(function (visible) {
                return visible === 'true' || visible === 'false';
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.grid, attributes);
        });

    ns.Axis.Grid = Grid;

}(window.multigraph));
