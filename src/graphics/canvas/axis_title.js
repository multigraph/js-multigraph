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
            var Point       = window.multigraph.math.Point,
                axis        = this.axis(),
                title       = this.content(),
                anchor      = this.anchor(),
                perpOffset  = axis.perpOffset(),
                h           = title.origHeight(),
                w           = title.origWidth(),
                pixelAnchor = new Point(
                    0.5 * w * (anchor.x() + 1),
                    0.5 * h * (anchor.y() + 1)
                ),
                storedBase  = (this.base() + 1) * (axis.pixelLength() / 2) + axis.minoffset() + axis.parallelOffset(),
                pixelBase;

            if (axis.orientation() === ns.Axis.HORIZONTAL) {
                pixelBase = new Point(storedBase, perpOffset);
            } else {
                pixelBase = new Point(perpOffset, storedBase);
            }

            context.save();
            context.fillStyle = "rgba(0, 0, 0, 1)";
            title.drawText(context, pixelAnchor, pixelBase, this.position(), this.angle());
            context.restore();
        });

    });

});
