window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.respondsTo("render", function (context, width, height) {
            var i;

            this.window().render(context, width, height);

            this.background().render(this, context, width, height);

            context.transform(1,0,0,1,this.x0(),this.y0());

            this.plotarea().render(this, context);

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).renderGrid(this, context);
            }


            context.save();
            context.rect(0, 0, this.plotBox().width(), this.plotBox().height());
            context.clip();


            for (i = 0; i < this.plots().size(); ++i) {
                this.plots().at(i).render(this, context);
            }

            context.restore();

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).render(this, context);
            }

            this.legend().render(context);

            if (this.title()) {
                this.title().render(context);
            }
        });

    });

});
