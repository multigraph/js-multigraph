module.exports = function() {
    var Labeler = require('../../core/labeler.js'),
        Text = require('../../core/text.js'),
        Axis = require('../../core/axis.js'),
        Point = require('../../math/point.js');

    if (typeof(Labeler.renderLabel)==="function") { return Labeler; }

    Labeler.respondsTo("measureStringWidth", function (context, string) {
        return (new Text(string)).initializeGeometry({
            "context" : context,
            "angle"   : this.angle()
        }).rotatedWidth();
    });

    Labeler.respondsTo("measureStringHeight", function (context, string) {
        return (new Text(string)).initializeGeometry({
            "context" : context,
            "angle"   : this.angle()
        }).rotatedHeight();
    });

    Labeler.respondsTo("renderLabel", function (context, value) {
        var axis            = this.axis(),
            storedAnchor    = this.anchor(),
            angle           = this.angle(),
            perpOffset      = axis.perpOffset(),
            a               = axis.dataValueToAxisValue(value),
            formattedString = new Text(this.formatter().format(value)),
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

        if (axis.orientation() === Axis.HORIZONTAL) {
            base = new Point(a, perpOffset);
        } else {
            base = new Point(perpOffset, a);
        }


        context.save();
        context.fillStyle = this.color().getHexString("#");
        formattedString.drawText(context, pixelAnchor, base, this.position(), angle);
        context.restore();
    });

    return Labeler;
};
