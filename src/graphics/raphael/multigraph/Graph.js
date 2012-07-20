if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.raphaelMixin.add(function(ns) {
        var Graph = ns.Graph;

        Graph.respondsTo("render", function(paper, width, height) {
            var i;
            paper.path("M 0,0 L "+width+","+height+" M "+width+",0 L 0,"+height+"");
            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).render(this);
            }
        });

    });

}(window.multigraph));
