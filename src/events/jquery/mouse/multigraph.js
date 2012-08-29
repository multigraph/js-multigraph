window.multigraph.util.namespace("window.multigraph.events.jquery.mouse", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Multigraph = ns.core.Multigraph;

        Multigraph.respondsTo("registerMouseEvents", function (target) {

            var baseX, baseY;
            var mouseLastX, mouseLastY;
            var mouseIsDown = false;
            var multigraph = this;

            var $target = $(target);

            $target.mousedown(function (event) {
                mouseLastX = baseX = (event.pageX - $target.offset().left);
                mouseLastY = baseY = (event.pageY - $target.offset().top);
                mouseIsDown = true;
            });
            $target.mouseup(function (event) {
                mouseIsDown = false;
            });
            $target.mousemove(function (event) {
                var eventX = event.pageX - $target.offset().left;
                var eventY = event.pageY - $target.offset().top;
                if (mouseIsDown) {
                    var dx = eventX - mouseLastX;
                    var dy = eventY - mouseLastY;
                    if (multigraph.graphs().size() > 0) {
                        multigraph.graphs().at(0).doDrag(multigraph,baseX,baseY,dx,dy,event.shiftKey);
                    }
                }
                mouseLastX = eventX;
                mouseLastY = eventY;
            });
            $target.mouseenter(function (event) {
                var eventX = event.pageX - $target.offset().left;
                var eventY = event.pageY - $target.offset().top;
                mouseLastX = eventX;
                mouseLastY = eventY;
                mouseIsDown = false;
            });
            $target.mouseleave(function (event) {
                mouseIsDown = false;
            });
        });

    });

});

