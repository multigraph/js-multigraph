window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        ns.PointlineRenderer.hasA("first");
        ns.PointlineRenderer.hasA("paper");
        ns.PointlineRenderer.hasA("set");
        ns.PointlineRenderer.hasA("path");

        ns.PointlineRenderer.respondsTo("begin", function (graphicsContext) {
            this.paper(graphicsContext.paper);
            this.set(graphicsContext.set);
            this.first(true);
        });
        ns.PointlineRenderer.respondsTo("dataPoint", function (datap) {
            var p = this.transformPoint(datap);
            if (this.first()) {
		this.path("M" + p[0] + "," + p[1]);
                this.first(false);
            } else {
		this.path(this.path() + "L" + p[0] + "," + p[1]);
            }
        });
        ns.PointlineRenderer.respondsTo("end", function () {
            this.set().push( this.paper().path(this.path())
                             .attr({"stroke":"#0000ff"}));
        });

    });

});
