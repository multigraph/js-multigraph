window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Background = ns.Background;

        Background.hasA("logger");

        Background.respondsTo("dumpLog", function () {
            var output = "",
                logger = this.logger();

            output += "setFillColor(" + logger.backgroundcolor + ");\n";
            output += "drawRect(" + logger.x + "," + logger.y + "," + logger.width + "," + logger.height + ");\n";
            output += "fillArea();\n";

            if (this.img() && this.img().src() !== undefined) {
                output += this.img().dumpLog();
            }

            return output;
        });

        Background.respondsTo("render", function (graph, width, height) {
            var mb = graph.window().margin().left() + graph.window().border();

            this.logger({
                "x"               : mb,
                "y"               : mb,
                "width"           : width - 2*mb,
                "height"          : height - 2*mb,
                "backgroundcolor" : this.color().getHexString("#")
            });

            if (this.img() && this.img().src() !== undefined) {
                this.img().render(graph, width, height);
            }

        });

    });

});
