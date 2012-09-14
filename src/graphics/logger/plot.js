window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Plot = ns.Plot;

        Plot.respondsTo("dumpLog", function () {
            if (this.renderer()) {
                return this.renderer().dumpLog();
            }
        });

    });

});
