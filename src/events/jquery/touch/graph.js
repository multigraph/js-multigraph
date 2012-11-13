window.multigraph.util.namespace("window.multigraph.events.jquery.touch", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, errorHandler) {
        var Graph = ns.core.Graph;
        var Axis  = ns.core.Axis;

        Graph.respondsTo("doFirstPinchZoom", function (multigraph, bx, by, dx, dy, totalx, totaly) {
// TODO: this try...catch is just to remind myself how to apply, make sure this is correct later
            try {
                if (!this.dragStarted()) {
                    if (totalx > totaly) {
                        this.dragOrientation(Axis.HORIZONTAL);
                    } else {
                        this.dragOrientation(Axis.VERTICAL);
                    }
                    this.dragAxis(this.findNearestAxis(bx, by, this.dragOrientation()));
                    if (this.dragAxis() === null) {
                        this.dragOrientation( (this.dragOrientation() === Axis.HORIZONTAL) ? Axis.VERTICAL : Axis.HORIZONTAL );
                        this.dragAxis( this.findNearestAxis(bx, by, this.dragOrientation()) );
                    }
                    this.dragStarted(true);
                }

                // do the action
                if (this.dragOrientation() === Axis.HORIZONTAL) {
                    this.dragAxis().doZoom(bx, dx);
                } else {
                    this.dragAxis().doZoom(by, dy);
                }

                // draw everything
                multigraph.redraw();
            } catch (e) {
                errorHandler(e);
            }
        });

    });

});
