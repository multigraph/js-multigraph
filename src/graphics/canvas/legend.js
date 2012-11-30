window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        ns.Legend.respondsTo("begin", function (context) {
            context.save();
            context.transform(1, 0, 0, 1, this.x(), this.y());
        });

        ns.Legend.respondsTo("end", function (context) {
            context.restore();
        });

        ns.Legend.respondsTo("renderLegend", function (context) {
            context.save();
            if (this.border() > 0) {
                context.strokeStyle = this.bordercolor().toRGBA();
                context.strokeRect(this.border()/2, this.border()/2, this.width() - this.border()/2, this.height() - this.border()/2);
            }

            context.fillStyle = this.color().toRGBA(this.opacity());
            context.fillRect(this.border(), this.border(), this.width() - (2 * this.border()), this.height() - (2 * this.border()));
            context.restore();
        });

        ns.Legend.respondsTo("renderLabel", function (label, context, x, y) {
            context.save();
            context.fillStyle = "rgba(0, 0, 0, 1)";
            context.transform(1, 0, 0, -1, 0, y + this.maxLabelHeight()/2 - label.origHeight()/2);
            context.fillText(label.string(), x, 0);
            context.restore();
        });

    });

});

