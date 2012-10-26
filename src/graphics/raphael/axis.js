window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Axis.respondsTo("renderGrid", function (graph, paper, set) {
            var text = paper.text(-8000, -8000, "foo"),
                path = "";

            this.prepareRender(text);

            // draw the grid lines
            if (this.hasDataMin() && this.hasDataMax()) { // skip if we don't yet have data values
                if (this.grid().visible()) { // skip if grid lines aren't turned on
                    if (this.labelers().size() > 0 && this.currentLabelDensity() <= 1.5) {
                        this.currentLabeler().prepare(this.dataMin(), this.dataMax());
                        while (this.currentLabeler().hasNext()) {
                            var v = this.currentLabeler().next(),
                                a = this.dataValueToAxisValue(v);
                            if (this.orientation() === ns.Axis.HORIZONTAL) {
                                path += "M" + a + "," + this.perpOffset();
                                path += "L" + a + "," + (graph.plotBox().height() - this.perpOffset());
                            } else {
                                path += "M" + this.perpOffset() + "," + a;
                                path += "L" + (graph.plotBox().width() - this.perpOffset()) + "," + a;
                            }
                        }
                        
                        set.push( paper.path(path)
                                .attr({
                                    "stroke-width" : 1,
                                    "stroke"       : this.grid().color().getHexString("#")
                                }));
                    }
                }
            }

            text.remove();

        });

        ns.Axis.respondsTo("render", function (graph, paper, set) {
            var text = paper.text(-8000, -8000, "foo"),
                tickmarkPath = "";

            // NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //   below are relative to the coordinate system of that box.
            if (this.orientation() === ns.Axis.HORIZONTAL) {
                set.push( paper.path("M " + this.parallelOffset() + ", " + this.perpOffset() + 
                                     " l " + this.pixelLength() + ", 0")
                          .attr({"stroke":this.color().getHexString("#")}));

            } else {
                set.push( paper.path("M " + this.perpOffset() + ", " + this.parallelOffset() +
                                     " l 0, " + this.pixelLength() )
                          .attr({"stroke":this.color().getHexString("#")}));
            }

            //
            // Render the tick marks and labels
            //
            if (this.hasDataMin() && this.hasDataMax()) { // but skip if we don't yet have data values
                if (this.currentLabeler()) {
                    var tickAttrs = {};
                    if (this.tickcolor() !== undefined && this.tickcolor() !== null) {
                        tickAttrs.stroke = this.tickcolor().getHexString('#');
                    } else {
                        tickAttrs.stroke = "#000";
                    }
                    this.currentLabeler().prepare(this.dataMin(), this.dataMax());
                    while (this.currentLabeler().hasNext()) {
                        var v = this.currentLabeler().next();
                        var a = this.dataValueToAxisValue(v);
                        if (this.orientation() === ns.Axis.HORIZONTAL) {
                            tickmarkPath += "M" + a + "," + (this.perpOffset() + this.tickmax());
                            tickmarkPath += "L" + a + "," + (this.perpOffset() + this.tickmin());
                        } else {
                            tickmarkPath += "M" + (this.perpOffset() + this.tickmin()) + "," + a;
                            tickmarkPath += "L" + (this.perpOffset() + this.tickmax()) + "," + a;
                        }
                        this.currentLabeler().renderLabel({ "paper"    : paper,
                                                            "set"      : set,
                                                            "textElem" : text
                                                          }, v);
                    }
                    set.push(
                        paper.path(tickmarkPath).attr(tickAttrs)
                    );
                }
            }

            text.remove();

        });

    });

});
