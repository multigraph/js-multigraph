window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var drawText = function (text, graphicsContext, base, anchor, position, angle, color) {
            var h = text.origHeight(),
                w = text.origWidth(),
                ax = 0.5 * w * anchor.x(),
                ay = 0.5 * h * anchor.y(),
                transformString = "",
                textAttrs = {};

            transformString += "t" + base.x() + "," + base.y();
            transformString += "s1,-1";
            transformString += "t" + position.x() + "," + (-position.y());
            transformString += "r" + (-angle);
            transformString += "t" + (-ax) + "," + ay;

            textAttrs.fill = color.getHexString("#");

            graphicsContext.set.push(
                graphicsContext.paper.text(0, 0, text.string()).transform(transformString).attr(textAttrs)
            );

        };

        ns.Labeler.respondsTo("measureStringWidth", function (elem, string) {
            return (new ns.Text(string)).initializeGeometry({
                    "elem"  : elem,
                    "angle" : this.angle()
                }).rotatedWidth();
        });
        ns.Labeler.respondsTo("measureStringHeight", function (elem, string) {
            return (new ns.Text(string)).initializeGeometry({
                    "elem"  : elem,
                    "angle" : this.angle()
                }).rotatedHeight();
        });

        ns.Labeler.respondsTo("renderLabel", function (graphicsContext, value) {
            var formattedString = new ns.Text(this.formatter().format(value)),
                a = this.axis().dataValueToAxisValue(value);

            formattedString.initializeGeometry({
                    "elem"  : graphicsContext.textElem,
                    "angle" : this.angle()
                });

            if (this.axis().orientation() === ns.Axis.HORIZONTAL) {
                drawText(formattedString, graphicsContext, new window.multigraph.math.Point(a, this.axis().perpOffset()), this.anchor(), this.position(), this.angle(), this.color());
            } else {
                drawText(formattedString, graphicsContext, new window.multigraph.math.Point(this.axis().perpOffset(), a), this.anchor(), this.position(), this.angle(), this.color());
            }
        });

    });

});
