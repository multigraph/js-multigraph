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
   });

    Multigraph.createGraph = function(divid, muglurl) {

        ns.jQueryXMLMixin.apply(ns, 'parseXML', 'serialize');

        var multigraph;

        $.ajax({
            "url"      : muglurl,
            "dataType" : "xml",
            "success"  : function(data) {
                multigraph = ns.Multigraph.parseXML( $(data) );
                multigraph.init(divid);
            }
        });

        return 0;

    };

    ns.Multigraph = Multigraph;

}(window.multigraph));
