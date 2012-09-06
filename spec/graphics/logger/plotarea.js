window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Plotarea = ns.Plotarea;

        Plotarea.hasA("logger");

        Plotarea.respondsTo("dumpLog", function () {
            var logger = this.logger(),
                output = "";

            output += "setLineColor(" + logger.bordercolor + ");\n";
            output += "setLineWidth(" + logger.borderwidth + ");\n";
            output += "drawRect(" + logger.x + "," + logger.y + "," + logger.width + "," + logger.height + ");\n";


            return output;
        });

        Plotarea.respondsTo("render", function (graph) {
            var paddingBox = graph.window().margin().left() + graph.window().border() + graph.window().padding().left(),
                plotBoxWidth = graph.paddingBox().width() - this.margin().right() - this.margin().left(),
                plotBoxHeight = graph.paddingBox().height() - this.margin().top() - this.margin().bottom();
            this.logger({
                "x"           : paddingBox + this.margin().left(),
                "y"           : paddingBox + this.margin().right(),
                "width"       : plotBoxWidth,
                "height"      : plotBoxHeight,
                "bordercolor" : this.bordercolor().getHexString("#"),
                "borderwidth" : this.border()
            });

        });

    });

});
