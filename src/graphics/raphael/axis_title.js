window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule raphael
     */

    ns.mixin.add(function (ns) {

        /**
         * Renders the axis title using the Raphael driver.
         *
         * @method render
         * @for AxisTitle
         * @chainable
         * @param {Paper} paper
         * @param {Set} set
         * @author jrfrimme
         */
        ns.AxisTitle.respondsTo("render", function (paper, set) {
            var h = this.content().origHeight();
            var w = this.content().origWidth();
            var ax = 0.5 * w * this.anchor().x();
            var ay = 0.5 * h * this.anchor().y();
            var storedBase = (this.base() + 1) * (this.axis().pixelLength() / 2) + this.axis().minoffset() + this.axis().parallelOffset();
            var transformString = "";
            var base;

            if (this.axis().orientation() === ns.Axis.HORIZONTAL) {
                base = new window.multigraph.math.Point(storedBase, this.axis().perpOffset());
            } else {
                base = new window.multigraph.math.Point(this.axis().perpOffset(), storedBase);
            }

            transformString += "t" + base.x() + "," + base.y();
            transformString += "s1,-1";
            transformString += "t" + this.position().x() + "," + (-this.position().y());
            transformString += "r" + (-this.angle());
            transformString += "t" + (-ax) + "," + ay;

            set.push(
                paper.text(0, 0, this.content().string())
                    .transform(transformString)
            );
        });

    });

});
