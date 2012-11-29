window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule raphael
     */

    ns.mixin.add(function (ns) {
        var Text = ns.Text;

        /**
         * Determines unrotated and rotated widths and heights for the stored string in the raphael
         * environment
         *
         * @method initializeGeometry
         * @for Text
         * @chainable
         * @param {Object} graphicsContext
         *   @param {TextElem} graphicsContext.elem
         *   @param {Float} graphicsContext.angle
         *   @param {String} graphicsContext.fontSize
         */
        Text.respondsTo("initializeGeometry", function (graphicsContext) {
            var origWidth,
                origHeight,
                rotatedWidth,
                rotatedHeight;

            graphicsContext.elem.transform("");

            var defaultFontSize;
            if (graphicsContext.fontSize !== undefined) {
                defaultFontSize = graphicsContext.elem.attr("font-size");
                graphicsContext.elem.attr("font-size", graphicsContext.fontSize);
            }
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

            if (graphicsContext.fontSize !== undefined) {
                graphicsContext.elem.attr("font-size", defaultFontSize);
            }

            this.origWidth(origWidth);
            this.origHeight(origHeight);
            this.rotatedWidth(rotatedWidth);
            this.rotatedHeight(rotatedHeight);

            return this;
        });

        /**
         * Determines unrotated width for the stored string in the raphael environment.
         *
         * @method measureStringWidth
         * @for Text
         * @private
         * @return {Float} Unrotated width of string.
         * @param {TextElem} elem
         */
        Text.respondsTo("measureStringWidth", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringWidth requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().width;
        });

        /**
         * Determines unrotated height for the stored string in the raphael environment.
         *
         * @method measureStringHeight
         * @for Text
         * @private
         * @return {Float} Unrotated height of string.
         * @param {TextElem} text
         */
        Text.respondsTo("measureStringHeight", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringHeight requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().height;
        });
    });
});
