window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Window = ns.Window;

        Window.hasAn("elem");

        Window.respondsTo("render", function (graph, paper, set, width, height) {
            var ml = this.margin().left(),
                elem = paper.rect(ml,ml,width-2*ml,height-2*ml)
                    .attr({"fill" : this.bordercolor().getHexString("#")});

            // window border
            this.elem(elem);
            set.push(elem);
        });

        Window.respondsTo("redraw", function (width, height) {
            var ml = this.margin().left() * 2;
            this.elem().attr({
                "width"  : width - ml,
                "height" : height - ml
            });
        });

    });

});
