window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

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

            if (settings.fillbase !== null) {
                settings.fillbase = this.plot().verticalaxis().dataValueToAxisValue(settings.fillbase);
            } else {
                settings.fillbase = 0;
            }

            this.settings(settings);
        });

        ns.FillRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                if (settings.previouspoint !== null) {
                    settings.fillpath += "L" + settings.previouspoint[0] + "," + settings.fillbase;
                }
                settings.first = true;
                settings.previouspoint = null;
                return;
            }

            p = this.transformPoint(datap);

            if (settings.first) {
                settings.first = false;
                settings.fillpath += "M" + p[0] + "," + settings.fillbase;
                settings.fillpath += "L" + p[0] + "," + p[1];
                if (settings.linewidth > 0) {
                    settings.path += "M" + p[0] + "," + p[1];
                }
            } else {
                settings.fillpath += "L" + p[0] + "," + p[1];
                if (settings.linewidth > 0) {
                    settings.path += "L" + p[0] + "," + p[1];
                }
            }

            settings.previouspoint = p;
        });

        ns.FillRenderer.respondsTo("end", function () {
            var settings = this.settings();
            
            if (settings.previouspoint !== null) {
                settings.fillpath += "L" + settings.previouspoint[0] + "," + settings.fillbase;
            }
            settings.set.push( settings.paper.path(settings.fillpath)
                               .attr({
                                   "fill"   : settings.fillcolor.toRGBA(settings.fillopacity),
                                   "stroke" : settings.fillcolor.toRGBA(settings.fillopacity)
                               }));

            if (settings.linewidth > 0) {
                settings.set.push( settings.paper.path(settings.path)
                                   .attr({
                                       "stroke"       : settings.linecolor.getHexString("#"),
                                       "stroke-width" : settings.linewidth
                                   }));
            }

        });

        ns.FillRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon, opacity) {
            var settings = this.settings(),
                iconBackgroundAttrs = {},
                path = "";
            
            // Draw icon background (with opacity)
            iconBackgroundAttrs.stroke = "rgba(255, 255, 255, 1)";
            if (icon.width() < 10 || icon.height() < 10) {
                iconBackgroundAttrs.fill = settings.fillcolor.toRGBA(settings.fillopacity);
            } else {
                iconBackgroundAttrs.fill = "rgba(255, 255, 255, 1)";
            }

            graphicsContext.set.push(
                graphicsContext.paper.rect(x, y, icon.width(), icon.height())
                    .attr(iconBackgroundAttrs)
            );

            path += "M0,0";

      // Draw the middle range icon or the large range icon if the width and height allow it
            if (icon.width() > 10 || icon.height() > 10) {
        // Draw a more complex icon if the icons width and height are large enough
                if (icon.width() > 20 || icon.height() > 20) {
                    path += "L" + (icon.width() / 6) + "," + (icon.height() / 2);
                    path += "L" + (icon.width() / 3) + "," + (icon.height() / 4);
                }
                path += "L" + (icon.width() / 2) + "," + (icon.height() - icon.height() / 4);

                if (icon.width() > 20 || icon.height() > 20) {
                    path += "L" + (icon.width() - icon.width() / 3) + "," + (icon.height() / 4);
                    path += "L" + (icon.width() - icon.width() / 6) + "," + (icon.height() / 2);
                }
            }

            path += "L" + icon.width() + ",0";

            graphicsContext.set.push(
                graphicsContext.paper.path(path)
                    .attr({
                        "stroke"       : settings.linecolor.toRGBA(settings.fillopacity),
                        "stroke-width" : settings.linewidth,
                        "fill"         : settings.fillcolor.toRGBA(settings.fillopacity)
                    })
                    .transform("t" + x + "," + y)
            );
        });

    });

});
