if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.canvasMixin.add(function(ns) {
        var Graph = ns.Graph;

        Graph.respondsTo("render", function(context, width, height) {
            var i;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(width, height);
            context.moveTo(0, height);
            context.lineTo(width, 0);
            context.strokeStyle = "#000000";
            context.stroke();
            context.closePath();
            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).render(this, context);
            }
        });

    });

}(window.multigraph));
