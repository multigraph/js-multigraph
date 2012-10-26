window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Plotarea.respondsTo("render", function (graph, paper, set) {
            var plotareaAttrs,
                plotarea;

            if (this.color() !== null) {
                if (plotareaAttrs === undefined) {
                    plotareaAttrs = {};
                }
                plotareaAttrs.fill   = this.color().getHexString("#");
                plotareaAttrs.stroke = this.color().getHexString("#"); // set to fill color in case border isn't drawn
            }

            if (this.border() > 0) {
                if (plotareaAttrs === undefined) {
                    plotareaAttrs = { "fill-opacity" : 0 };
                }
                plotareaAttrs["stroke-opacity"] = 1;
                plotareaAttrs.stroke            = this.bordercolor().getHexString("#");
                plotareaAttrs["stroke-width"]   = this.border();
            }

            if (plotareaAttrs !== undefined) {
                plotarea = paper.rect(graph.x0(), graph.y0(), graph.plotBox().width(), graph.plotBox().height())
                    .attr(plotareaAttrs);
                plotarea.insertAfter(set);
                set.push(plotarea);
            }

        });

    });

});
