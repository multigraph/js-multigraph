if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Multigraph = new window.jermaine.Model( "Graph", function () {

        this.hasMany("graphs").which.validatesWith(function (graph) {
            return graph instanceof window.multigraph.Graph;
        });

        this.hasA("divid").which.isA("string");

        this.respondsTo("initializeGeometry", function(width, height) {
            var i;
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).initializeGeometry(width, height);
            }
        });

   });

    ns.Multigraph = Multigraph;

}(window.multigraph));
