window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        ns.PointlineRenderer.hasA("first");
        ns.PointlineRenderer.hasA("context");

        ns.PointlineRenderer.respondsTo("begin", function(context) {
            this.context(context);
            this.first(true);
            context.beginPath();
        });
        ns.PointlineRenderer.respondsTo("dataPoint", function(datap) {
            var p = this.transformPoint(datap);
            if (this.first()) {
		this.context().moveTo(p[0], p[1]);
                this.first(false);
            } else {
		this.context().lineTo(p[0], p[1]);
            }
        });
        ns.PointlineRenderer.respondsTo("end", function() {
            var color = this.getOptionValue("linecolor");
            var linewidth = this.getOptionValue("linewidth");
            this.context().strokeStyle = color.getHexString('#');
            this.context().lineWidth = linewidth;
            this.context().stroke();
            this.context().closePath();
        });

    });

});
