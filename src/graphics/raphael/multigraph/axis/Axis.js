if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.raphaelMixin.add(function(ns) {

        ns.Axis.respondsTo("render", function(graph) {
            // NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //   below are relative to the coordinate system of that box.
            if (this.orientation() == ns.Axis.HORIZONTAL) {
                //moveTo(this.parallelOffset(), this.perpOffset());
                //lineTo(this.parallelOffset() + this.pixelLength(), this.perpOffset());
                console.log("drawing horizontal axis from (" +
                            this.parallelOffset() + ", " + this.perpOffset() +
                            ")  to  (" +
                            (this.parallelOffset() + this.pixelLength()) + ", " + this.perpOffset() + ")");
                //moveTo(this.parallelOffset(), this.perpOffset());
                //lineTo(this.parallelOffset() + this.pixelLength(), this.perpOffset());

            } else {
                console.log("drawing vertical axis from (" +
                            this.perpOffset() + ", " + this.parallelOffset() +
                            ")  to  (" +
                            this.perpOffset() + ", " + (this.parallelOffset() + this.pixelLength()) + ")");
                //moveTo(this.perpOffset(), this.parallelOffset());
                //lineTo(this.perpOffset(), this.parallelOffset() + this.pixelLength());
            }
        });

    });

}(window.multigraph));
