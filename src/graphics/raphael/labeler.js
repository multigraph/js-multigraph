window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

/*
        var measureTextWidth = function (elem, string) {
            elem.attr("text", string);
            return elem.getBBox().width; 
        };

        var measureTextHeight = function (elem, string) {
            elem.attr("text", string);
            return elem.getBBox().height; 
        };
*/

        var drawText = function (text, graphicsContext, base, anchor, position, angle, color) {
            var h = text.origHeight(),
                w = text.origWidth(),
                ax = 0.5 * w * (anchor.x() + 1),
                ay = 0.5 * h * (anchor.y() + 1),
                dx = base.x() + (0.5 * w) + position.x() - ax,
                dy = base.y() - (0.5 * h) - position.y() + ay,
                transformString = "",
                textAttrs = {};

            transformString += "s1,-1," + dx + "," + base.y();
            transformString += "r" + (-angle) + "," + (dx - w/2) + "," + dy;

            textAttrs.fill = color.getHexString("#");

            graphicsContext.set.push(
                graphicsContext.paper.text(dx, dy, text.string()).transform(transformString).attr(textAttrs)
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
