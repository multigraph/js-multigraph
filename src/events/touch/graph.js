window.multigraph.util.namespace("window.multigraph.events.jquery.touch", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, errorHandler) {

        ns.core.Graph.respondsTo("doFirstPinchZoom", function (multigraph, bx, by, dx, dy, totalx, totaly) {
            var dragAxis = this.dragAxis,
                dragOrientation = this.dragOrientation,
                Axis = ns.core.Axis,
                HORIZONTAL = Axis.HORIZONTAL,
                VERTICAL   = Axis.VERTICAL;

// TODO: this try...catch is just to remind myself how to apply, make sure this is correct later
            try {
                if (!this.dragStarted()) {
                    if (totalx > totaly) {
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
                if (dragOrientation() === HORIZONTAL) {
                    dragAxis().doZoom(bx, dx);
                } else {
                    dragAxis().doZoom(by, dy);
                }

                // draw everything
                multigraph.redraw();
            } catch (e) {
                errorHandler(e);
            }
        });

    });

});
