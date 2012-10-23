window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Text = ns.Text;

        Text.respondsTo("initializeGeometry", function (graphicsContext) {
            if (graphicsContext && graphicsContext.angle !== undefined) {
                graphicsContext.elem.transform("R" + graphicsContext.angle);
            } else {
                graphicsContext.elem.transform("");
            }

            this.width(this.measureStringWidth(graphicsContext.elem));
            this.height(this.measureStringHeight(graphicsContext.elem));

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
