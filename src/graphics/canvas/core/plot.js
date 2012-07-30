window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        ns.Plot.respondsTo("render", function(graph, context) {

	    var data = this.data().arraydata();
	    if (! data) { return; }

	    var haxis = this.horizontalaxis();
	    var vaxis = this.verticalaxis();

	    var iter = data.getIterator(["x", "y"], haxis.dataMin(), haxis.dataMax(), 0);

            context.beginPath();

	    var first = true;

	    while (iter.hasNext()) {
		var vals = iter.next();
		var px = haxis.dataValueToAxisValue(vals[0]);
		var py = vaxis.dataValueToAxisValue(vals[1]);
		if (first) {
		    context.moveTo(px, py);
		    first = false;
		} else {
		    context.lineTo(px, py);
		}
	    }

            context.strokeStyle = "#0000ff";
            context.stroke();
            context.closePath();



        });

    });

});
