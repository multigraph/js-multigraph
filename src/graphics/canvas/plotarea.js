window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Plotarea.respondsTo("render", function (graph, context) {
            var plotBox = graph.plotBox(),
                border = this.border();

            if (this.color() !== null) {
                context.save();
                context.fillStyle = this.color().getHexString("#");
                context.fillRect(0, 0, plotBox.width(), plotBox.height());
                context.restore();
            }

            if (border > 0) {
                context.save();
                context.lineWidth = border;
                context.strokeStyle = this.bordercolor().getHexString("#");
                context.strokeRect(-border/2, -border/2, plotBox.width() + border, plotBox.height() + border);
                context.restore();
            }
        });

    });

});

