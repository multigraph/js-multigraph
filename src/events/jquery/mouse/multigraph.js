window.multigraph.util.namespace("window.multigraph.events.jquery.mouse", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Multigraph = ns.core.Multigraph;

        Multigraph.respondsTo("registerMouseEvents", function (target) {

            var baseX, baseY;
            var mouseLastX, mouseLastY;
            var mouseIsDown = false;
            var multigraph = this;

            $(target).mousedown(function (event) {
                mouseLastX = baseX = event.offsetX;
                mouseLastY = baseY = event.offsetY;
                mouseIsDown = true;
            });
            $(target).mouseup(function (event) {
                mouseIsDown = false;
            });
            $(target).mousemove(function (event) {
                if (mouseIsDown) {
                    var dx = event.offsetX - mouseLastX;
                    var dy = event.offsetY - mouseLastY;
                    if (multigraph.graphs().size() > 0) {
                        multigraph.graphs().at(0).doDrag(multigraph,baseX,baseY,dx,dy,event.shiftKey);
                    }
                }
                mouseLastX = event.offsetX;
                mouseLastY = event.offsetY;
            });
            $(target).mouseenter(function (event) {
                mouseLastX = event.offsetX;
                mouseLastY = event.offsetY;
                mouseIsDown = false;
            });
            $(target).mouseleave(function (event) {
                mouseIsDown = false;
            });
        });

    });

});

