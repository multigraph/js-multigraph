window.multigraph.util.namespace("window.multigraph.events.jquery.draggable", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, errorHandler) {
        var Graph = ns.core.Graph;
        var Axis  = ns.core.Axis;

        Graph.hasA("dragStarted").which.isA("boolean");
        Graph.hasA("dragOrientation").which.validatesWith(Axis.Orientation.isInstance);
        Graph.hasA("dragAxis").which.validatesWith(function (a) {
            return a instanceof Axis;
        });

        Graph.respondsTo("doDragReset", function () {
            var i;
            this.dragStarted(false);
            this.pauseAllData();
        });

        Graph.respondsTo("doDragDone", function () {
            this.resumeAllData();
        });

        Graph.respondsTo("doDrag", function (multigraph, bx, by, dx, dy, shiftKey) {
            var i = 0;
// TODO: this try...catch is just to remind myself how to apply, make sure this is correct later
            try {
                if (!this.dragStarted()) {
                    if (Math.abs(dx) > Math.abs(dy)) {
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
                if (shiftKey) {
                    if (this.dragOrientation() === Axis.HORIZONTAL) {
                        this.dragAxis().doZoom(bx, dx);
                    } else {
                        this.dragAxis().doZoom(by, dy);
                    }
                } else {
                    if (this.dragOrientation() === Axis.HORIZONTAL) {
                        this.dragAxis().doPan(bx, dx);
                    } else {
                        this.dragAxis().doPan(by, dy);
                    }
                }


                // draw everything
                multigraph.redraw();
            } catch (e) {
                errorHandler(e);
            }
        });


    });

});
