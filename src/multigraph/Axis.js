if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Axis = window.multigraph.ModelTool.Model( 'Axis', function() {
        this.hasAn("id").which.validatesWith(function(id) {
            return typeof(id) === 'string';
        });

        this.hasMany("things").which.validatesWith(function(thing) {
            return typeof(thing) === 'string';
        });
    });

    ns.Axis = Axis;


    var Graph = window.multigraph.ModelTool.Model( 'Graph', function() {

        this.hasMany("axes").which.validatesWith(function(axis) {
		return axis instanceof window.multigraph.Axis;
        });

    });

    ns.Graph = Graph;


}(window.multigraph));
