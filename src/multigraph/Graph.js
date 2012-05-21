if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Graph = window.multigraph.ModelTool.Model( 'Graph', function() {

        this.hasMany("axes").which.validatesWith(function(axis) {
		return axis instanceof window.multigraph.Axis;
        });
        this.hasMany("plots").which.validatesWith(function(plot) {
		return plot instanceof window.multigraph.Plot;
        });

    });

    ns.Graph = Graph;


}(window.multigraph));
