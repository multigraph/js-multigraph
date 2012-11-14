window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Text = ns.Text;

        Text.respondsTo("initializeGeometry", function (graphicsContext) {
            var origWidth,
                origHeight,
                rotatedWidth,
                rotatedHeight;

            graphicsContext.elem.transform("");

            origWidth  = this.measureStringWidth(graphicsContext.elem);
            origHeight = this.measureStringHeight(graphicsContext.elem);

            if (graphicsContext && graphicsContext.angle !== undefined) {
                graphicsContext.elem.transform("R" + graphicsContext.angle);
                rotatedWidth  = this.measureStringWidth(graphicsContext.elem);
                rotatedHeight = this.measureStringHeight(graphicsContext.elem);
            } else {
                rotatedWidth  = origWidth;
                rotatedHeight = origHeight;
            }

            this.origWidth(origWidth);
            this.origHeight(origHeight);
            this.rotatedWidth(rotatedWidth);
            this.rotatedHeight(rotatedHeight);

            return this;
        });

        Text.respondsTo("measureStringWidth", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringWidth requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().width;
        });

        Text.respondsTo("measureStringHeight", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringHeight requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().height;
        });
    });
});
