window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Graph.respondsTo("normalize", function () {
            var i,
                haxisCount = 0,
                vaxisCount = 0;

            for (i = 0; i < this.axes().size(); i++) {
                if (this.axes().at(i).orientation() === ns.Axis.HORIZONTAL) {
                    haxisCount++;
                } else if (this.axes().at(i).orientation() === ns.Axis.VERTICAL) {
                    vaxisCount++;
                }
            }

            if (haxisCount === 0) {
                this.axes().add(new ns.Axis(ns.Axis.HORIZONTAL));
            }
            if (vaxisCount === 0) {
                this.axes().add(new ns.Axis(ns.Axis.VERTICAL));
            }
        });

    });

});
