window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Legend = ns.Legend;

        Legend.hasA("previousX");
        Legend.hasA("previousY");
        Legend.hasA("set");

        Legend.respondsTo("begin", function (graphicsContext) {
            // no-op
        });

        Legend.respondsTo("end", function (graphicsContext) {
            var set = graphicsContext.set;
            set.transform("t" + this.x() + "," + this.y() + "...");
            this.set(set)
                .previousX(this.x())
                .previousY(this.y());
        });

        Legend.respondsTo("renderLegend", function (graphicsContext) {
            graphicsContext.set.push(
                graphicsContext.paper.rect(0, 0, this.width(), this.height())
                    .attr({
                        "stroke" : this.bordercolor().toRGBA(),
                        "stroke-width" : this.border(),
                        "fill"   : this.color().toRGBA(this.opacity())
                    })
            );
        });

        Legend.respondsTo("renderLabel", function (label, graphicsContext, x, y) {
            graphicsContext.set.push(
                graphicsContext.paper.text(x, y, label.string())
                    .attr({
                        "fill" : "rgba(0, 0, 0, 1)",
                        "text-anchor" : "start"
                    })
                    .transform("t0," + (this.maxLabelHeight()/2) + "s1,-1")
            );

        });

        Legend.respondsTo("redraw", function () {
            if (this.determineVisibility() === false) {
                return this;
            }

            var deltaX = this.x() - this.previousX(),
                deltaY = this.y() - this.previousY(),
                plotCount = 0,
                r, c;

            if (deltaX !== 0 || deltaY !== 0) {
                this.set().transform("...t" + deltaX + " " + deltaY);
                this.previousX(this.x())
                    .previousY(this.y());
            }

            for (r = 0; r < this.rows(); r++) {
                if (plotCount >= this.plots().size()) {
                    break;
                }
                for (c = 0; c < this.columns(); c++) {
                    if (plotCount >= this.plots().size()) {
                        break;
                    }
                    // Redraw the icon
                    this.plots().at(plotCount).renderer().redrawLegendIcon();

                    plotCount++;
                }
            }
            return this;
        });

    });

});
