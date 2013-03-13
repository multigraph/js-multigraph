window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule canvas
     */

    ns.mixin.add(function (ns) {

        /**
         * Renders the title using the Canvas driver.
         *
         * @method render
         * @for Title
         * @chainable
         * @param {HTMLCanvasObject} context
         * @author jrfrimme
         */
        ns.Title.respondsTo("render", function (context) {
            var graph   = this.graph(),
                border  = this.border(),
                padding = this.padding(),
                h = this.text().origHeight(),
                w = this.text().origWidth(),
                ax = (0.5 * w + padding + border) * (this.anchor().x() + 1),
                ay = (0.5 * h + padding + border) * (this.anchor().y() + 1),
                base;

            if (this.frame() === "padding") {
                base = new window.multigraph.math.Point(
                    (this.base().x() + 1) * (graph.paddingBox().width() / 2) - graph.plotarea().margin().left(),
                    (this.base().y() + 1) * (graph.paddingBox().height() / 2) - graph.plotarea().margin().bottom()
                );
            } else {
                base = new window.multigraph.math.Point(
                    (this.base().x() + 1) * (graph.plotBox().width() / 2),
                    (this.base().y() + 1) * (graph.plotBox().height() / 2)
                );
            }

            context.save();
            context.fillStyle = "rgba(0, 0, 0, 1)";
            context.transform(1, 0, 0, -1, 0, 2 * base.y());
            context.transform(1, 0, 0, 1, base.x(), base.y());
            context.transform(1, 0, 0, 1, this.position().x(), -this.position().y());
            context.transform(1, 0, 0, 1, -ax, ay);

            // border
            if (border > 0) {
                context.save();
                context.transform(1, 0, 0, -1, 0, 0);
                context.strokeStyle = this.bordercolor().toRGBA();
                context.lineWidth = border;
                context.strokeRect(
                    border / 2,
                    border / 2,
                    w + (2 * padding) + border,
                    h + (2 * padding) + border
                );
                context.restore();
            }

            // background
            context.save();
            context.transform(1, 0, 0, -1, 0, 0);
            context.strokeStyle = this.color().toRGBA(this.opacity());
            context.fillStyle = this.color().toRGBA(this.opacity());
            context.fillRect(
                border,
                border,
                w + (2 * padding),
                h + (2 * padding)
            );
            context.restore();

            // text
            context.font = this.fontSize() + " sans-serif";
            context.fillText(this.text().string(), border + padding, -(border + padding));
            context.restore();
        });

    });

});
