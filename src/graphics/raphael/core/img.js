if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.raphaelMixin.add(function (ns) {

        ns.Background.Img.respondsTo("render", function (graph, paper) {
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
                ax = ns.math.util.interp(that.anchor().x(), -1, 1, 0, image.width);
                ay = ns.math.util.interp(that.anchor().y(), 1, -1, 0, image.height);
                paddingLeft = graph.window().margin().left() + graph.window().border();
                paddingTop = graph.window().margin().top() + graph.window().border();
                plotLeft = paddingLeft + graph.window().padding().left() + graph.plotarea().margin().left() + graph.plotarea().border();
                plotTop = paddingTop + graph.window().padding().top() + graph.plotarea().margin().top() + graph.plotarea().border();
                if (that.frame() === "plot") {
                    bx = plotLeft + ns.math.util.interp(that.base().x(), -1, 1, 0, graph.plotBox().width());
                    by = plotTop + ns.math.util.interp(that.base().y(), 1, -1, 0, graph.plotBox().height());
                } else {
                    bx = paddingLeft + ns.math.util.interp(that.base().x(), -1, 1, 0, graph.paddingBox().width());
                    by = paddingTop + ns.math.util.interp(that.base().y(), 1, -1, 0, graph.paddingBox().height());
                }
                x = bx + that.position().x() - ax;
                y = by + that.position().y() - ay;
                paper.image(that.src(), x, y, image.width, image.height);
            };

            image.src = this.src();
        });

    });

}(window.multigraph));
