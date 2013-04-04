window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Background.respondsTo("render", function (graph, context, width, height) {
            var mb = graph.window().margin().left() + graph.window().border(),
                img = this.img();

            context.save();
            context.fillStyle = this.color().getHexString("#");
            context.fillRect(mb, mb, width - 2*mb, height - 2*mb);
            context.restore();
 
            if (img && img.src() !== undefined) {
                img.render(graph, context, width, height);
            }
       });

    });

});

