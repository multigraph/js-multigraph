window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Window.respondsTo("render", function (context, width, height) {
            var m = this.margin().left();

            context.save();
            context.fillStyle = this.bordercolor().getHexString("#");
            context.fillRect(m, m, width - 2*m, height - 2*m);
            context.restore();
        });

    });

});

