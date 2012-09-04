window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var measureTextWidth = function (graphicsContext, string) {
            return string.length * 7;
        };

        var measureTextHeight = function (graphicsContext, string) {
            return 9;
        };

        var drawText = function (text, graphicsContext, base, anchor, position, angle) {
            var h = measureTextHeight(graphicsContext.textElem, text),
                w = measureTextWidth(graphicsContext.textElem, text),
                ax = 0.5 * w * anchor.x(),
                ay = 0.5 * h * anchor.y(),
                dx = base.x() + position.x() + ax,
                dy = base.y() + position.y() - ay;

            return { "text"  : text,
                     "x"     : dx,
                     "y"     : dy,
                     "angle" : angle
                   };
        };

        ns.Labeler.respondsTo("measureStringWidth", function (graphicsContext, string) {
            return measureTextWidth(graphicsContext, string);
        });

        ns.Labeler.respondsTo("renderLabel", function (graphicsContext, value) {
            var formattedString = this.formatter().format(value),
                a = this.axis().dataValueToAxisValue(value);
            if (this.axis().orientation() === ns.Axis.HORIZONTAL) {
                return drawText(formattedString, graphicsContext, new window.multigraph.math.Point(a, this.axis().perpOffset()), this.anchor(), this.position(), this.angle());
            } else {
                return drawText(formattedString, graphicsContext, new window.multigraph.math.Point(this.axis().perpOffset(), a), this.anchor(), this.position(), this.angle());
            }
        });


    });

});
