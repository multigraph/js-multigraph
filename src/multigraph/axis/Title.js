if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.title),
        Title = new ns.ModelTool.Model( 'AxisTitle', function () {
            this.hasA("content").which.validatesWith(function (content) {
                return typeof(content) === 'string';
            });
            this.hasA("position").which.validatesWith(function (position) {
                return ns.utilityFunctions.validateCoordinatePair(position);
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return ns.utilityFunctions.validateCoordinatePair(anchor);
            });
            this.hasA("angle").which.validatesWith(function (angle) {
                return ns.utilityFunctions.validateDouble(angle);
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.title, attributes);
        });

    ns.Axis.Title = Title;

}(window.multigraph));
