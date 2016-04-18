module.exports = function($, window, errorHandler) {

    var Multigraph = require('../../core/multigraph.js')($),
        Point = require('../../math/point.js');

    if (typeof(Multigraph.registerMouseEvents)==="function") { return Multigraph; }

    Multigraph.respondsTo("registerMouseEvents", function (target, options) {
        var base,
            mouseLast,
            mouseIsDown = false,
            dragStarted = false,
            multigraph = this,
            $target = $(target);

        var eventLocationToGraphCoords = function (event) {
            return new Point((event.pageX - $target.offset().left) - multigraph.graphs().at(0).x0(),
                             $target.height() - (event.pageY - $target.offset().top) - multigraph.graphs().at(0).y0());
        };

        $target.mousedown(function (event, datatipsEvent) {
            if (datatipsEvent) {
                // if the datatips mousedown handler is triggered through the datatips handler
                // then the default event does not contain pageX or pageY. So the datatips handler
                // passes its event, which does contain pageX and pageY.
                event = datatipsEvent;
            }
            event.preventDefault();
            var i;
            for (i = 0; i < multigraph.graphs().size(); i++) {
                multigraph.graphs().at(i).removeDatatips();
            }

            mouseLast = base = eventLocationToGraphCoords(event);
            mouseIsDown = true;
            dragStarted = false;
        });

        $target.mouseup(function (event) {
            mouseIsDown = false;
            multigraph.graphs().at(0).doDragDone();
        });

        $target.mousemove(function (event) {
            var eventLoc = eventLocationToGraphCoords(event),
                graphs   = multigraph.graphs();
            if (mouseIsDown) {
                var dx = eventLoc.x() - mouseLast.x(),
                    dy = eventLoc.y() - mouseLast.y();
                if (multigraph.graphs().size() > 0) {
                    if (!dragStarted ) {
                        graphs.at(0).doDragReset();
                    }
                    graphs.at(0).doDrag(multigraph, base.x(), base.y(), dx, dy, event.shiftKey);
                }
                dragStarted = true;
            } else { // datatips handling
                var i;
                for (i = 0; i < graphs.size(); i++) {
                    graphs.at(i).handleDatatips(eventLoc, multigraph.width(), multigraph.height(), $target, multigraph.div());
                }
            }
            mouseLast = eventLoc;
        });

        if (!options.noscroll) {
            $target.mousewheel(function (event, delta) {
                var eventLoc = eventLocationToGraphCoords(event);
                if (multigraph.graphs().size() > 0) {
                    multigraph.graphs().at(0).doWheelZoom(multigraph, eventLoc.x(), eventLoc.y(), delta);
                }
                event.preventDefault();
            });
        }

        $target.mouseleave(function (event) {
            mouseIsDown = false;
            multigraph.graphs().at(0).doDragDone();
        });

        $(multigraph.div()).mouseleave(function (event) {
            var graphs = multigraph.graphs(),
                i;
            for (i = 0; i < graphs.size(); i++) {
                graphs.at(i).removeDatatips();
            }
        });

    });

    return Multigraph;
};
