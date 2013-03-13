window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.PointlineRenderer.hasA("settings");

        ns.PointlineRenderer.respondsTo("begin", function (context) {
            var settings = {
                "context"            : context,
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

            if (settings.linewidth > 0) {
                context.save();
                context.beginPath();
                context.lineWidth = settings.linewidth;
                context.strokeStyle = settings.linecolor.getHexString("#");
            }
        });
        ns.PointlineRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                context  = settings.context,
                p;
            if (this.isMissing(datap)) {
                settings.first = true;
                return;
            }
            p = this.transformPoint(datap);
            if (settings.linewidth > 0) {
                if (settings.first) {
                    context.moveTo(p[0], p[1]);
                    settings.first = false;
                } else {
                    context.lineTo(p[0], p[1]);
                }
            }
            if (settings.pointsize > 0) {
                settings.points.push(p);
            }
        });

        ns.PointlineRenderer.respondsTo("end", function () {
            var settings = this.settings(),
                context  = settings.context;
            if (settings.linewidth > 0) {
                context.stroke();
                context.restore();
            }
            if (settings.pointsize > 0) {
                this.drawPoints();
            }
        });


        ns.PointlineRenderer.respondsTo("drawPoints", function (p) {
            var settings = this.settings(),
                context  = settings.context,
                points   = settings.points,
                i;

            context.save();
            context.beginPath();
            if ((settings.pointshape === ns.PointlineRenderer.PLUS) || (settings.pointshape === ns.PointlineRenderer.X)) {
                context.strokeStyle = settings.pointcolor.getHexString("#");
                context.lineWidth = settings.pointoutlinewidth;
            } else {
                context.fillStyle = settings.pointcolor.toRGBA(settings.pointopacity);
                context.strokeStyle = settings.pointoutlinecolor.getHexString("#");
                context.lineWidth = settings.pointoutlinewidth;
            }

            for (i=0; i<points.length; ++i) {
                this.drawPoint(context, settings, points[i]);
            }

            if (!((settings.pointshape === ns.PointlineRenderer.PLUS) || (settings.pointshape === ns.PointlineRenderer.X))) {
                context.fill();
            }
            context.stroke();
            context.restore();
        });

        ns.PointlineRenderer.respondsTo("drawPoint", function (context, settings, p) {
            var pointsize = settings.pointsize,
                p0 = p[0],
                p1 = p[1],
                a,b,d;

            switch (settings.pointshape) {
                case ns.PointlineRenderer.PLUS:
                    context.moveTo(p0,             p1 - pointsize);
                    context.lineTo(p0,             p1 + pointsize);
                    context.moveTo(p0 - pointsize, p1);
                    context.lineTo(p0 + pointsize, p1);
                    return;
                case ns.PointlineRenderer.X:
                    d = 0.70710 * pointsize;
                    context.moveTo(p0-d, p1-d);
                    context.lineTo(p0+d, p1+d);
                    context.moveTo(p0-d, p1+d);
                    context.lineTo(p0+d, p1-d);
                    return;
                case ns.PointlineRenderer.SQUARE:
                    context.moveTo(p0 - pointsize, p1 - pointsize);
                    context.lineTo(p0 + pointsize, p1 - pointsize);
                    context.lineTo(p0 + pointsize, p1 + pointsize);
                    context.lineTo(p0 - pointsize, p1 + pointsize);
                    return;
                case ns.PointlineRenderer.TRIANGLE:
                    d = 1.5 * pointsize;
                    a = 0.866025 * d;
                    b = 0.5 * d;
                    context.moveTo(p0,     p1 + d);
                    context.lineTo(p0 + a, p1 - b);
                    context.lineTo(p0 - a, p1 - b);
                    return;
                case ns.PointlineRenderer.DIAMOND:
                    d = 1.5 * pointsize;
                    context.moveTo(p0 - pointsize, p1);
                    context.lineTo(p0,             p1 + d);
                    context.lineTo(p0 + pointsize, p1);
                    context.lineTo(p0,             p1 - d);
                    return;
                case ns.PointlineRenderer.STAR:
                    d = 1.5 * pointsize;
                    context.moveTo(p0 - d*0.0000, p1 + d*1.0000);
                    context.lineTo(p0 + d*0.3536, p1 + d*0.3536);
                    context.lineTo(p0 + d*0.9511, p1 + d*0.3090);
                    context.lineTo(p0 + d*0.4455, p1 - d*0.2270);
                    context.lineTo(p0 + d*0.5878, p1 - d*0.8090);
                    context.lineTo(p0 - d*0.0782, p1 - d*0.4938);
                    context.lineTo(p0 - d*0.5878, p1 - d*0.8090);
                    context.lineTo(p0 - d*0.4938, p1 - d*0.0782);
                    context.lineTo(p0 - d*0.9511, p1 + d*0.3090);
                    context.lineTo(p0 - d*0.2270, p1 + d*0.4455);
                    return;
                case ns.PointlineRenderer.CIRCLE:
                    context.moveTo(p0 + pointsize, p1);
                    context.arc(p0, p1, pointsize, 0, 2*Math.PI, false);
                    return;
            }
        });

        ns.PointlineRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon) {
            var settings = this.settings();

            context.save();
            // Draw icon background (with opacity)
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.fillRect(x, y, icon.width(), icon.height());

            if (settings.linewidth > 0) {
                context.strokeStyle = settings.linecolor.toRGBA();
                context.lineWidth   = settings.linewidth;
                context.beginPath();
                context.moveTo(x, y + icon.height()/2);
                context.lineTo(x + icon.width(), y + icon.height()/2);
                context.stroke();
            }
            if (settings.pointsize > 0) {
                context.beginPath();
                if ((settings.pointshape === ns.PointlineRenderer.PLUS) || (settings.pointshape === ns.PointlineRenderer.X)) {
                    context.strokeStyle = settings.pointcolor.toRGBA();
                    context.lineWidth   = settings.pointoutlinewidth;
                } else {
                    context.fillStyle   = settings.pointcolor.toRGBA(settings.pointopacity);
                    context.strokeStyle = settings.pointoutlinecolor.toRGBA();
                    context.lineWidth   = settings.pointoutlinewidth;
                }

                this.drawPoint(context, settings, [(x + icon.width()/2), (y + icon.height()/2)]);

                if (!((settings.pointshape === ns.PointlineRenderer.PLUS) || (settings.pointshape === ns.PointlineRenderer.X))) {
                    context.fill();
                }
                context.stroke();
            }
            context.restore();
        });

    });

});
