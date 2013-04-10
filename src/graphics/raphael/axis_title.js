window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule raphael
     */

    ns.mixin.add(function (ns) {

        var AxisTitle = ns.AxisTitle;

        AxisTitle.hasA("previousBase");
        AxisTitle.hasAn("elem");

        var computePixelBasePoint = function (labeler) {
            var axis       = labeler.axis(),
                axisBase   = (labeler.base() + 1) * (axis.pixelLength() / 2) + axis.minoffset() + axis.parallelOffset(),
                perpOffset = axis.perpOffset(),
                Point      = window.multigraph.math.Point;

            if (axis.orientation() === ns.Axis.HORIZONTAL) {
                return new Point(axisBase, perpOffset);
            } else {
                return new Point(perpOffset, axisBase);
            }
        };

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
        AxisTitle.respondsTo("render", function (paper, set) {
            var title        = this.content(),
                storedAnchor = this.anchor(),
                base         = computePixelBasePoint(this),
                pixelAnchor,
                elem;

            pixelAnchor  = new window.multigraph.math.Point(
                0.5 * title.origWidth()  * storedAnchor.x(),
                0.5 * title.origHeight() * storedAnchor.y()
            );

            this.previousBase(base);

            elem = title.drawText(paper, pixelAnchor, base, this.position(), this.angle());

            this.elem(elem);
            set.push(elem);
        });

        AxisTitle.respondsTo("redraw", function () {
            var previousBase = this.previousBase(),
                base         = computePixelBasePoint(this),
                elem         = this.elem();

            if (base.x() === previousBase.x() && base.y() === previousBase.y()) {
                return this;
            }

            var deltaX = base.x() - previousBase.x(),
                deltaY = base.y() - previousBase.y(),
                x = elem.attr("x"),
                y = elem.attr("y");

            elem.attr({
                "x" : x + deltaX,
                "y" : y - deltaY
            });

            this.previousBase(base);
        });

    });

});
