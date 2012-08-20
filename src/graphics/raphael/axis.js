window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Axis.respondsTo("render", function (graph, paper, set, baseTransformString) {
            var text = paper.text(-8000,-8000,"foo"),
                tickmarkPath = "";
            this.prepareRender(text);

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
                        this.currentLabeler().renderLabel({"paper": paper,
                                                           "textElem": text,
                                                           "transformString": baseTransformString
                                                          }, v);
                    }
                    set.push(
                        paper.path(tickmarkPath)
                    );
                }
            }

            text.remove();

        });

    });

});
