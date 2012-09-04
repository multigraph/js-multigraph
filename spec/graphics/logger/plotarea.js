window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Plotarea.respondsTo("render", function (graph) {
            var paddingBox = graph.window().margin().left() + graph.window().border() + graph.window().padding().left(),
                plotBoxWidth = graph.paddingBox().width() - this.margin().right() - this.margin().left(),
                plotBoxHeight = graph.paddingBox().height() - this.margin().top() - this.margin().bottom(),
                plotarea = {
                    "x"           : paddingBox + this.margin().left(),
                    "y"           : paddingBox + this.margin().right(),
                    "width"       : plotBoxWidth,
                    "height"      : plotBoxHeight,
                    "bordercolor" : this.bordercolor().getHexString("#"),
                    "borderwidth" : this.border()
                };

            return plotarea;
        });

    });

});
