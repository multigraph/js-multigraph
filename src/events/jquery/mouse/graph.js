window.multigraph.util.namespace("window.multigraph.events.jquery.mouse", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.core.Graph;

        Graph.hasA("x0").which.isA("number");
        Graph.hasA("y0").which.isA("number");

        Graph.respondsTo("doDrag", function (multigraph, bx, by, dx, dy, shiftKey) {
            var i = 0;
            //console.log('doDrag: ' + dx + ',' + dy);

            // offset coordinates of base point by position of graph
            bx -= this.x0();
            by -= this.y0();

            // find the first horizontal axis -- for now, only implement mouse motion for
            //   first horiz axis:
            while (i < this.axes().size()) {
                if (this.axes().at(i).orientation() === window.multigraph.core.Axis.HORIZONTAL) {
                    break;
                } else {
                    i++;
                }
            }
            if (i >= this.axes().size()) {
                console.log("ERROR: can't find horizontal axis for graph");
                return;
            }
            var haxis = this.axes().at(i);

            // do the action
            if (shiftKey) {
                haxis.doZoom(bx, dx);
            } else {
                haxis.doPan(bx, dx);
            }

            // draw everything
            multigraph.redraw();
        });

    });

});
