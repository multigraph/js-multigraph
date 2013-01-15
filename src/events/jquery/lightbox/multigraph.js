window.multigraph.util.namespace("window.multigraph.events.jquery.lightbox", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.core.Multigraph.hasA("clone").which.defaultsTo(false);
        ns.core.Multigraph.hasA("originalDiv");
        ns.core.Multigraph.hasAn("overlay");

        var computeRatio = function (originalWidth, originalHeight) {
            var wr = window.innerWidth / originalWidth;
            var hr = window.innerHeight / originalHeight;
            var r = Math.min(wr, hr);
            return r;
        };

        ns.core.Multigraph.respondsTo("resize", function (event) {
            var multigraph = event.data.multigraph;
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

        ns.core.Multigraph.respondsTo("handleLightbox", function (event) {
            var multigraph = event.data.multigraph;
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

    });

});
