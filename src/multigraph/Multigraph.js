if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Multigraph = new ns.ModelTool.Model( 'Graph', function () {
        this.hasMany("graphs").which.validatesWith(function (graph) {
            return graph instanceof window.multigraph.Graph;
        });
    });

    ns.Multigraph = Multigraph;

}(window.multigraph));
