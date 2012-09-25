window.multigraph.util.namespace("window.multigraph.events.jquery.mouse", function (ns) {
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
            // pause all this graph's data sources:
            for (i=0; i<this.data().size(); ++i) {
                this.data().at(i).pause();
            }
        });
        Graph.respondsTo("doDragDone", function () {
            var i;
            // unpause all this graph's data sources:
            for (i=0; i<this.data().size(); ++i) {
                this.data().at(i).resume();
            }
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
                    if (this.dragAxis() === undefined) {
                        this.dragOrientation( (this.dragOrientation() === Axis.HORIZONTAL) ? Axis.VERTICAL : Axis.HORIZONTAL );
                        this.dragAxis( this.findNearestAxis(bx, by, this.dragOrientation()) );
                    }
                    this.dragStarted(true);
                }

                // offset coordinates of base point by position of graph
                bx -= this.x0();
                by -= this.y0();

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

        var axisDistanceToPoint = function (axis, x, y) {
            var perpCoord     = (axis.orientation === Axis.HORIZONTAL) ? y : x;
            var parallelCoord = (axis.orientation === Axis.HORIZONTAL) ? x : y;
            if (parallelCoord < axis.parallelOffset) {
                return l2dist(parallelCoord, perpCoord, axis.parallelOffset, axis.perpOffset);
            }
            if (parallelCoord > axis.parallelOffset + axis.pixelLength) {
                return l2dist(parallelCoord, perpCoord, axis.parallelOffset+axis.pixelLength, axis.perpOffset);
            }
            return Math.abs(perpCoord - axis.perpOffset);
        };

        var l2dist = function (x1, y1, x2, y2) {
            var dx = x1 - x2;
            var dy = y1 - y2;
            return Math.sqrt(dx*dx + dy*dy);
        };

        Graph.respondsTo("findNearestAxis", function (x, y, orientation) {
            var foundAxis = undefined,
                mindist = 9999,
                i,
                axes = this.axes(),
                naxes = this.axes().size(),
                axis,
                d;
            for (i = 0; i < naxes; ++i) {
                axis = axes.at(i);
                if (axis.orientation() === orientation) {
                    d = axisDistanceToPoint(axis, x, y);
                    if (foundAxis===undefined || d < mindist) {
                        foundAxis = axis;
                        mindist = d;
                    }
                }
            }
            return foundAxis;
        });


    });

});
