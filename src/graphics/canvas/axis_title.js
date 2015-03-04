module.exports = function() {
    var AxisTitle = require('../../core/axis_title.js'),
        Axis = require('../../core/axis.js'),
        Point = require('../../math/point.js');

    if (typeof(AxisTitle.render)==="function") { return AxisTitle; }

    AxisTitle.respondsTo("render", function (context) {
        var axis        = this.axis(),
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

        if (axis.orientation() === Axis.HORIZONTAL) {
            pixelBase = new Point(storedBase, perpOffset);
        } else {
            pixelBase = new Point(perpOffset, storedBase);
        }

        context.save();
        context.fillStyle = "rgba(0, 0, 0, 1)";
        title.drawText(context, pixelAnchor, pixelBase, this.position(), this.angle());
        context.restore();
    });

    return AxisTitle;
};
