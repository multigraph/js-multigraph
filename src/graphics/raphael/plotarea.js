window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Plotarea = window.multigraph.core.Plotarea;

        Plotarea.hasAn("elem");

        Plotarea.respondsTo("render", function (graph, paper, set) {
            var plotareaAttrs = {},
                border = this.border(),
                plotarea;

            if (this.color() !== null) {
                plotareaAttrs.fill = this.color().getHexString("#");
            }

            if (border > 0) {
                plotareaAttrs["fill-opacity"]   = 0 ;
                plotareaAttrs["stroke-opacity"] = 1;
                plotareaAttrs.stroke            = this.bordercolor().getHexString("#");
                plotareaAttrs["stroke-width"]   = border;
            } else {
                plotareaAttrs.stroke = "none";                
            }

            plotarea = paper.rect(graph.x0() - border/2, graph.y0() - border/2, graph.plotBox().width() + border, graph.plotBox().height() + border)
                .attr(plotareaAttrs);
            plotarea.insertAfter(set);
            this.elem(plotarea);
            set.push(plotarea);
        });

        Plotarea.respondsTo("redraw", function (graph) {
            var border = this.border(),
                plotBox = graph.plotBox(),
                pwidth = plotBox.width() + border,
                pheight = plotBox.height() + border,
                elem = this.elem();

            if (elem.attr("width") !== pwidth) {
                elem.attr("width", pwidth);
            }
            if (elem.attr("height") !== pheight) {
                elem.attr("height", pheight);
            }
        });

    });

});
