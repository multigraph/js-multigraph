window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.hasA("transformString");

        Graph.respondsTo("render", function (paper, width, height) {
            var backgroundSet = paper.set(),
                axesSet       = paper.set(),
                plotsSet      = paper.set(),
                legendSet     = paper.set(),
                titleSet      = paper.set(),
                i;

            this.transformString("S 1, -1, 0, " + (height/2) + " t " + this.x0() + ", " + this.y0());

            this.window().render(this, paper, backgroundSet, width, height);

            this.background().render(this, paper, backgroundSet, width, height);

            this.plotarea().render(this, paper, backgroundSet);

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).renderGrid(this, paper, axesSet);
            }

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).render(this, paper, axesSet);
            }

            for (i = 0; i < this.plots().size(); ++i) {
                this.plots().at(i).render(this, {"paper": paper,
                                                 "set": plotsSet});
            }

            this.legend().render({ "paper" : paper,
                                   "set"   : legendSet});

            if (this.title()) {
                this.title().render(paper, titleSet);
            }

            this.transformSets(height, this.x0(), this.y0(), backgroundSet, axesSet, plotsSet, legendSet, titleSet);
//            this.fixLayers(backgroundSet, axesSet, plotsSet);
        });

        Graph.respondsTo("redraw", function (paper, width, height) {
            var i;

            this.window().redraw(width, height);

            this.background().redraw(this, width, height);

            this.plotarea().redraw(this);

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).redrawGrid(this, paper);
            }

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).redraw(this, paper);
            }

            for (i = 0; i < this.plots().size(); ++i) {
                this.plots().at(i).redraw();
            }

            this.legend().redraw();

            if (this.title()) {
                this.title().redraw();
            }
        });

        Graph.respondsTo("transformSets", function (height, x0, y0, backgroundSet, axesSet, plotsSet, legendSet, titleSet) {
            var i;
            for (i = 0; i < backgroundSet.length; i++) {
                if (backgroundSet[i].type !== "image") {
                    backgroundSet[i].transform("S 1, -1, 0, " + (height/2));
                }
            }
            axesSet.transform(this.transformString() + "...");
            plotsSet.transform(this.transformString());
            legendSet.transform(this.transformString() + "...");
            titleSet.transform(this.transformString() + "...");

            plotsSet.attr("clip-rect", "1,1," + (this.plotBox().width()-2) + "," + (this.plotBox().height()-2));
        });

/*
        Graph.respondsTo("fixLayers", function (backgroundSet, axesSet, plotsSet) {
//            backgroundSet.insertAfter(axesSet);
//            axesSet.insertAfter(plotsSet);
//            plotsSet.toFront();
        });
*/

    });

});
