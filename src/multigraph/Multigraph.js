if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Multigraph = new ns.ModelTool.Model( "Graph", function () {

        this.hasMany("graphs").which.validatesWith(function (graph) {
            return graph instanceof window.multigraph.Graph;
        });

        this.hasA("divid").which.isA("string");

        this.respondsTo("init", function() {
            //NOTE: placeholder function.  This gets replaced by whatever graphics mixin is used.
        });

        this.respondsTo("initializeGeometry", function(width, height) {
            var i;
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).initializeGeometry(width, height);
            }
        });

   });

    Multigraph.createGraph = function(divid, muglurl) {

        ns.jQueryXMLMixin.apply(ns, 'parseXML', 'serialize');
        ns.raphaelMixin.apply(ns);

        var muglPromise = $.ajax({
            "url"      : muglurl,
            "dataType" : "text",
        });

        var deferred = $.Deferred();

        muglPromise.done(function(data) {
            var multigraph = ns.Multigraph.parseXML( $(data) );
            multigraph.divid(divid);
            multigraph.init();
            deferred.resolve(multigraph);
        });

        return deferred.promise();

    };

    ns.Multigraph = Multigraph;

}(window.multigraph));
