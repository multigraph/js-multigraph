if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var Pan = new ns.ModelTool.Model( 'Pan', function () {
        this.hasA("allowed").which.validatesWith(function (allowed) {
            return allowed === 'yes' || allowed === 'no';
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === 'string';
        });
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === 'string';
        });

    });

    ns.Axis.Pan = Pan;

}(window.multigraph));
