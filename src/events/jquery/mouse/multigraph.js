window.multigraph.util.namespace("window.multigraph.events.jquery.mouse", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var core = ns.core;
        var math = window.multigraph.util.namespace("window.multigraph.math");

        core.Multigraph.hasA("clone").which.defaultsTo(false);
        core.Multigraph.hasA("originalDiv");
        core.Multigraph.hasAn("overlay");
        core.Multigraph.respondsTo("registerMouseEvents", function (target) {

            var base;
            var mouseLast;
            var mouseIsDown = false;
            var dragStarted = false;
            var multigraph = this;

            var $target = window.multigraph.jQuery(target);

            var eventLocationToGraphCoords = function (event) {
                return new math.Point((event.pageX - $target.offset().left) - multigraph.graphs().at(0).x0(),
                                      $target.height() - (event.pageY - $target.offset().top) - multigraph.graphs().at(0).y0());
            };

            $target.mousedown(function (event) {
                mouseLast = base = eventLocationToGraphCoords(event);
                mouseIsDown = true;
                dragStarted = false;
            });
            $target.mouseup(function (event) {
                mouseIsDown = false;
                multigraph.graphs().at(0).doDragDone();
            });
            $target.mousemove(function (event) {
                var eventLoc = eventLocationToGraphCoords(event);
                if (mouseIsDown) {
                    var dx = eventLoc.x() - mouseLast.x();
                    var dy = eventLoc.y() - mouseLast.y();
                    if (multigraph.graphs().size() > 0) {
                        if (!dragStarted ) {
                            multigraph.graphs().at(0).doDragReset();
                        }
                        multigraph.graphs().at(0).doDrag(multigraph,base.x(),base.y(),dx,dy,event.shiftKey);
                    }
                    dragStarted = true;
                }
                mouseLast = eventLoc;
            });

            $target.mousewheel(function(event, delta) {
                var eventLoc = eventLocationToGraphCoords(event);
                if (multigraph.graphs().size() > 0) {
                    multigraph.graphs().at(0).doWheelZoom(multigraph,eventLoc.x(),eventLoc.y(),delta);
                }
                event.preventDefault();
            });

            $target.mouseenter(function (event) {
                mouseLast = eventLocationToGraphCoords(event);
                mouseIsDown = false;
                multigraph.graphs().at(0).doDragDone();
            });
            $target.mouseleave(function (event) {
                mouseIsDown = false;
                multigraph.graphs().at(0).doDragDone();
            });

            var computeRatio = function (originalWidth, originalHeight) {
                var wr = window.innerWidth / originalWidth;
                var hr = window.innerHeight / originalHeight;
                var r = Math.min(wr, hr);
                return r;
            };

            $target.dblclick(function (event) {
                var $ = window.multigraph.jQuery;
                if (multigraph.clone() === false) {
                    multigraph.overlay(
                        $("<div style=\"position: fixed; left: 0px; top: 0px; height: 100%; width: 100%; z-index: 9999; background: black; opacity: 0.5;\"></div>").appendTo("body")
                    );

                    var clone = $(multigraph.div()).clone().empty()[0];
                    var r = computeRatio(multigraph.width(), multigraph.height());
                    $(clone).css("position", "fixed")
                        .css("z-index", 9999)
                        .css("width", (multigraph.width() * r) + "px")
                        .css("height", (multigraph.height() * r) + "px")
                        .css("left", ((window.innerWidth  - (multigraph.width() * r)) / 2) + "px")
                        .css("top", ((window.innerHeight - (multigraph.height() * r)) / 2) + "px");
                    $("body").append(clone);

                    multigraph.originalDiv(multigraph.div())
                        .div(clone)
                        .clone(true);
                    multigraph.init();
                    multigraph.registerMouseEvents(multigraph.canvas());
                    multigraph.registerTouchEvents(multigraph.canvas());
                } else {
                    $(multigraph.div()).remove();
                    multigraph.overlay().remove();
                    multigraph.clone(false)
                        .div(multigraph.originalDiv())
                        .width($(multigraph.div()).width())
                        .height($(multigraph.div()).height())
                        .canvas($(multigraph.div()).children("canvas")[0])
                        .busySpinner($(multigraph.div()).find("div img").parent().busy_spinner())
                        .context(multigraph.canvas().getContext("2d"));
                    multigraph.render();
                }
            });

            window.multigraph.jQuery(window).resize(function () {
                if (multigraph.clone() === true) {
                    var r = computeRatio(multigraph.width(), multigraph.height());
                    var w = multigraph.width() * r;
                    var h = multigraph.height() * r;

                    window.multigraph.jQuery(multigraph.div()).css("width", w + "px")
                        .css("height", h + "px")
                        .css("left", ((window.innerWidth  - w) / 2) + "px")
                        .css("top", ((window.innerHeight - h) / 2) + "px");

                    window.multigraph.jQuery(multigraph.canvas()).css("width", w + "px")
                        .css("height", h + "px");

                }
            });

            window.multigraph.jQuery(window).on("orientationchange", function () {
                if (multigraph.clone() === true) {
                    var r = computeRatio(multigraph.width(), multigraph.height());
                    var w = multigraph.width() * r;
                    var h = multigraph.height() * r;

                    window.multigraph.jQuery(multigraph.div()).css("width", w + "px")
                        .css("height", h + "px")
                        .css("left", ((window.innerWidth  - w) / 2) + "px")
                        .css("top", ((window.innerHeight - h) / 2) + "px");

                    window.multigraph.jQuery(multigraph.canvas()).css("width", w + "px")
                        .css("height", h + "px");

                }
            }, false);

        });

    });

});

