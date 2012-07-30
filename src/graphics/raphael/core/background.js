window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Background.respondsTo("render", function (paper, width, height, mb, graph, set) {
            paper.rect(mb,mb,width-2*mb,height-2*mb)
                .attr({"fill" : this.color().getHexString("#")})
                .transform("S 1, -1, 0, " + (height/2));
            if (this.img() && this.img().src() !== undefined) {
                this.img().render(graph, paper, set);
            }
        });

    });

});
