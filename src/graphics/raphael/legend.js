window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        ns.Legend.respondsTo("begin", function (graphicsContext) {
            graphicsContext.transformString += "t" + this.x() + "," + this.y();
        });

        ns.Legend.respondsTo("end", function (graphicsContext) {
            // no-op
        });

        ns.Legend.respondsTo("renderLegend", function (graphicsContext) {
            graphicsContext.paper.rect(0, 0, this.width(), this.height())
                .attr({"fill" : this.bordercolor().getHexString("#")})
                .transform(graphicsContext.transformString);

            graphicsContext.paper.rect(this.border(), this.border(), this.width() - (2 * this.border()), this.height() - (2 * this.border()))
                .attr({"fill" : this.color().getHexString("#")})
                .transform(graphicsContext.transformString);

        });

        ns.Legend.respondsTo("renderLabel", function (label, graphicsContext, x, y) {
            graphicsContext.paper.text(x, y, label)
                .transform(graphicsContext.transformString + "t0," + (this.maxLabelHeight()/2) + "s1,-1");

        });

    });

});