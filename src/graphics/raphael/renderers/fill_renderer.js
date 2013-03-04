window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var FillRenderer = ns.FillRenderer;

        FillRenderer.hasA("fillElem");
        FillRenderer.hasA("lineElem");

        // cached settings object, for quick access during rendering, populated in begin() method:
        FillRenderer.hasA("settings");

        FillRenderer.respondsTo("begin", function (graphicsContext) {
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
                settings.fillpixelbase = this.plot().verticalaxis().dataValueToAxisValue(settings.fillbase);
            } else {
                settings.fillpixelbase = 0;
            }

            this.settings(settings);
        });

        FillRenderer.respondsTo("beginRedraw", function () {
            var settings = this.settings();
            settings.path          = "";
            settings.fillpath      = "";
            settings.previouspoint = null;
            settings.first         = true;
            if (settings.fillbase !== null) {
                settings.fillpixelbase = this.plot().verticalaxis().dataValueToAxisValue(settings.fillbase);
            } else {
                settings.fillpixelbase = 0;
            }
        });

        FillRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                fillpath = settings.fillpath,
                path     = settings.path,
                p;

            if (this.isMissing(datap)) {
                if (settings.previouspoint !== null) {
                    fillpath = fillpath + "L" + settings.previouspoint[0] + "," + settings.fillpixelbase;
                }
                settings.first = true;
                settings.previouspoint = null;
                return;
            }

            p = this.transformPoint(datap);

            if (settings.first) {
                settings.first = false;
                fillpath = fillpath +
                    "M" + p[0] + "," + settings.fillpixelbase +
                    "L" + p[0] + "," + p[1];
                if (settings.linewidth > 0) {
                    path = path + "M" + p[0] + "," + p[1];
                }
            } else {
                fillpath = fillpath + "L" + p[0] + "," + p[1];
                if (settings.linewidth > 0) {
                    path = path + "L" + p[0] + "," + p[1];
                }
            }

            settings.fillpath = fillpath;
            settings.path     = path;
            settings.previouspoint = p;
        });

        FillRenderer.respondsTo("end", function () {
            var settings = this.settings(),
                paper = settings.paper,
                set   = settings.set;
            
            if (settings.previouspoint !== null) {
                settings.fillpath = settings.fillpath + "L" + settings.previouspoint[0] + "," + settings.fillpixelbase;
            }

            var fillElem = paper.path(settings.fillpath)
                .attr({
                    fill   : settings.fillcolor.toRGBA(settings.fillopacity),
                    stroke : "none"
                });
            this.fillElem(fillElem);
            set.push(fillElem);

            if (settings.linewidth > 0) {
                var lineElem = paper.path(settings.path)
                    .attr({
                        "stroke"       : settings.linecolor.getHexString("#"),
                        "stroke-width" : settings.linewidth
                    });
                this.lineElem(lineElem);
                set.push(lineElem);
            }
        });

        FillRenderer.respondsTo("endRedraw", function () {
            var settings = this.settings();
            
            if (settings.previouspoint !== null) {
                settings.fillpath = settings.fillpath + "L" + settings.previouspoint[0] + "," + settings.fillpixelbase;
            }
            this.fillElem().attr("path", settings.fillpath);
            if (this.lineElem()) {
                this.lineElem().attr("path", settings.path);
            }
        });

        FillRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon) {
            var settings = this.settings(),
                paper = graphicsContext.paper,
                set   = graphicsContext.set,
                iconWidth  = icon.width(),
                iconHeight = icon.height(),
                iconBackgroundAttrs = {},
                path = "M0,0";
            
            // Draw icon background (with opacity)
            iconBackgroundAttrs.stroke = "rgba(255, 255, 255, 1)";
            if (iconWidth < 10 || iconHeight < 10) {
                iconBackgroundAttrs.fill = settings.fillcolor.toRGBA(settings.fillopacity);
            } else {
                iconBackgroundAttrs.fill = "rgba(255, 255, 255, 1)";
            }

            set.push(
                paper.rect(x, y, iconWidth, iconHeight)
                    .attr(iconBackgroundAttrs)
            );

            // Draw the middle range icon or the large range icon if the width and height allow it
            if (iconWidth > 10 || iconHeight > 10) {
                // Draw a more complex icon if the icons width and height are large enough
                if (iconWidth > 20 || iconHeight > 20) {
                    path = path +
                        "L" + (iconWidth / 6) + "," + (iconHeight / 2) +
                        "L" + (iconWidth / 3) + "," + (iconHeight / 4);
                }
                path = path + "L" + (iconWidth / 2) + "," + (iconHeight - iconHeight / 4);

                if (iconWidth > 20 || iconHeight > 20) {
                    path = path +
                        "L" + (iconWidth - iconWidth / 3) + "," + (iconHeight / 4) +
                        "L" + (iconWidth - iconWidth / 6) + "," + (iconHeight / 2);
                }
            }

            path = path + "L" + iconWidth + ",0";

            set.push(
                paper.path(path)
                    .attr({
                        "stroke"       : settings.linecolor.toRGBA(settings.fillopacity),
                        "stroke-width" : settings.linewidth,
                        "fill"         : settings.fillcolor.toRGBA(settings.fillopacity)
                    })
                    .transform("t" + x + "," + y)
            );
        });

        FillRenderer.respondsTo("redrawLegendIcon", function () {
            // no-op
        });

    });

});
