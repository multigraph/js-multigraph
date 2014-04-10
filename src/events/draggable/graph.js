window.multigraph.util.namespace("window.multigraph.events.jquery.draggable", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, errorHandler) {
        var Graph = ns.core.Graph,
            Axis  = ns.core.Axis;

        Graph.hasA("dragStarted").which.isA("boolean");
        Graph.hasA("dragOrientation").which.validatesWith(Axis.Orientation.isInstance);
        Graph.hasA("dragAxis").which.validatesWith(function (a) {
            return a instanceof Axis;
        });

        Graph.respondsTo("doDragReset", function () {
            this.dragStarted(false);
            this.pauseAllData();
        });

        Graph.respondsTo("doDragDone", function () {
            this.resumeAllData();
        });

        Graph.respondsTo("doDrag", function (multigraph, bx, by, dx, dy, shiftKey) {
            var dragAxis        = this.dragAxis,
                dragOrientation = this.dragOrientation,
                HORIZONTAL = Axis.HORIZONTAL,
                VERTICAL   = Axis.VERTICAL;
// TODO: this try...catch is just to remind myself how to apply, make sure this is correct later
            try {
                if (!this.dragStarted()) {
                    if (Math.abs(dx) > Math.abs(dy)) {
                        dragOrientation(HORIZONTAL);
                    } else {
                        dragOrientation(VERTICAL);
                    }
                    dragAxis(this.findNearestAxis(bx, by, dragOrientation()));
                    if (dragAxis() === null) {
                        dragOrientation( (dragOrientation() === HORIZONTAL) ? VERTICAL : HORIZONTAL );
                        dragAxis( this.findNearestAxis(bx, by, dragOrientation()) );
                    }
                    this.dragStarted(true);
                }

                // do the action
                if (shiftKey) {
                    if (dragOrientation() === HORIZONTAL) {
                        dragAxis().doZoom(bx, dx);
                    } else {
                        dragAxis().doZoom(by, dy);
                    }
                } else {
                    if (dragOrientation() === HORIZONTAL) {
                        dragAxis().doPan(bx, dx);
                    } else {
                        dragAxis().doPan(by, dy);
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
