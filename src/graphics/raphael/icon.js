window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        ns.Icon.respondsTo("renderBorder", function (graphicsContext, x, y, opacity) {
            graphicsContext.set.push(
                graphicsContext.paper.rect(x, y, this.width(), this.height())
                    .attr({"stroke": "rgba(0, 0, 0, 1)"})
            );
        });
    });
});
