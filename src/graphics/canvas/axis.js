window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        ns.Axis.respondsTo("renderGrid", function(graph, graphicsContext) {
            this.prepareRender(graphicsContext);
            // draw the grid lines here
        });

        ns.Axis.respondsTo("render", function(graph, context) {
            //NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //      below are relative to the coordinate system of that box.

            //
            // Render the axis line itself
            //
            context.beginPath();
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

            //
            // Render the tick marks and labels
            //
            if (this.hasDataMin() && this.hasDataMax()) { // but skip if we don't yet have data values
                if (this.currentLabeler()) {
                    context.beginPath();
                    context.fillStyle = '#000000';
                    this.currentLabeler().prepare(this.dataMin(), this.dataMax());
                    while (this.currentLabeler().hasNext()) {
                        var v = this.currentLabeler().next();
                        var a = this.dataValueToAxisValue(v);
                        if (this.orientation() === ns.Axis.HORIZONTAL) {
                            context.moveTo(a, this.perpOffset()+this.tickmax());
                            context.lineTo(a, this.perpOffset()+this.tickmin());
                        } else {
                            context.moveTo(this.perpOffset()+this.tickmin(), a);
                            context.lineTo(this.perpOffset()+this.tickmax(), a);
                        }
                        this.currentLabeler().renderLabel(context, v);
		    }
                    context.stroke();
                }
            }

        });

    });

});
