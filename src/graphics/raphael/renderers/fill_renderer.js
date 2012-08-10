window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
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

        ns.FillRenderer.respondsTo("begin", function (graphicsContext) {
            var settings = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "path"               : "",
                "fillpath"           : "",
                "previouspoint"      : null,
                "first"              : true,
                "linecolor"          : this.getOptionValue("linecolor"),
                "linewidth"          : this.getOptionValue("linewidth"),
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "downfillcolor"      : this.getOptionValue("downfillcolor"),
                "fillopacity"        : this.getOptionValue("fillopacity"),
                "fillbase"           : this.getOptionValue("fillbase")
            };
            this.settings(settings);
        });

        ns.FillRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                settings.first = true;
                if (settings.previouspoint) {
                    settings.fillpath += "L" + settings.previouspoint[0] + "," + "0"/*settings.fillbase || 0*/;
                }
                return;
            }

            p = this.transformPoint(datap);

            if (settings.first) {
                settings.fillpath += "M" + p[0] + "," + "0"/*fillbase || 0*/;
                if (settings.linewidth <= 0) {
                    settings.first = false;
                }
            }
            settings.fillpath += "L" + p[0] + "," + p[1];

            if (settings.linewidth > 0) {
                if (settings.first) {
                    settings.path += "M" + p[0] + "," + p[1];
                    settings.first = false;
                } else {
                    settings.path += "L" + p[0] + "," + p[1];
                }
            }

            settings.previouspoint = p;
        });

        ns.FillRenderer.respondsTo("end", function () {
            var settings = this.settings();
            
            if (settings.previouspoint) {
                settings.fillpath += "L" + settings.previouspoint[0] + "," + "0"/*settings.fillbase || 0*/;
            }
            settings.set.push( settings.paper.path(settings.fillpath)
                               .attr({
                                   "fill"        : toRGBA(settings.fillcolor, settings.fillopacity),
                                   "stroke-width": 0.0001
                               }));

            if (settings.linewidth > 0) {
                settings.set.push( settings.paper.path(settings.path)
                                   .attr({
                                       "stroke": settings.linecolor.getHexString("#"),
                                       "stroke-width": settings.linewidth
                                   }));
            }

        });

    });

});
