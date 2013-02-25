window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.ConstantPlot.respondsTo("redraw", function () {
            var haxis = this.horizontalaxis(),
                renderer = this.renderer(),
                constantValue = this.constantValue();

            if (!haxis.hasDataMin() || !haxis.hasDataMax()) {
                return;
            }

            renderer.beginRedraw();
            renderer.dataPoint([ haxis.dataMin(), constantValue ]);
            renderer.dataPoint([ haxis.dataMax(), constantValue ]);
            renderer.endRedraw();
        });

    });

});
