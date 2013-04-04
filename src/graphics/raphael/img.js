window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Img = ns.Img;

        var computeImgLocation = function (img, graph) {
            var interp        = window.multigraph.math.util.interp,
                graphWindow   = graph.window(),
                graphPlotarea = graph.plotarea(),
                base          = img.base(),
                ax          = interp(img.anchor().x(), -1, 1, 0, img.image().width),
                ay          = interp(img.anchor().y(), 1, -1, 0, img.image().height),
                paddingLeft = graphWindow.margin().left() + graphWindow.border(),
                paddingTop  = graphWindow.margin().top() + graphWindow.border(),
                plotLeft    = paddingLeft + graphWindow.padding().left() + graphPlotarea.margin().left() + graphPlotarea.border(),
                plotTop     = paddingTop + graphWindow.padding().top() + graphPlotarea.margin().top() + graphPlotarea.border(),
                bx, by;

            if (img.frame() === Img.PLOT) {
                bx = plotLeft + interp(base.x(), -1, 1, 0, graph.plotBox().width());
                by = plotTop + interp(base.y(), 1, -1, 0, graph.plotBox().height());
            } else {
                bx = paddingLeft + interp(base.x(), -1, 1, 0, graph.paddingBox().width());
                by = paddingTop + interp(base.y(), 1, -1, 0, graph.paddingBox().height());
            }
            return {
                x : bx + img.position().x() - ax,
                y : by + img.position().y() - ay
            };
        };

        Img.hasA("image").which.defaultsTo(function () {return new Image();});
        Img.hasA("fetched").which.defaultsTo(false);
        Img.hasAn("elem");

        Img.respondsTo("render", function (graph, paper, set, width, height) {
            var image = this.image(),
                that = this;

            if (this.fetched()) {
                var imgLoc = computeImgLocation(this, graph),
                    elem = paper.image(this.src(), imgLoc.x, imgLoc.y, image.width, image.height);

                this.elem(elem);
                set.push(elem);
            } else {
                image.onload = function () {
                    that.fetched(true);
                    graph.render(paper, width, height);
                };
                image.src = this.src();
            }
        });

        Img.respondsTo("redraw", function (graph) {
            if (this.fetched()) {
                var imgLoc = computeImgLocation(this, graph);
                this.elem().attr({
                    x : imgLoc.x,
                    y : imgLoc.y
                });
            }
        });

    });

});
