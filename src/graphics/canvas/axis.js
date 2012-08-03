window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        ns.Axis.respondsTo("render", function(graph, context) {

            context.beginPath();

            // NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //   below are relative to the coordinate system of that box.
            if (this.orientation() === ns.Axis.HORIZONTAL) {
                context.moveTo(this.parallelOffset(), this.perpOffset());
                context.lineTo(this.parallelOffset() + this.pixelLength(), this.perpOffset());

            } else {
                context.moveTo(this.perpOffset(), this.parallelOffset());
                context.lineTo(this.perpOffset(), this.parallelOffset() + this.pixelLength());
            }

            context.strokeStyle = this.color().getHexString("#");
            context.stroke();
            context.closePath();

        });

    });

});
