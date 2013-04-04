window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Labeler = ns.Labeler;
        var drawText = function (text, context, base, anchor, position, angle, color) {
            var h = text.origHeight(),
                w = text.origWidth(),
                ax = 0.5 * w * (anchor.x() + 1),
                ay = 0.5 * h * (anchor.y() + 1);

            context.save();
            context.fillStyle = color.getHexString("#");
            //TODO: later on, once we're sure this is doing the correct thing, combine these 4 transformations
            //      into a single one for efficiency:
            context.transform(1,0,0,-1,0,2*base.y());
            context.transform(1,0,0,1,base.x(),base.y());
            context.transform(1,0,0,1,position.x(),-position.y());
            context.rotate(-angle*Math.PI/180.0);
            context.transform(1,0,0,1,-ax,ay);
            context.fillText(text.string(), 0, 0);
            context.restore();
        };

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
            var Point = window.multigraph.math.Point,
                axis = this.axis(),
                formattedString = new ns.Text(this.formatter().format(value)),
                a = axis.dataValueToAxisValue(value),
                base;

            formattedString.initializeGeometry({
                    "context" : context,
                    "angle"   : this.angle()
                });

            if (axis.orientation() === ns.Axis.HORIZONTAL) {
                base = new Point(a, axis.perpOffset());
            } else {
                base = new Point(axis.perpOffset(), a);
            }
            drawText(formattedString, context, base, this.anchor(), this.position(), this.angle(), this.color());
        });

    });

});
