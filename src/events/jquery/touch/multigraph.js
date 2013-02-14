window.multigraph.util.namespace("window.multigraph.events.jquery.touch", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var core = ns.core;
        var math = window.multigraph.util.namespace("window.multigraph.math");

        core.Multigraph.respondsTo("registerTouchEvents", function (target) {
            var touchStarted = false;
            var dragStarted = false;
            var pinchZoomStarted = false;

            var base;
            var multigraph = this;

            var pinchZoomInitialDeltas = {};
            var pinchZoomDetermined = false;
            var pinchZoomDeterminedTimeout;

            var previoustoucha;
            var previoustouchb;

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
                previoustoucha = touchLocationToGraphCoords(e.touches[0]);

                // one finger drag
                if (e.touches.length === 1) {
                    dragStarted = true;
                } else {
                    dragStarted = false;
                }

                // pinch zoom
                if (e.touches.length === 2) {
                    pinchZoomStarted = true;
                    pinchZoomDetermined = false;
                    previoustouchb = touchLocationToGraphCoords(e.touches[1]);
                } else {
                    pinchZoomStarted = false;
                    pinchZoomDetermined = false;
                }

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
            };

            var handleTouchEnd = function (jqueryEvent) {
                var e = jqueryEvent.originalEvent;
                e.preventDefault();
                
                // one finger drag
                if (e.touches.length === 1) {
                    dragStarted = true;
                } else {
                    dragStarted = false;
                }
                
                // pinch zoom
                if (e.touches.length === 2) {
                    pinchZoomStarted = true;
                    pinchZoomDetermined = false;
                } else {
                    pinchZoomStarted = false;
                    pinchZoomDetermined = false;
                }

                touchStarted = false;
                multigraph.graphs().at(0).doDragDone();
            };

            var handleTouchLeave = function (jqueryEvent) {
                jqueryEvent.originalEvent.preventDefault();

                dragStarted = false;
                pinchZoomStarted = false;
                pinchZoomDetermined = false;
                touchStarted = false;

                multigraph.graphs().at(0).doDragDone();
            };

            var handleDrag = function (e) {
                var touchLoc = touchLocationToGraphCoords(e.touches[0]);
                var dx = touchLoc.x() - previoustoucha.x();
                var dy = touchLoc.y() - previoustoucha.y();
                if (multigraph.graphs().size() > 0) {
                    if (!touchStarted) {
                        multigraph.graphs().at(0).doDragReset();
                    }
                    multigraph.graphs().at(0).doDrag(multigraph, base.x(), base.y(), dx, dy, false);
                }
                touchStarted = true;
                previoustoucha = touchLoc;
            };

            var handlePinchZoom = function (e) {
                var a = touchLocationToGraphCoords(e.touches[0]);
                var b = touchLocationToGraphCoords(e.touches[1]);
                var basex = (a.x() + b.x()) / 2;
                var basey = (a.y() + b.y()) / 2;

                var dx = calculateAbsoluteDistance(a.x(), b.x()) - calculateAbsoluteDistance(previoustoucha.x(), previoustouchb.x());
                var dy = calculateAbsoluteDistance(a.y(), b.y()) - calculateAbsoluteDistance(previoustoucha.y(), previoustouchb.y());

                if (multigraph.graphs().size() > 0) {
                    if (!touchStarted) {
                        multigraph.graphs().at(0).doDragReset();
                    }
                    if (pinchZoomDetermined === true) {
                        multigraph.graphs().at(0).doDrag(multigraph, basex, basey, dx, dy, true);
                    }
                }
                touchStarted = true;

                // two finger scroll
                var cx = ((a.x() - previoustoucha.x()) + (b.x() - previoustouchb.x())) / 2;
                var cy = ((a.y() - previoustoucha.y()) + (b.y() - previoustouchb.y())) / 2;
                if (pinchZoomDetermined === true) {
                    multigraph.graphs().at(0).doDrag(multigraph, basex, basey, cx, cy, false);
                }

                if (pinchZoomDetermined === false) {
                    if (pinchZoomInitialDeltas.base === undefined) {
                        pinchZoomInitialDeltas.base = {};
                        pinchZoomInitialDeltas.base.x = basex;
                        pinchZoomInitialDeltas.base.y = basey;
                    } 
                    if (pinchZoomInitialDeltas.zoomDeltas === undefined) {
                        pinchZoomInitialDeltas.zoomDeltas = {
                            "dx"     : 0,
                            "dy"     : 0,
                            "totalx" : 0,
                            "totaly" : 0
                        };
                    }
                    if (pinchZoomInitialDeltas.panDeltas === undefined) {
                        pinchZoomInitialDeltas.panDeltas = {
                            "dx" : 0,
                            "dy" : 0
                        };
                    }
                    pinchZoomInitialDeltas.zoomDeltas.dx += dx;
                    pinchZoomInitialDeltas.zoomDeltas.dy += dy;
                    pinchZoomInitialDeltas.panDeltas.dx += cx;
                    pinchZoomInitialDeltas.panDeltas.dy += cy;

                    pinchZoomInitialDeltas.zoomDeltas.totalx += Math.abs(dx);
                    pinchZoomInitialDeltas.zoomDeltas.totaly += Math.abs(dy);

                    if (pinchZoomDeterminedTimeout === undefined) {
                        pinchZoomDeterminedTimeout = setTimeout(function () {
                                var basex = pinchZoomInitialDeltas.base.x;
                                var basey = pinchZoomInitialDeltas.base.y;
                                var dx = pinchZoomInitialDeltas.zoomDeltas.dx;
                                var dy = pinchZoomInitialDeltas.zoomDeltas.dy;
                                var cx = pinchZoomInitialDeltas.panDeltas.dx;
                                var cy = pinchZoomInitialDeltas.panDeltas.dy;

                                multigraph.graphs().at(0).doDragReset();
                                
                                multigraph.graphs().at(0).doFirstPinchZoom(multigraph, basex, basey, dx, dy, pinchZoomInitialDeltas.zoomDeltas.totalx, pinchZoomInitialDeltas.zoomDeltas.totaly);
                                multigraph.graphs().at(0).doDrag(multigraph, basex, basey, cx, cy, false);

                                pinchZoomInitialDeltas = {};
                                pinchZoomDetermined = true;
                                clearTimeout(pinchZoomDeterminedTimeout);
                                pinchZoomDeterminedTimeout = undefined;
                            }, 60);
                    }
                }

                previoustoucha = a;
                previoustouchb = b;

            };

            var calculateAbsoluteDistance = function (a, b) {
                return Math.abs(a - b);
            };

            $target.on("touchstart", handleTouchStart);
            $target.on("touchmove", handleTouchMove);
            $target.on("touchend", handleTouchEnd);
            $target.on("touchleave", handleTouchLeave);

        });

    });

});

