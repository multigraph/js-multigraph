window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Graph = ns.Graph;

        Graph.hasA("translateString");
        Graph.hasA("transformString");

        Graph.hasA("x0").which.isA("number");
        Graph.hasA("y0").which.isA("number");

        Graph.respondsTo("render", function (paper, width, height) {
            var windowBorder = this.window().border(),
                backgroundSet = paper.set(),
                axesSet = paper.set(),
                plotsSet = paper.set(),
                i;

            this.x0( this.window().margin().left() + windowBorder + this.window().padding().left() + this.plotarea().margin().left() + this.plotarea().border() );
            this.y0( this.window().margin().bottom() + windowBorder + this.window().padding().bottom() + this.plotarea().margin().bottom() + this.plotarea().border() );
            this.transformString("S 1, -1, 0, " + (height/2) + " t " + this.x0() + ", " + this.y0());

            this.window().render(this, paper, backgroundSet, width, height);

            this.background().render(this, paper, backgroundSet, width, height);

            this.plotarea().render(this, paper, backgroundSet);

            for (i = 0; i < this.axes().size(); ++i) {
                this.axes().at(i).render(this, paper, axesSet, this.transformString());
            }

            for (i = 0; i < this.plots().size(); ++i) {
                this.plots().at(i).render(this, {"paper": paper,
                                                 "set": plotsSet});
            }

            this.legend().render({"paper": paper,
                                  "transformString": this.transformString()});

            this.transformSets(height, this.x0(), this.y0(), backgroundSet, axesSet, plotsSet);
            this.fixLayers(backgroundSet, axesSet, plotsSet);

        });

        Graph.respondsTo("transformSets", function (height, x0, y0, backgroundSet, axesSet, plotsSet) {
            var i;
            for (i = 0; i < backgroundSet.length; i++) {
                if (backgroundSet[i].type !== "image") {
                    backgroundSet[i].transform("S 1, -1, 0, " + (height/2));
                }
            }
            axesSet.transform(this.transformString());
            plotsSet.transform(this.transformString());
        });

        Graph.respondsTo("fixLayers", function (backgroundSet, axesSet, plotsSet) {
//            backgroundSet.insertAfter(axesSet);
//            axesSet.insertAfter(plotsSet);
//            plotsSet.toFront();
        });

    });

});
