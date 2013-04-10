window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule canvas
     */

    ns.mixin.add(function (ns) {
        var Text = ns.Text;

        /**
         * Determines unrotated and rotated widths and heights for the stored string in the canvas
         * environment
         *
         * @method initializeGeometry
         * @for Text
         * @chainable
         * @param {Object} graphicsContext
         *   @param {Context} graphicsContext.context
         *   @param {Float} graphicsContext.angle
         *   @param {String} graphicsContext.fontSize
         */
        Text.respondsTo("initializeGeometry", function (graphicsContext) {
            var origWidth,
                origHeight,
                rotatedWidth,
                rotatedHeight;

            graphicsContext.context.save();
            if (graphicsContext.fontSize !== undefined) {
                graphicsContext.context.font = graphicsContext.fontSize + " sans-serif";
            }

            origWidth  = this.measureStringWidth(graphicsContext.context);
            origHeight = this.measureStringHeight(graphicsContext.context);

            graphicsContext.context.restore();

            if (graphicsContext.angle !== undefined) {
                var angle = graphicsContext.angle/180 * Math.PI;
                rotatedWidth = Math.abs(Math.cos(angle)) * origWidth + Math.abs(Math.sin(angle)) * origHeight;
                rotatedHeight = Math.abs(Math.sin(angle)) * origWidth + Math.abs(Math.cos(angle)) * origHeight;
            } else {
                rotatedWidth = origWidth;
                rotatedHeight = origHeight;
            }

            this.origWidth(origWidth);
            this.origHeight(origHeight);
            this.rotatedWidth(rotatedWidth);
            this.rotatedHeight(rotatedHeight);

            return this;
        });

        /**
         * Determines unrotated width for the stored string in the canvas environment.
         *
         * @method measureStringWidth
         * @for Text
         * @private
         * @return {Float} Unrotated width of string.
         * @param {Context} context
         */
        Text.respondsTo("measureStringWidth", function (context) {
            if (this.string() === undefined) {
                throw new Error("measureStringWidth requires the string attr to be set.");
            }

            var metrics = context.measureText(this.string());
            return metrics.width;
        });

        /**
         * Determines unrotated height for the stored string in the canvas environment.
         *
         * @method measureStringHeight
         * @for Text
         * @private
         * @return {Float} Unrotated height of string.
         * @param {Context} context
         */
        Text.respondsTo("measureStringHeight", function (context) {
            if (this.string() === undefined) {
                throw new Error("measureStringHeight requires the string attr to be set.");
            }

            //NOTE: kludge: canvas cannot exactly measure text height, so we just return a value
            //      estimated by using the width of an "M" as a substitute.  Maybe improve this
            //      later by using a better workaround.
            var metrics = context.measureText("M"),
                newlineCount = this.string().match(/\n/g);
            return (newlineCount !== null ? (newlineCount.length + 1) : 1) * metrics.width;
        });

        Text.respondsTo("setTransform", function (context, anchor, base, position, angle) {
            context.transform(1, 0, 0, -1, 0, 2 * base.y());
            context.transform(1, 0, 0, 1, base.x(), base.y());
            context.transform(1, 0, 0, 1, position.x(), -position.y());
            context.rotate(-angle * Math.PI/180.0);
            context.transform(1, 0, 0, 1, -anchor.x(), anchor.y());
        });

        Text.respondsTo("drawText", function (context, anchor, base, position, angle) {
            context.save();
            this.setTransform(context, anchor, base, position, angle);
            context.fillText(this.string(), 0, 0);
            context.restore();
        });
    });

});
