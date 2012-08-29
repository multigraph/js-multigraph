window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.hasA("x0").which.isA("number");
        Graph.hasA("y0").which.isA("number");

        Graph.respondsTo("render", function (context, width, height) {
            var i;
            context.fillStyle = this.window().bordercolor().getHexString("#");
            var m = this.window().margin().left();
            context.fillRect(m,m,width-2*m,height-2*m);

            var mb = m + this.window().border();

            context.fillStyle = this.background().color().getHexString("#");
            context.fillRect(mb,mb,width-2*mb,height-2*mb);
            this.x0( this.window().margin().left()  + this.window().border() + this.window().padding().left() + this.plotarea().margin().left() );
            this.y0( this.window().margin().bottom() + this.window().border() + this.window().padding().bottom() + this.plotarea().margin().bottom() );

            context.transform(1,0,0,1,this.x0(),this.y0());
            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).renderGrid(this, context);
            }

            for (i=0; i<this.plots().size(); ++i) {
                this.plots().at(i).render(this, context);
            }

            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).render(this, context);
            }

        });

    });

});
