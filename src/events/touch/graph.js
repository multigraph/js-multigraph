module.exports = function($, window, errorHandler) {
    var Graph = require('../../core/graph.js'),
        Axis = require('../../core/axis.js');

    if (typeof(Graph.doFirstPinchZoom)==="function") { return Graph; }

    Graph.respondsTo("doFirstPinchZoom", function (multigraph, bx, by, dx, dy, totalx, totaly) {
        var dragAxis = this.dragAxis,
            dragOrientation = this.dragOrientation,
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

    return Graph;
};
