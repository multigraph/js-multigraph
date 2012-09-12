window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        ns.Icon.respondsTo("renderBorder", function (graphicsContext, x, y, opacity) {
            graphicsContext.paper.rect(x, y, this.width(), this.height())
                .attr({"stroke": "#000000"})
                .transform(graphicsContext.transformString);
        });
    });
});