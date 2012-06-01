if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var AxisControls = new ns.ModelTool.Model( 'AxisControls', function () {
        this.hasA("visible").which.validatesWith(function (visible) {
            return typeof(visible) === 'string';
        });

    });

    ns.Axis.AxisControls = AxisControls;

}(window.multigraph));
