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
            var ml = this.margin().left() * 2,
                windowwidth  = width - ml,
                windowheight = height - ml,
                elem = this.elem();

            if (elem.attr("width") !== windowwidth) {
                elem.attr("width", windowwidth);
            }
            if (elem.attr("height") !== windowheight) {
                elem.attr("height", windowheight);
            }
        });

    });

});
