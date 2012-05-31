if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var Binding = new ns.ModelTool.Model( 'Binding', function () {
        this.hasA("id").which.validatesWith(function (id) {
            return typeof(id) === 'string';
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === 'string';
        });
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === 'string';
        });

    });

    ns.Axis.Binding = Binding;

}(window.multigraph));
