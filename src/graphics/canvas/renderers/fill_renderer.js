window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var toRGBA = function (color, alpha) {
            if (!(color instanceof window.multigraph.math.RGBColor)) {
                throw new Error("graphics.raphael.toRGBA: first argument must be an RGBColor instance");
            }
            if (alpha === undefined) {
                alpha = 1.0;
            }
            if (typeof(alpha) !== "number") {
                throw new Error("graphics.raphael.toRGBA: second argument, if present, must be a number");
            }
            return "rgba(" + (255*color.r()) + ", " + (255*color.g()) + ", " + (255*color.b()) + ", " + alpha + ")";
        };

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.FillRenderer.hasA("settings");

        ns.FillRenderer.respondsTo("begin", function (context) {
            var settings = {
                "context" : context,
                "previouspoint"      : null,
                "first"              : true,
                "linecolor"          : this.getOptionValue("linecolor"),
                "linewidth"          : this.getOptionValue("linewidth"),
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "downfillcolor"      : this.getOptionValue("downfillcolor"),
                "fillopacity"        : this.getOptionValue("fillopacity"),
                "fillbase"           : this.getOptionValue("fillbase")
            };
            if (settings.fillbase !== null) {
                settings.fillbase = this.plot().verticalaxis().dataValueToAxisValue(settings.fillbase);
            } else {
                settings.fillbase = 0;
            }

            this.settings(settings);

            context.fillStyle = settings.fillcolor.getHexString("#");
        });

        ns.FillRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                context = settings.context,
                p,
                xFill;

            if (this.isMissing(datap)) {
                settings.first = true;
                settings.previouspoint = null;
                return;
            }

            p = this.transformPoint(datap);

            if (settings.first) {
                settings.first = false;
                settings.previouspoint = p;
                return;
            } else {
                // fill area
                xFill = p[0] + 1 // increases width of each fill area by 1 to ensure contiguous fill
                context.strokeStyle = settings.fillcolor.getHexString("#");
                context.linewidth = 1;
                context.beginPath();
                context.moveTo(settings.previouspoint[0], settings.previouspoint[1]);
                context.lineTo(xFill, p[1]);
                context.lineTo(xFill, settings.fillbase);
                context.lineTo(settings.previouspoint[0], settings.fillbase);
                context.fill();
                context.closePath();

                // line
                if (settings.linewidth > 0) {
                    context.strokeStyle = settings.linecolor.getHexString("#");
                    context.linewidth = settings.linewidth;
                    context.beginPath();
                    context.moveTo(settings.previouspoint[0], settings.previouspoint[1]);
                    context.lineTo(p[0], p[1]);
                    context.stroke();
                    context.closePath();
                }

                settings.previouspoint = p;
                return;                
            }
        });

        ns.FillRenderer.respondsTo("end", function () {
            //no-op
            return;
        });

    });

});
