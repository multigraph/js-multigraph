window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var DataPlot = ns.DataPlot;

        DataPlot.respondsTo("dumpLog", function () {
            if (this.renderer()) {
                return this.renderer().dumpLog();
            }
        });

    });

});
