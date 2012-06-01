if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var Title = new ns.ModelTool.Model( 'AxisTitle', function () {
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
    });

    ns.Axis.Title = Title;

}(window.multigraph));
