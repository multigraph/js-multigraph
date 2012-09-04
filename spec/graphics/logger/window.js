window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        window.multigraph.core.Window.respondsTo("render", function (graph, width, height) {
            var ml = this.margin().left(),
                wdw = {
                    "x"           : ml,
                    "y"           : ml,
                    "width"       : width-2*ml,
                    "height"      : height-2*ml,
                    "bordercolor" : this.bordercolor().getHexString("#")
                };

            return wdw;
        });

    });

});
