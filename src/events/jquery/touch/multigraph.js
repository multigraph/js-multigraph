window.multigraph.util.namespace("window.multigraph.events.jquery.touch", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var core = ns.core;
        var math = window.multigraph.util.namespace("window.multigraph.math");

        core.Multigraph.respondsTo("registerTouchEvents", function (target) {
            var previousTouches = [];
            var touchStarted = false;
            var dragStarted = false;
            var doubleTapStarted = false;
            var doubleTapSecondTapStarted = false;
            var pinchZoomStarted = false;

            var doubleTapTimeout;
            var breakpoint;

            var base;
            var multigraph = this;

            var $target = window.multigraph.jQuery(target);

            var touchLocationToGraphCoords = function (touch) {
                return new math.Point((touch.pageX - $target.offset().left) - multigraph.graphs().at(0).x0(),
                                      $target.height() - (touch.pageY - $target.offset().top) - multigraph.graphs().at(0).y0());
            };

            var handleTouchStart = function (jqueryEvent) {
                var e = jqueryEvent.originalEvent;
                e.preventDefault();

                if (e.touches.length === 1) {
                    base = touchLocationToGraphCoords(e.touches[0]);
                }

                // double tap
                if (e.touches.length === 1) {
                    if (previousTouches.length === 0) {
                        if (doubleTapStarted === true) {
                            doubleTapSecondTapStarted = true;
                        }
                        doubleTapStarted = true;
                        clearTimeout(doubleTapTimeout);
                        doubleTapTimeout = setTimeout(function () {
                                doubleTapStarted = false;
                                doubleTapSecondTapStarted = false;
                                clearTimeout(doubleTapTimeout);
                            }, 500);
                    }
                } else {
                    doubleTapStarted = false;
                    doubleTapSecondTapStarted = false;
                    clearTimeout(doubleTapTimeout);
                }

                // one finger drag
                if (e.touches.length === 1) {
                    dragStarted = true;
                } else {
                    dragStarted = false;
                }

                // pinch zoom
                if (e.touches.length === 2) {
                    pinchZoomStarted = true;
                } else {
                    pinchZoomStarted = false;
                }

                previousTouches = e.touches;

                touchStarted = false;
                multigraph.graphs().at(0).doDragDone();
            };

            var handleTouchMove = function (jqueryEvent) {
                var e = jqueryEvent.originalEvent;
                e.preventDefault();

                // one finger drag
                if (e.touches.length === 1 && dragStarted === true) {
                    handleDrag(e);
                }

                // pinch zoom
                if (e.touches.length === 2 && pinchZoomStarted === true) {
                    handlePinchZoom(e);
                }
                
                previousTouches = e.touches;
            };

            var handleTouchEnd = function (jqueryEvent) {
                var e = jqueryEvent.originalEvent;
                e.preventDefault();
                // double tap
                if (e.touches.length === 0 && previousTouches.length === 1) {
                    if (doubleTapSecondTapStarted === true) {
                        handleDoubleTap(e);
                        doubleTapStarted = false;
                        doubleTapSecondTapStarted = false;
                    } else if (doubleTapStarted === true) {
                        doubleTapSecondTapStarted = true;
                    }
                } else {
                    doubleTapStarted = false;
                    doubleTapSecondTapStarted = false;
                    clearTimeout(doubleTapTimeout);
                }
                
                // one finger drag
                if (e.touches.length === 1) {
                    dragStarted = true;
                } else {
                    dragStarted = false;
                }
                
                // pinch zoom
                if (e.touches.length === 2) {
                    pinchZoomStarted = true;
                } else {
                    pinchZoomStarted = false;
                }
                
                previousTouches = e.touches;

                touchStarted = false;
                multigraph.graphs().at(0).doDragDone();
            };

            var handleTouchLeave = function (jqueryEvent) {
                var e = jqueryEvent.originalEvent;
                e.preventDefault();
                doubleTapStarted = false;
                doubleTapSecondTapStarted = false;
                clearTimeout(doubleTapTimeout);
                dragStarted = false;
                pinchZoomStarted = false;
                previousTouches = e.touches;

                touchStarted = false;
                multigraph.graphs().at(0).doDragDone();
            };

            var handleDrag = function (e) {
                var touchLoc = touchLocationToGraphCoords(e.touches[0]);
                var previousLoc = touchLocationToGraphCoords(previousTouches[0]);
                var dx = touchLoc.x() - previousLoc.x();
                var dy = touchLoc.y() - previousLoc.y();
                if (multigraph.graphs().size() > 0) {
                    if (!touchStarted ) {
                        multigraph.graphs().at(0).doDragReset();
                    }
                    multigraph.graphs().at(0).doDrag(multigraph, base.x(), base.y(), dx, dy, false);
                }
                touchStarted = true;
            };

            var handleDoubleTap = function () {
                multigraph.graphs().at(0).doDragReset();                
                multigraph.graphs().at(0).doDrag(multigraph, base.x(), base.y(), 10, 0, true);
                multigraph.graphs().at(0).doDragReset();
                multigraph.graphs().at(0).doDrag(multigraph, base.x(), base.y(), 0, 10, true);
                multigraph.graphs().at(0).doDragReset();                
                multigraph.graphs().at(0).doDragDone();
            };

            var handlePinchZoom = function (e) {
                var a = touchLocationToGraphCoords(e.touches[0]);
                var b = touchLocationToGraphCoords(e.touches[1]);
                var previousa = touchLocationToGraphCoords(previousTouches[0]);
                var previousb = touchLocationToGraphCoords(previousTouches[1]);
                var basex = (a.x() + b.x()) / 2;
                var basey = (a.y() + b.y()) / 2;
                var dx = (a.x() - previousa.x()) + (b.x() - previousb.x());
                var dy = (a.y() - previousa.y()) + (b.y() - previousb.y());
                if (multigraph.graphs().size() > 0) {
                    if (!touchStarted ) {
                        multigraph.graphs().at(0).doDragReset();
                    }
                    multigraph.graphs().at(0).doDrag(multigraph, basex, basey, dx, dy, true);
                }
                touchStarted = true;
            };

        });

    });

});

