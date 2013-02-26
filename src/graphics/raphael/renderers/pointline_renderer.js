window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var PointlineRenderer = ns.PointlineRenderer;

        PointlineRenderer.hasA("lineElem");
        PointlineRenderer.hasA("pointsElem");

        // cached settings object, for quick access during rendering, populated in begin() method:
        PointlineRenderer.hasA("settings");

        PointlineRenderer.respondsTo("begin", function (graphicsContext) {
            var settings = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "path"               : "",
                "points"             : [],
                "first"              : true,
                "pointshape"         : this.getOptionValue("pointshape"),
                "pointcolor"         : this.getOptionValue("pointcolor"),
                "pointopacity"       : this.getOptionValue("pointopacity"),
                "pointsize"          : this.getOptionValue("pointsize"),
                "pointoutlinewidth"  : this.getOptionValue("pointoutlinewidth"),
                "pointoutlinecolor"  : this.getOptionValue("pointoutlinecolor"),
                "linecolor"          : this.getOptionValue("linecolor"),
                "linewidth"          : this.getOptionValue("linewidth")
            };

            // turns off points for line renderers
            if (this.type() === ns.Renderer.LINE) {
                settings.pointsize = 0;
            }
            // turns off lines for point renderers
            if (this.type() === ns.Renderer.POINT) {
                settings.linewidth = 0;
            }

            this.settings(settings);
        });

        PointlineRenderer.respondsTo("beginRedraw", function () {
            var settings    = this.settings();
            settings.path   = "";
            settings.points = [];
            settings.first  = true;
        });

        PointlineRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings();

            if (this.isMissing(datap)) {
                settings.first = true;
                return;
            }
            var p = this.transformPoint(datap);
            if (settings.linewidth > 0) {
                if (settings.first) {
                    settings.path += "M" + p[0] + "," + p[1];
                    settings.first = false;
                } else {
                    settings.path += "L" + p[0] + "," + p[1];
                }
            }
            if (settings.pointsize > 0) {
                settings.points.push(p);
            }
        });

        PointlineRenderer.respondsTo("end", function () {
            var settings = this.settings(),
                paper    = settings.paper,
                set      = settings.set;

            if (settings.linewidth > 0) {
                var lineElem = paper.path(settings.path)
                    .attr({
                        "stroke"       : settings.linecolor.getHexString("#"),
                        "stroke-width" : settings.linewidth
                    });
                this.lineElem(lineElem);
                set.push(lineElem);
            }

            if (settings.pointsize > 0) {
                var pointsElem = paper.path(drawPoints(settings))
                        .attr(computePointAttributes(settings));
                this.pointsElem(pointsElem);
                set.push(pointsElem);
            }
        });

        PointlineRenderer.respondsTo("endRedraw", function () {
            var settings = this.settings();

            if (this.lineElem()) {
                this.lineElem().attr("path", settings.path);
            }

            if (this.pointsElem()) {
                this.pointsElem().attr("path", drawPoints(settings));
            }
        });

        var drawPoints = function (settings) {
            var points     = settings.points,
                pointshape = settings.pointshape,
                pointsize  = settings.pointsize,
                pointPath  = "",
                i;

            for (i = 0; i < points.length; ++i) {
                pointPath += drawPoint(pointshape, pointsize, points[i]);
            }

            return pointPath;
        };

        var drawPoint = function (shape, size, p) {
            var path,
                a,b,d;

            switch (shape) {
                case PointlineRenderer.PLUS:
                    path = "M" + p[0] + "," + (p[1]-size) +
                      "L" + p[0] + "," + (p[1]+size) +
                      "M" + (p[0]-size) + "," + p[1] +
                      "L" + (p[0]+size) + "," + p[1];
                    break;
                case PointlineRenderer.X:
                    d = 0.70710 * size;
                    path = "M" + (p[0]-d) + "," + (p[1]-d) +
                      "L" + (p[0]+d) + "," + (p[1]+d) +
                      "M" + (p[0]-d) + "," + (p[1]+d) +
                      "L" + (p[0]+d) + "," + (p[1]-d);
                    break;
                case PointlineRenderer.TRIANGLE:
                    d = 1.5 * size;
                    a = 0.866025 * d;
                    b = 0.5 * d;
                    path = "M" + p[0] + "," + (p[1]+d) +
                      "L" + (p[0]+a) + "," + (p[1]-b) +
                      "L" + (p[0]-a) + "," + (p[1]-b) +
                      "Z";
                    break;
                case PointlineRenderer.DIAMOND:
                    d = 1.5 * size;
                    path = "M" + (p[0]-size) + "," + p[1] +
                      "L" + p[0] + "," + (p[1]+d) +
                      "L" + (p[0]+size) + "," + p[1] +
                      "L" + p[0] + "," + (p[1]-d) +
                      "Z";
                    break;
                case PointlineRenderer.STAR:
                    d = 1.5 * size;
                    path = "M" + (p[0]-d*0.0000) + "," + (p[1]+d*1.0000) +
                      "L" + (p[0]+d*0.3536) + "," + (p[1]+d*0.3536) +
                      "L" + (p[0]+d*0.9511) + "," + (p[1]+d*0.3090) +
                      "L" + (p[0]+d*0.4455) + "," + (p[1]-d*0.2270) +
                      "L" + (p[0]+d*0.5878) + "," + (p[1]-d*0.8090) +
                      "L" + (p[0]-d*0.0782) + "," + (p[1]-d*0.4938) +
                      "L" + (p[0]-d*0.5878) + "," + (p[1]-d*0.8090) +
                      "L" + (p[0]-d*0.4938) + "," + (p[1]-d*0.0782) +
                      "L" + (p[0]-d*0.9511) + "," + (p[1]+d*0.3090) +
                      "L" + (p[0]-d*0.2270) + "," + (p[1]+d*0.4455) +
                      "Z";
                    break;
                case PointlineRenderer.SQUARE:
                    path = "M" + (p[0] - size) + "," +  (p[1] - size) +
                      "L" + (p[0] + (2 * size)) + "," +  (p[1] - size) +
                      "L" + (p[0] + (2 * size)) + "," +  (p[1] + (2 * size)) +
                      "L" + (p[0] - size) + "," +  (p[1] + (2 * size)) +
                      "Z";
                    break;
                default: // PointlineRenderer.CIRCLE
                    path = "M" + p[0] + "," + p[1] +
                      "m0," + (-size) +
                      "a" + size + "," + size + ",0,1,1,0," + (2 * size) +
                      "a" + size + "," + size + ",0,1,1,0," + (-2 * size) +
                      "z";
                    break;
            }
            return path;
        };

        var computePointAttributes = function (settings) {
            if ((settings.pointshape === PointlineRenderer.PLUS) || (settings.pointshape === PointlineRenderer.X)) {
                return {
                    "stroke"       : settings.pointcolor.getHexString("#"),
                    "stroke-width" : settings.pointoutlinewidth
                };
            } else {
                return {
                    "fill"         : settings.pointcolor.toRGBA(settings.pointopacity),
                    "stroke"       : settings.pointoutlinecolor.getHexString("#"),
                    "stroke-width" : settings.pointoutlinewidth
                };
            }
        };

        PointlineRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon) {
            var settings = this.settings(),
                paper = graphicsContext.paper,
                set   = graphicsContext.set,
                iconWidth  = icon.width(),
                iconHeight = icon.height();

            // Draw icon background (with opacity)
            set.push(
                paper.rect(x, y, iconWidth, iconHeight)
                    .attr({
                        "stroke" : "rgba(255, 255, 255, 1)",
                        "fill"   : "rgba(255, 255, 255, 1)"
                    })
            );

            if (settings.linewidth > 0) {
                var path = "M" + x + "," + (y + iconHeight/2) +
                    "L" + (x + iconWidth) + "," + (y + iconHeight/2);
                set.push(
                    paper.path(path)
                        .attr({
                            "stroke"       : settings.linecolor.toRGBA(),
                            "stroke-width" : settings.linewidth
                        })
                );
            }
            if (settings.pointsize > 0) {
                set.push(
                    paper.path( drawPoint(settings.pointshape, settings.pointsize, [(x + iconWidth/2), (y + iconHeight/2)]) )
                        .attr(computePointAttributes(settings))
                );
            }

        });

        PointlineRenderer.respondsTo("redrawLegendIcon", function () {
            // no-op
        });

    });

});
