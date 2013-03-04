window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.DataPlot.respondsTo("redraw", function () {
            var data = this.data();
            if (!data) {
                return;
            }

            var haxis = this.horizontalaxis();

            if (!haxis.hasDataMin() || !haxis.hasDataMax()) {
                // if this plot's horizontal axis does not have a min or max value yet,
                // return immediately without doing anything
                return;
            }

            var variableIds = [],
                i;
            for (i = 0; i < this.variable().size(); ++i) {
                variableIds.push( this.variable().at(i).id() );
            }

            var iter = data.getIterator(variableIds, haxis.dataMin(), haxis.dataMax(), 1),
                renderer = this.renderer(),
                datap;

            renderer.beginRedraw();
            while (iter.hasNext()) {
                datap = iter.next();
                renderer.dataPoint(datap);
            }
            renderer.endRedraw();
        });

    });

});
