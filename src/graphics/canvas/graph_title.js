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
            var h = this.text().origHeight();
            var w = this.text().origWidth();
            var ax = (0.5 * w + this.padding() + this.border()) * (this.anchor().x() + 1);
            var ay = (0.5 * h + this.padding() + this.border()) * (this.anchor().y() + 1);
            var base;

            if (this.frame() === "padding") {
                base = new window.multigraph.math.Point(
                    (this.base().x() + 1) * (this.graph().paddingBox().width() / 2) - this.graph().plotarea().margin().left(),
                    (this.base().y() + 1) * (this.graph().paddingBox().height() / 2) - this.graph().plotarea().margin().bottom()
                );
            } else {
                base = new window.multigraph.math.Point(
                    (this.base().x() + 1) * (this.graph().plotBox().width() / 2),
                    (this.base().y() + 1) * (this.graph().plotBox().height() / 2)
                );
            }

            context.save();
            context.fillStyle = "rgba(0, 0, 0, 1)";
            context.transform(1, 0, 0, -1, 0, 2 * base.y());
            context.transform(1, 0, 0, 1, base.x(), base.y());
            context.transform(1, 0, 0, 1, this.position().x(), -this.position().y());
            context.transform(1, 0, 0, 1, -ax, ay);

            // border
            if (this.border() > 0) {
                context.save();
                context.transform(1, 0, 0, -1, 0, 0);
                context.strokeStyle = this.bordercolor().toRGBA();
                context.lineWidth = this.border();
                context.strokeRect(
                    this.border() / 2,
                    this.border() / 2,
                    w + (2 * this.padding()) + this.border(),
                    h + (2 * this.padding()) + this.border()
                );
                context.restore();
            }

            // background
            context.save();
            context.transform(1, 0, 0, -1, 0, 0);
            context.strokeStyle = this.color().toRGBA(this.opacity());
            context.fillStyle = this.color().toRGBA(this.opacity());
            context.fillRect(
                this.border(),
                this.border(),
                w + (2 * this.padding()),
                h + (2 * this.padding())
            );
            context.restore();

            // text
            context.font = this.fontSize() + " sans-serif";
            context.fillText(this.text().string(), this.border() + this.padding(), -(this.border() + this.padding()));
            context.restore();
        });

    });

});
