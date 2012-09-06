window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Multigraph = new window.jermaine.Model( "Multigraph", function () {

        this.hasMany("graphs").which.validatesWith(function (graph) {
            return graph instanceof ns.Graph;
        });

        this.hasA("divid").which.isA("string");

        this.respondsTo("initializeGeometry", function (width, height) {
            var i;
            for (i=0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).initializeGeometry(width, height);
            }
        });

        this.respondsTo("registerCommonDataCallback", function (callback) {
            var i, j,
                graphs = this.graphs(),
                data;
            for (i=0; i < graphs.size(); ++i) {
                data = graphs.at(i).data();
                for (j=0; j<data.size(); ++j) {
                    data.at(j).onReady(callback);
                }
            }
        });

   });

    ns.Multigraph = Multigraph;

});
