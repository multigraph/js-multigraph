window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Background.respondsTo("render", function (graph, width, height) {
            var mb = graph.window().margin().left() + graph.window().border();

            var background = {
                "x"               : mb,
                "y"               : mb,
                "width"           : width - 2*mb,
                "height"          : height - 2*mb,
                "backgroundcolor" : this.color().getHexString("#")
            };

            if (this.img() && this.img().src() !== undefined) {
                background.img = this.img().render(graph, width, height);
            }

            return background;
        });

    });

});
