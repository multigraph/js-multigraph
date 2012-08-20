window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var measureTextWidth = function (elem, string) {
            elem.attr("text", string);
            return elem.getBBox().width; 
        };

        var measureTextHeight = function (elem, string) {
            elem.attr("text", string);
            return elem.getBBox().height; 
        };

        var drawText = function (text, graphicsContext, base, anchor, position, angle) {
            var h = measureTextHeight(graphicsContext.textElem, text),
                w = measureTextWidth(graphicsContext.textElem, text),
                ax = 0.5 * w * anchor.x(),
                ay = 0.5 * h * anchor.y(),

                dx = base.x() + position.x() + ax,
                dy = base.y() + position.y() - ay,
                transformString = "";

            transformString += graphicsContext.transformString;
            transformString += "r" + angle + "," + (dx - w/2) + "," + (dy - h/2);
            transformString += "s1,-1";

            graphicsContext.paper.text(dx, dy, text).transform(transformString);

        };

        ns.Labeler.respondsTo("measureStringWidth", function (graphicsContext, string) {
            return measureTextWidth(graphicsContext, string);
        });

        ns.Labeler.respondsTo("renderLabel", function (graphicsContext, value) {
            var formattedString = this.formatter().format(value),
                a = this.axis().dataValueToAxisValue(value);
            if (this.axis().orientation() === ns.Axis.HORIZONTAL) {
                drawText(formattedString, graphicsContext, new window.multigraph.math.Point(a, this.axis().perpOffset()), this.anchor(), this.position(), this.angle());
            } else {
                drawText(formattedString, graphicsContext, new window.multigraph.math.Point(this.axis().perpOffset(), a), this.anchor(), this.position(), this.angle());
            }
        });


    });

});
