window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Graph.respondsTo("normalize", function () {
            var i,
                haxisCount = 0,
                vaxisCount = 0,
                axisid;

            //
            // Handles missing horizontalaxis and vertical axis tags
            //
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

            //
            // Handles missing id's for axes
            //
            haxisCount = 0;
            vaxisCount = 0;
            for (i = 0; i < this.axes().size(); i++) {
                if (this.axes().at(i).orientation() === ns.Axis.HORIZONTAL) {
                    axisid = "x";
                    if (haxisCount > 0) {
                        axisid += haxisCount;
                    }
                    haxisCount++;
                } else if (this.axes().at(i).orientation() === ns.Axis.VERTICAL) {
                    axisid = "y";
                    if (vaxisCount > 0) {
                        axisid += vaxisCount;
                    }
                    vaxisCount++;
                }

                if (this.axes().at(i).id() === undefined) {
                    this.axes().at(i).id(axisid);
                }
            }

            //
            // normalizes the rest of the axis properties
            //
            for (i = 0; i < this.axes().size(); i++) {
                this.axes().at(i).normalize(this);
            }

        });

    });

});
