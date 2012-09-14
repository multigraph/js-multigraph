window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Window = ns.Window;

        Window.hasA("logger");

        Window.respondsTo("dumpLog", function () {
            var output = "",
                logger = this.logger();

            output += "setFillColor(" + logger.bordercolor + ");\n";
            output += "drawRect(" + logger.x + "," + logger.y + "," + logger.width + "," + logger.height + ");\n";
            output += "fillArea();\n";

            return output;
        });

        Window.respondsTo("render", function (graph, width, height) {
            var ml = this.margin().left();

            this.logger({
                "x"           : ml,
                "y"           : ml,
                "width"       : width-2*ml,
                "height"      : height-2*ml,
                "bordercolor" : this.bordercolor().getHexString("#")
            });

        });

    });

});
