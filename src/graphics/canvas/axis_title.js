window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule canvas
     */

    ns.mixin.add(function (ns) {

        /**
         * Renders the axis title using the Canvas driver.
         *
         * @method render
         * @for AxisTitle
         * @chainable
         * @param {HTMLCanvasObject} context
         * @author jrfrimme
         */
        ns.AxisTitle.respondsTo("render", function (context) {
            var h = this.content().origHeight();
            var w = this.content().origWidth();
            var ax = 0.5 * w * (this.anchor().x() + 1);
            var ay = 0.5 * h * (this.anchor().y() + 1);
            var storedBase = (this.base() + 1) * (this.axis().pixelLength() / 2) + this.axis().minoffset() + this.axis().parallelOffset();
            var base;

            if (this.axis().orientation() === ns.Axis.HORIZONTAL) {
                base = new window.multigraph.math.Point(storedBase, this.axis().perpOffset());
            } else {
                base = new window.multigraph.math.Point(this.axis().perpOffset(), storedBase);
            }

            context.save();
            context.fillStyle = "rgba(0, 0, 0, 1)";
            context.transform(1, 0, 0, -1, 0, 2 * base.y());
            context.transform(1, 0, 0, 1, base.x(), base.y());
            context.transform(1, 0, 0, 1, this.position().x(), -this.position().y());
            context.rotate(-this.angle() * Math.PI/180.0);
            context.transform(1, 0, 0, 1, -ax, ay);
            context.fillText(this.content().string(), 0, 0);
            context.restore();
        });

    });

});
