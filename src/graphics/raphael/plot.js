window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

/*
        ns.Plot.respondsTo("render", function (graph, paper, set) {

            var data = this.data().arraydata();
            if (! data) { return; }

            var haxis = this.horizontalaxis();
            var vaxis = this.verticalaxis();

            var iter = data.getIterator(["x", "y"], haxis.dataMin(), haxis.dataMax(), 0);

            var first = true;
            var pathString = "";

            while (iter.hasNext()) {
                var vals = iter.next();
                var px = haxis.dataValueToAxisValue(vals[0]);
                var py = vaxis.dataValueToAxisValue(vals[1]);
                if (first) {
                    pathString += "M" + px + "," + py;
                    first = false;
                } else {
                    pathString += "L" + px + "," + py;
                }
            }

            set.push( paper.path(pathString)
                      .attr({"stroke":"#0000ff"}));

        });
*/

    });

});
