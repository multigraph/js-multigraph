window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Plotarea.respondsTo("render", function (graph, paper, set) {
            var paddingBox = graph.window().margin().left() + graph.window().border() + graph.window().padding().left(),
                plotBoxWidth = graph.paddingBox().width() - this.margin().right() - this.margin().left(),
                plotBoxHeight = graph.paddingBox().height() - this.margin().top() - this.margin().bottom(),
                border;

            if (this.border() > 0) {
                border = paper.rect(paddingBox + this.margin().left(),
                                    paddingBox + this.margin().right(),
                                    plotBoxWidth,
                                    plotBoxHeight)
                    .attr({"fill-opacity" : 0,
                           "stroke-opacity" : 1,
                           "stroke" : this.bordercolor().getHexString("#"),
                           "stroke-width": this.border()});
                border.insertAfter(set);
                set.push(border);
            }

        });

    });

});
