window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Axis.respondsTo("render", function (graph) {
            var axis = {
                "orientation" : this.orientation().toString(),
                "length"      : this.pixelLength(),
                "color"       : this.color().getHexString("#"),
                "labeler"     : {
                    "ticks"  : [],
                    "labels" : []
                }
            };
            this.prepareRender(undefined);

            // NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //   below are relative to the coordinate system of that box.
            if (this.orientation() === ns.Axis.HORIZONTAL) {
                axis.x = this.parallelOffset();
                axis.y = this.perpOffset();
            } else {
                axis.x = this.perpOffset();
                axis.y = this.parallelOffset();
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
                            axis.labeler.ticks.push({
                                "x"      : a,
                                "y"      : this.perpOffset() + this.tickmax(),
                                "length" : this.tickmax() - this.tickmin()
                            });
                        } else {
                            axis.labeler.ticks.push({
                                "x"      : this.perpOffset() + this.tickmax(),
                                "y"      : a,
                                "length" : this.tickmax() - this.tickmin()
                            });
                        }
                        axis.labeler.labels.push(this.currentLabeler().renderLabel({}, v));
                    }
                }
            }

            return axis;

        });

    });

});
