if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.raphaelMixin.add(function (ns) {

        ns.Axis.respondsTo("render", function (graph, paper, set) {

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

        });

    });

}(window.multigraph));
