window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Window.respondsTo("render", function (graph, paper, set, width, height) {
            var ml = this.margin().left();

            if (ml > 0) {
                // window border
                set.push( paper.rect(ml,ml,width-2*ml,height-2*ml)
                          .attr({"fill" : this.bordercolor().getHexString("#")}) );
            }

        });

    });

});
