if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.raphaelMixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.respondsTo("render", function (paper, width, height) {
            var windowMarginLeft = this.window().margin().left(),
                windowBorder = this.window().border(),
                mb = windowMarginLeft + windowBorder,
                x0 = windowMarginLeft  + windowBorder + this.window().padding().left() + this.plotarea().margin().left(),
                y0 = this.window().margin().bottom() + windowBorder + this.window().padding().bottom() + this.plotarea().margin().bottom(),
                axesSet = paper.set(),
                i;

            paper.rect(windowMarginLeft,windowMarginLeft,width-2*windowMarginLeft,height-2*windowMarginLeft)
                .attr({"fill" : this.window().bordercolor().getHexString("#")})
                .transform("S 1, -1, 0, " + (height/2));
            
            paper.rect(mb,mb,width-2*mb,height-2*mb)
                .attr({"fill" : this.background().color().getHexString("#")})
                .transform("S 1, -1, 0, " + (height/2));
            
            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).render(this, paper, axesSet);
            }
            axesSet.transform("S 1, -1, 0, " + (height/2) + " t " + x0 + ", " + y0);
        });

    });

}(window.multigraph));
