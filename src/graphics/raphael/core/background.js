window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Background.respondsTo("render", function (graph, paper, set, width, height) {
            var mb = graph.window().margin().left() + graph.window().border();

            set.push( paper.rect(mb,mb,width-2*mb,height-2*mb)
                      .attr({"fill" : this.color().getHexString("#")}) );
            if (this.img() && this.img().src() !== undefined) {
                this.img().render(graph, paper, set, width, height);
            }
        });

    });

});
