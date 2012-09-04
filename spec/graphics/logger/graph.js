window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.hasA("x0").which.isA("number");
        Graph.hasA("y0").which.isA("number");

        Graph.respondsTo("render", function (width, height) {
            var windowBorder = this.window().border(),
                i,
                graph = {
                    "axes"  : [],
                    "plots" : []
                };


            this.x0( this.window().margin().left() + windowBorder + this.window().padding().left() + this.plotarea().margin().left() + this.plotarea().border() );
            this.y0( this.window().margin().bottom() + windowBorder + this.window().padding().bottom() + this.plotarea().margin().bottom() + this.plotarea().border() );
            
            graph.window = this.window().render(this, width, height);

            graph.background = this.background().render(this, width, height);

            graph.plotarea = this.plotarea().render(this);

            for (i = 0; i < this.axes().size(); ++i) {
                graph.axes.push(this.axes().at(i).render(this));
            }

            for (i = 0; i < this.plots().size(); ++i) {
                graph.plots.push(this.plots().at(i).render(this, {}));
            }

            return graph;
        });

    });

});
