if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Multigraph = ns.Multigraph;

    Multigraph.hasA("paper");
    Multigraph.respondsTo("init", function(divid) {
        return this.initRaphael(divid);
    });
    Multigraph.respondsTo("initRaphael", function(divid) {
        this.divid(divid);
        this.paper(new Raphael(divid, 500, 300));
        this.render();
    });
    Multigraph.respondsTo("render", function() {
        var i;
        for (i=0; i<this.graphs().size(); ++i) {
            this.graphs().at(i).render(this.paper());
        }
    });

}(window.multigraph));
