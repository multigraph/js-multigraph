window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.respondsTo("render", function (paper, width, height) {
            var windowMarginLeft = this.window().margin().left(),
                windowBorder = this.window().border(),
                mb = windowMarginLeft + windowBorder,
                paddingBox = mb + this.window().padding().left(),
                plotBoxWidth = this.paddingBox().width() - this.plotarea().margin().right() - this.plotarea().margin().left(),
                plotBoxHeight = this.paddingBox().height() - this.plotarea().margin().top() - this.plotarea().margin().bottom(),
                x0 = paddingBox + this.plotarea().margin().left() + this.plotarea().border(),
                y0 = this.window().margin().bottom() + windowBorder + this.window().padding().bottom() + this.plotarea().margin().bottom() + this.plotarea().border(),
                axesSet = paper.set(),
                i;

            paper.rect(windowMarginLeft,windowMarginLeft,width-2*windowMarginLeft,height-2*windowMarginLeft)
                .attr({"fill" : this.window().bordercolor().getHexString("#")})
                .transform("S 1, -1, 0, " + (height/2));

            this.background().render(paper, width, height, mb, this, axesSet);

            paper.rect(paddingBox + this.plotarea().margin().left(),
                       paddingBox + this.plotarea().margin().right(),
                       plotBoxWidth,
                       plotBoxHeight)
                .attr({"fill-opacity" : 0,
                       "stroke-opacity" : 1,
                       "stroke" : this.plotarea().bordercolor().getHexString("#"),
                       "stroke-width": this.plotarea().border()})
                .transform("S 1, -1, 0, " + (height/2));
            
            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).render(this, paper, axesSet);
            }
            axesSet.transform("S 1, -1, 0, " + (height/2) + " t " + x0 + ", " + y0);
        });

    });

});
