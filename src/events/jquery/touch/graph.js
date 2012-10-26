window.multigraph.util.namespace("window.multigraph.events.jquery.touch", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, errorHandler) {
        var Graph = ns.core.Graph;
        var Axis  = ns.core.Axis;

        Graph.hasA("dragStarted").which.isA("boolean");
        Graph.hasA("dragOrientation").which.validatesWith(Axis.Orientation.isInstance);
        Graph.hasA("dragAxis").which.validatesWith(function (a) {
            return a instanceof Axis;
        });

        Graph.respondsTo("pauseAllData", function () {
            var i;
            // pause all this graph's data sources:
            for (i=0; i<this.data().size(); ++i) {
                this.data().at(i).pause();
            }
        });
        Graph.respondsTo("doDragReset", function () {
            var i;
            this.dragStarted(false);
            this.pauseAllData();
        });
        Graph.respondsTo("resumeAllData", function () {
            var i;
            // resume all this graph's data sources:
            for (i=0; i<this.data().size(); ++i) {
                this.data().at(i).resume();
            }
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

        Graph.hasA("mouseWheelTimer").which.defaultsTo(null);

        Graph.respondsTo("doWheelZoom", function (multigraph, x, y, delta) {
            var i = 0,
                that = this;
            try {
                this.pauseAllData();
                var axis = this.findNearestAxis(x, y);
                if (axis.orientation() === Axis.HORIZONTAL) {
                    axis.doZoom(x, 4*delta);
                } else {
                    axis.doZoom(y, 4*delta);
                }
                multigraph.redraw();

                // resume data fetching after .5 seconds of no mouse wheel motion:
                if (this.mouseWheelTimer() !== null) {
                    clearTimeout(this.mouseWheelTimer());
                    this.mouseWheelTimer(null);
                }
                this.mouseWheelTimer(setTimeout(function() {
                    that.resumeAllData();
                }, 500)); 
            } catch (e) {
                errorHandler(e);
            }
        });

        /**
         * Compute the distance from an axis to a point.  The point
         * (x,y) is expressed in pixel coordinates in the same
         * coordinate system as the axis.
         * 
         * We use two different kinds of computations depending on
         * whether the point lies inside or outside the region bounded
         * by the two lines perpendicular to the axis through its
         * endpoints.  If the point lies inside this region, the
         * distance is simply the difference in the perpendicular
         * coordinate of the point and the perpendicular coordinate of
         * the axis.
         * 
         * If the point lies outside the region, then the distance is
         * the L2 distance between the point and the closest endpoint
         * of the axis.
         */
        var axisDistanceToPoint = function (axis, x, y) {
            var perpCoord     = (axis.orientation() === Axis.HORIZONTAL) ? y : x;
            var parallelCoord = (axis.orientation() === Axis.HORIZONTAL) ? x : y;
            if (parallelCoord < axis.parallelOffset()) {
                // point is under or left of the axis; return L2 distance to bottom or left axis endpoint
                return l2dist(parallelCoord, perpCoord, axis.parallelOffset(), axis.perpOffset());
            }
            if (parallelCoord > axis.parallelOffset() + axis.pixelLength()) {
                // point is above or right of the axis; return L2 distance to top or right axis endpoint
                return l2dist(parallelCoord, perpCoord, axis.parallelOffset()+axis.pixelLength(), axis.perpOffset());
            }
            // point is between the axis endpoints; return difference in perpendicular coords
            return Math.abs(perpCoord - axis.perpOffset());
        };

        var l2dist = function (x1, y1, x2, y2) {
            var dx = x1 - x2;
            var dy = y1 - y2;
            return Math.sqrt(dx*dx + dy*dy);
        };

        Graph.respondsTo("findNearestAxis", function (x, y, orientation) {
            var foundAxis = null,
                mindist = 9999,
                i,
                axes = this.axes(),
                naxes = this.axes().size(),
                axis,
                d;
            for (i = 0; i < naxes; ++i) {
                axis = axes.at(i);
                if ((orientation === undefined) ||
                    (orientation === null) ||
                    (axis.orientation() === orientation)) {
                    d = axisDistanceToPoint(axis, x, y);
                    if (foundAxis===null || d < mindist) {
                        foundAxis = axis;
                        mindist = d;
                    }
                }
            }
            return foundAxis;
        });


    });

});
