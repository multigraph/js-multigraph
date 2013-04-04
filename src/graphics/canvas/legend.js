window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Legend = ns.Legend;

        Legend.respondsTo("begin", function (context) {
            context.save();
            context.transform(1, 0, 0, 1, this.x(), this.y());
        });

        Legend.respondsTo("end", function (context) {
            context.restore();
        });

        Legend.respondsTo("renderLegend", function (context) {
            var border = this.border();
            context.save();
            if (border > 0) {
                context.strokeStyle = this.bordercolor().toRGBA();
                context.strokeRect(border/2, border/2, this.width() - border/2, this.height() - border/2);
            }

            context.fillStyle = this.color().toRGBA(this.opacity());
            context.fillRect(border, border, this.width() - (2 * border), this.height() - (2 * border));
            context.restore();
        });

        Legend.respondsTo("renderLabel", function (label, context, x, y) {
            context.save();
            context.fillStyle = "rgba(0, 0, 0, 1)";
            context.transform(1, 0, 0, -1, 0, y + this.maxLabelHeight()/2 - label.origHeight()/2);
            context.fillText(label.string(), x, 0);
            context.restore();
        });

    });

});

