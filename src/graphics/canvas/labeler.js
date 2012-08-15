window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var measureTextWidth = function (context, string) {
            var metrics = context.measureText(string);
            return metrics.width;
        };

        var measureTextHeight = function (context, string) {
            //NOTE: kludge: canvas cannot exactly measure text height, so we just return a value
            //      estimated by using the width of an "M" as a substitute.  Maybe improve this
            //      later by using a better workaround.
            var metrics = context.measureText("M");
            return metrics.width;
        };

        var drawText = function (text, context, base, anchor, position, angle) {
            var h = measureTextHeight(context, text);
            var w = measureTextWidth(context, text);
            var ax = 0.5 * w * (anchor.x() + 1);
            var ay = 0.5 * h * (anchor.y() + 1);

            context.save();
            //TODO: later on, once we're sure this is doing the correct thing, combine these 4 transformations
            //      into a single one for efficiency:
            context.transform(1,0,0,-1,0,2*base.y());
            context.transform(1,0,0,1,-ax+position.x(),ay-position.y());
            context.transform(1,0,0,1,base.x(),base.y());
            context.rotate(-angle*Math.PI/180.0);
            context.fillText(text, 0, 0);
            context.restore();
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
