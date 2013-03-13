window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Img.hasA("image").which.defaultsTo(function () {return new Image();});
        window.multigraph.core.Img.hasA("fetched").which.defaultsTo(false);

        window.multigraph.core.Img.respondsTo("render", function (graph, context, width, height) {
            if (this.fetched()) {
                var interp      = window.multigraph.math.util.interp,
                    image       = this.image(),
                    graphWindow = graph.window(),
                    plotarea    = graph.plotarea(),
                    ax = interp(this.anchor().x(), -1, 1, 0, image.width),
                    ay = interp(this.anchor().y(), 1, -1, 0, image.height),
                    paddingLeft = graphWindow.margin().left() + graphWindow.border(),
                    paddingTop  = graphWindow.margin().top() + graphWindow.border(),
                    plotLeft = paddingLeft + graphWindow.padding().left() + plotarea.margin().left() + plotarea.border(),
                    plotTop  = paddingTop + graphWindow.padding().top() + plotarea.margin().top() + plotarea.border(),
                    bx, by,
                    x, y;
                if (this.frame() === ns.Img.PLOT) {
                    bx = plotLeft + interp(this.base().x(), -1, 1, 0, graph.plotBox().width());
                    by = plotTop + interp(this.base().y(), 1, -1, 0, graph.plotBox().height());
                } else {
                    bx = paddingLeft + interp(this.base().x(), -1, 1, 0, graph.paddingBox().width());
                    by = paddingTop + interp(this.base().y(), 1, -1, 0, graph.paddingBox().height());
                }
                x = bx + this.position().x() - ax;
                y = by + this.position().y() - ay;
                context.save();
                context.transform(1, 0, 0, -1, 0, height);
                context.drawImage(image, x, y, image.width, image.height);
                context.restore();
            } else {
                var that = this;
                this.image().onload = function () {
                    that.fetched(true);
                    context.save();
                    context.setTransform(1, 0, 0, -1, 0, height);
                    graph.render(context, width, height);
                    context.restore();
                };
                this.image().src = this.src();
            }
        });

    });

});
