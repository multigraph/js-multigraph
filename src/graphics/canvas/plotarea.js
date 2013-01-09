window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Plotarea.respondsTo("render", function (graph, context) {
            if (this.color() !== null) {
                context.save();
                context.fillStyle = this.color().getHexString("#");
                context.fillRect(0,0,graph.plotBox().width(), graph.plotBox().height());
                context.restore();
            }

            if (this.border() > 0) {
                var border = this.border();
                context.save();
                context.lineWidth = border;
                context.strokeStyle = this.bordercolor().getHexString("#");
                context.strokeRect(-border/2, -border/2, graph.plotBox().width() + border, graph.plotBox().height() + border);
                context.restore();
            }
        });

    });

});

