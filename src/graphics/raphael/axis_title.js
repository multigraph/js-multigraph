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
            var axis = labeler.axis(),
                axisBase = (labeler.base() + 1) * (axis.pixelLength() / 2) + axis.minoffset() + axis.parallelOffset(),
                Point = window.multigraph.math.Point;

            if (axis.orientation() === ns.Axis.HORIZONTAL) {
                return new Point(axisBase, axis.perpOffset());
            } else {
                return new Point(axis.perpOffset(), axisBase);
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
            var content = this.content(),
                h = content.origHeight(),
                w = content.origWidth(),
                ax = 0.5 * w * this.anchor().x(),
                ay = 0.5 * h * this.anchor().y(),
                base = computePixelBasePoint(this),
                transformString = "t" + base.x() + "," + base.y() +
                    "s1,-1" +
                    "t" + this.position().x() + "," + (-this.position().y()) +
                    "r" + (-this.angle()) +
                    "t" + (-ax) + "," + ay;

            this.previousBase(base);

            var elem = paper.text(0, 0, content.string())
                .transform(transformString);
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
