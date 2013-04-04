window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Background = ns.Background;

        Background.hasAn("elem");

        Background.respondsTo("render", function (graph, paper, set, width, height) {
            var img = this.img(),
                mb = graph.window().margin().left() + graph.window().border(),
                elem = paper.rect(mb, mb, width-2*mb, height-2*mb)
                    .attr({
                        "fill"   : this.color().getHexString("#"),
                        "stroke" : "none"
                    });

            this.elem(elem);
            set.push(elem);

            if (img && img.src() !== undefined) {
                img.render(graph, paper, set, width, height);
            }
        });

        Background.respondsTo("redraw", function (graph, width, height) {
            var mb = graph.window().margin().left() + graph.window().border() * 2,
                bwidth  = width - mb,
                bheight = height - mb,
                img  = this.img(),
                elem = this.elem();

            if (elem.attr("width") !== bwidth) {
                elem.attr("width", bwidth);
            }
            if (elem.attr("height") !== bheight) {
                elem.attr("height", bheight);
            }

            if (img && img.src() !== undefined) {
                img.redraw(graph);
            }
        });

    });

});
