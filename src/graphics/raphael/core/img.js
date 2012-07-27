window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Img.respondsTo("render", function (graph, paper) {
            var that = this,
                image = new Image(),
                paddingLeft,
                paddingTop,
                plotLeft,
                plotTop,
                ax,
                ay,
                bx,
                by,
                x,
                y;

            image.onload = function () {
                ax = window.multigraph.math.util.interp(that.anchor().x(), -1, 1, 0, image.width);
                ay = window.multigraph.math.util.interp(that.anchor().y(), 1, -1, 0, image.height);
                paddingLeft = graph.window().margin().left() + graph.window().border();
                paddingTop = graph.window().margin().top() + graph.window().border();
                plotLeft = paddingLeft + graph.window().padding().left() + graph.plotarea().margin().left() + graph.plotarea().border();
                plotTop = paddingTop + graph.window().padding().top() + graph.plotarea().margin().top() + graph.plotarea().border();
                if (that.frame() === "plot") {
                    bx = plotLeft + window.multigraph.math.util.interp(that.base().x(), -1, 1, 0, graph.plotBox().width());
                    by = plotTop + window.multigraph.math.util.interp(that.base().y(), 1, -1, 0, graph.plotBox().height());
                } else {
                    bx = paddingLeft + window.multigraph.math.util.interp(that.base().x(), -1, 1, 0, graph.paddingBox().width());
                    by = paddingTop + window.multigraph.math.util.interp(that.base().y(), 1, -1, 0, graph.paddingBox().height());
                }
                x = bx + that.position().x() - ax;
                y = by + that.position().y() - ay;
                paper.image(that.src(), x, y, image.width, image.height);
            };

            image.src = this.src();
        });

    });

});
