if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var NetworkMonitor = new ns.ModelTool.Model( 'NetworkMonitor', function () {
        this.hasA("visible").which.validatesWith(function (visible) {
            return typeof(visible) === 'string';
        });
        this.hasA("fixed").which.validatesWith(function (fixed) {
            return typeof(fixed) === 'string';
        });

    });

    ns.NetworkMonitor = NetworkMonitor;

}(window.multigraph));
