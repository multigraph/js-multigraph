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

        var scaleAndPositionElement = function (elem, width, height) {
            window.multigraph.jQuery(elem)
                .css("width", width + "px")
                .css("height", height + "px")
                .css("left", ((window.innerWidth  - width) / 2) + "px")
                .css("top", ((window.innerHeight - height) / 2) + "px");
        };

        ns.core.Multigraph.respondsTo("resize", function (event) {
            var multigraph = event.data.multigraph;
            if (multigraph.clone() === true) {
                var r = computeRatio(multigraph.width(), multigraph.height());
                var w = parseInt(multigraph.width() * r, 10);
                var h = parseInt(multigraph.height() * r, 10);
                
                scaleAndPositionElement(multigraph.div(), w, h);

                multigraph.resizeSurface(w, h);

                multigraph.width(w);
                multigraph.height(h);
                multigraph.render();
            }
        });

        ns.core.Multigraph.respondsTo("handleLightbox", function (event) {
            var multigraph = event.data.multigraph;
            var $ = window.multigraph.jQuery;
            if (multigraph.clone() === false) {
                multigraph.overlay(
                    $("<div style=\"position: fixed; left: 0px; top: 0px; height: 100%; min-height: 100%; width: 100%; z-index: 9999; background: black; opacity: 0.5;\"></div>").appendTo("body")
                );

                var clone = $(multigraph.div()).clone().empty()[0];
                var r = computeRatio(multigraph.width(), multigraph.height());
                var w = parseInt(multigraph.width() * r, 10);
                var h = parseInt(multigraph.height() * r, 10);
                $(clone).css("position", "fixed")
                    .css("z-index", 9999);

                scaleAndPositionElement(clone, w, h);

                $("body").append(clone);

                multigraph.originalDiv(multigraph.div())
                    .div(clone)
                    .clone(true);
                multigraph.init();
                multigraph.registerEvents();
            } else {
                $(multigraph.div()).remove();
                multigraph.overlay().remove();
                multigraph.clone(false)
                    .div(multigraph.originalDiv())
                    .width($(multigraph.div()).width())
                    .height($(multigraph.div()).height())
                    .busySpinner($(multigraph.div()).find("div img").parent().busy_spinner());
                multigraph.initializeSurface();
                multigraph.render();
            }
        });

    });

});
