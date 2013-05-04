window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Axis.respondsTo("renderGrid", function (graph, context) {
            this.prepareRender(context);

            // draw the grid lines
            if (this.hasDataMin() && this.hasDataMax()) { // skip if we don't yet have data values
                if (this.grid().visible()) { // skip if grid lines aren't turned on
                    if (this.labelers().size() > 0 && this.currentLabelDensity() <= 1.5) {
                        var currentLabeler = this.currentLabeler(),
                            perpOffset     = this.perpOffset(),
                            plotBox        = graph.plotBox();
                        currentLabeler.prepare(this.dataMin(), this.dataMax());
                        context.beginPath();
                        while (currentLabeler.hasNext()) {
                            var v = currentLabeler.next(),
                                a = this.dataValueToAxisValue(v);
                            if (this.orientation() === ns.Axis.HORIZONTAL) {
                                context.moveTo(a, perpOffset);
                                context.lineTo(a, plotBox.height() - perpOffset);
                            } else {
                                context.moveTo(perpOffset, a);
                                context.lineTo(plotBox.width() - perpOffset, a);
                            }
                        }
                        context.strokeStyle = this.grid().color().getHexString("#");
                        context.stroke();
                    }
                }
            }
        });

        ns.Axis.respondsTo("render", function (graph, context) {
            var parallelOffset = this.parallelOffset(),
                perpOffset     = this.perpOffset(),
                pixelLength    = this.pixelLength(),
                currentLabeler = this.currentLabeler(),
                axisIsHorizontal = (this.orientation() === ns.Axis.HORIZONTAL);
            //NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //      below are relative to the coordinate system of that box.

            //
            // Render the axis line itself, unless its linewidth() property is 0.
            // TODO: modify this so that it correctly draws a line with the given
            // linewidth().  At the moment, it only makes a distinction between
            // lines of width 0, which aren't drawn at all, and lines with width > 0,
            // which are drawn with width 1.
            if (this.linewidth() > 0) {
                context.beginPath();
                if (axisIsHorizontal) {
                    context.moveTo(parallelOffset, perpOffset);
                    context.lineTo(parallelOffset + pixelLength, perpOffset);
                } else {
                    context.moveTo(perpOffset, parallelOffset);
                    context.lineTo(perpOffset, parallelOffset + pixelLength);
                }

                context.strokeStyle = this.color().getHexString("#");
                context.stroke();
            }

            //
            // Render the tick marks and labels
            //
            if (this.hasDataMin() && this.hasDataMax()) { // but skip if we don't yet have data values
                if (currentLabeler) {
                    var tickwidth = this.tickwidth(),
                        tickmin   = this.tickmin(),
                        tickmax   = this.tickmax(),
                        tickcolor = this.tickcolor();
                    context.beginPath();
                    context.fillStyle = '#000000';
                    currentLabeler.prepare(this.dataMin(), this.dataMax());
                    while (currentLabeler.hasNext()) {
                        var v = currentLabeler.next(),
                            a = this.dataValueToAxisValue(v);
                        if (tickwidth > 0) {
                            if (tickcolor !== undefined && tickcolor !== null) {
                                context.strokeStyle = tickcolor.getHexString('#');
                            }
                            if (axisIsHorizontal) {
                                context.moveTo(a, perpOffset+tickmax);
                                context.lineTo(a, perpOffset+tickmin);
                            } else {
                                context.moveTo(perpOffset+tickmin, a);
                                context.lineTo(perpOffset+tickmax, a);
                            }
                            if (tickcolor !== undefined && tickcolor !== null) {
                                context.restore();
                            }
                        }
                        currentLabeler.renderLabel(context, v);
                    }
                    context.stroke();
                }
            }

            //
            // Render the title
            //
            if (this.title()) {
                this.title().render(context);
            }

        });

    });

});
