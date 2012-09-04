window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Plot.respondsTo("render", function(graph, graphicsContext) {
            // graphicsContext is an optional argument passed to Plot.render() by the
            // graphics driver, and used by that driver's implementation of Renderer.begin().
            // It can be any objectded by the driver -- usually some kind of graphics
            // context object.  It can also be omitted if a driver does not need it.
            var data = this.data().arraydata();
            if (! data) { return; }

            var haxis = this.horizontalaxis();
            var vaxis = this.verticalaxis();

            var variableIds = [];
            var i;
            for (i=0; i<this.variable().size(); ++i) {
                variableIds.push( this.variable().at(i).id() );
            }

            var iter = data.getIterator(variableIds, haxis.dataMin(), haxis.dataMax(), 0);

            var renderer = this.renderer();
            renderer.setUpMissing(); //TODO: this is awkward -- figure out a better way!
            renderer.begin(graphicsContext);
            while (iter.hasNext()) {
                var datap = iter.next();
                renderer.dataPoint(datap);
            }
            return renderer.end();

        });

    });

});
