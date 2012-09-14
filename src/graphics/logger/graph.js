window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.hasA("x0").which.isA("number");
        Graph.hasA("y0").which.isA("number");
        Graph.hasA("logger");

        Graph.respondsTo("render", function (width, height) {
            var windowBorder = this.window().border(),
                i;

            this.x0( this.window().margin().left() + windowBorder + this.window().padding().left() + this.plotarea().margin().left() + this.plotarea().border() );
            this.y0( this.window().margin().bottom() + windowBorder + this.window().padding().bottom() + this.plotarea().margin().bottom() + this.plotarea().border() );
            
            this.window().render(this, width, height);

            this.background().render(this, width, height);

            this.plotarea().render(this);

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).render(this);
            }

            for (i = 0; i < this.plots().size(); ++i) {
                this.plots().at(i).render(this, {});
            }

        });

        Graph.respondsTo("dumpLog", function () {
            var output = "",
                i;

            output += this.window().dumpLog();
            output += this.background().dumpLog();
            output += this.plotarea().dumpLog();

            for (i = 0; i < this.axes().size(); ++i) {
                output += this.axes().at(i).dumpLog();
            }

            for (i = 0; i < this.plots().size(); ++i) {
                output += this.plots().at(i).dumpLog();
            }

            return output;
        });

    });

});
