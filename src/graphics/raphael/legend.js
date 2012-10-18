window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        ns.Legend.respondsTo("begin", function (graphicsContext) {
            // no-op
        });

        ns.Legend.respondsTo("end", function (graphicsContext) {
            graphicsContext.set.transform("t" + this.x() + "," + this.y() + "...");
        });

        ns.Legend.respondsTo("renderLegend", function (graphicsContext) {
            graphicsContext.set.push(
                graphicsContext.paper.rect(0, 0, this.width(), this.height())
                    .attr({
                        "stroke" : this.bordercolor().toRGBA(this.opacity()),
                        "fill"   : this.bordercolor().toRGBA(this.opacity())
                    }),

                graphicsContext.paper.rect(this.border(), this.border(), this.width() - (2 * this.border()), this.height() - (2 * this.border()))
                    .attr({
                        "stroke" : this.color().toRGBA(this.opacity()),
                        "fill"   : this.color().toRGBA(this.opacity())
                    })
            );
        });

        ns.Legend.respondsTo("renderLabel", function (label, graphicsContext, x, y) {
            graphicsContext.set.push(
                graphicsContext.paper.text(x, y, label)
                    .attr({
                        "fill" : "rgba(0, 0, 0, " + this.opacity() + ")"
                    })
                    .transform("t0," + (this.maxLabelHeight()/2) + "s1,-1")
            );

        });

    });

});
