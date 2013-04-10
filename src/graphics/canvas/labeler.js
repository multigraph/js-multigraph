window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Labeler = ns.Labeler;

        Labeler.respondsTo("measureStringWidth", function (context, string) {
            return (new ns.Text(string)).initializeGeometry({
                    "context" : context,
                    "angle"   : this.angle()
                }).rotatedWidth();
        });

        Labeler.respondsTo("measureStringHeight", function (context, string) {
            return (new ns.Text(string)).initializeGeometry({
                    "context" : context,
                    "angle"   : this.angle()
                }).rotatedHeight();
        });

        Labeler.respondsTo("renderLabel", function (context, value) {
            var Point           = window.multigraph.math.Point,
                axis            = this.axis(),
                storedAnchor    = this.anchor(),
                angle           = this.angle(),
                perpOffset      = axis.perpOffset(),
                a               = axis.dataValueToAxisValue(value),
                formattedString = new ns.Text(this.formatter().format(value)),
                pixelAnchor,
                base;

            formattedString.initializeGeometry({
                    "context" : context,
                    "angle"   : angle
                });

            pixelAnchor = new Point(
                0.5 * formattedString.origWidth() * (storedAnchor.x() + 1),
                0.5 * formattedString.origHeight() * (storedAnchor.y() + 1)
            );

            if (axis.orientation() === ns.Axis.HORIZONTAL) {
                base = new Point(a, perpOffset);
            } else {
                base = new Point(perpOffset, a);
            }


            context.save();
            context.fillStyle = this.color().getHexString("#");
            formattedString.drawText(context, pixelAnchor, base, this.position(), angle);
            context.restore();
        });

    });

});
