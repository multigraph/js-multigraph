if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.canvasMixin.add(function(ns) {

        ns.Axis.respondsTo("render", function(graph, context) {

            var x0 = graph.window().margin().left()  + graph.window().border() + graph.window().padding().left() + graph.plotarea().margin().left();
            var y0 = graph.window().margin().bottom() + graph.window().border() + graph.window().padding().bottom() + graph.plotarea().margin().bottom();

            var h = graph.windowBox().height();
            

            context.beginPath();

            // NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //   below are relative to the coordinate system of that box.
            if (this.orientation() === ns.Axis.HORIZONTAL) {
                console.log("drawing horizontal axis from (" +
                            this.parallelOffset() + ", " + this.perpOffset() +
                            ")  to  (" +
                            (this.parallelOffset() + this.pixelLength()) + ", " + this.perpOffset() + ")");
                //moveTo(this.parallelOffset(), this.perpOffset());
                //lineTo(this.parallelOffset() + this.pixelLength(), this.perpOffset());


                context.moveTo(x0 + this.parallelOffset(), h - (y0 + this.perpOffset()));
                context.lineTo(x0 + this.parallelOffset() + this.pixelLength(), h - (y0 + this.perpOffset()));

            } else {
                console.log("drawing vertical axis from (" +
                            this.perpOffset() + ", " + this.parallelOffset() +
                            ")  to  (" +
                            this.perpOffset() + ", " + (this.parallelOffset() + this.pixelLength()) + ")");
                //moveTo(this.perpOffset(), this.parallelOffset());
                //lineTo(this.perpOffset(), this.parallelOffset() + this.pixelLength());

                context.beginPath();
                context.moveTo(x0 + this.perpOffset(), h - (y0 + this.parallelOffset()));
                context.lineTo(x0 + this.perpOffset(), h - (y0 + this.parallelOffset() + this.pixelLength()));
            }

            context.strokeStyle = "#FF0000";
            context.stroke();
            context.closePath();

        });

    });

}(window.multigraph));
