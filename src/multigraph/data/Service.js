if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var Service = new ns.ModelTool.Model( 'Service', function () {
        this.hasA("location").which.validatesWith(function (location) {
            return typeof(location) === 'string';
        });

    });

    ns.Data.Service = Service;

}(window.multigraph));
