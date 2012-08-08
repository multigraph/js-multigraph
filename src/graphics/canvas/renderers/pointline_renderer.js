window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        var toRGBA = function (color, alpha) {
            if (!(color instanceof window.multigraph.math.RGBColor)) {
                throw new Error("graphics.canvas.toRGBA: first argument must be an RGBColor instance");
            }
            if (alpha === undefined) {
                alpha = 1.0;
            }
            if (typeof(alpha) !== "number") {
                throw new Error("graphics.canvas.toRGBA: second argument, if present, must be a number");
            }
            return 'rgba('+(255*color.r())+', '+(255*color.g())+', '+(255*color.b())+', '+alpha+')';
        };

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.PointlineRenderer.hasA("settings");

        ns.PointlineRenderer.respondsTo("begin", function(context) {
            var settings = {
                'context'            : context,
                'points'             : [],
                'first'              : true,
                'pointshape'         : this.getOptionValue("pointshape"),
                'pointcolor'         : this.getOptionValue("pointcolor"),
                'pointopacity'       : this.getOptionValue("pointopacity"),
                'pointsize'          : this.getOptionValue("pointsize"),
                'pointoutlinewidth'  : this.getOptionValue("pointoutlinewidth"),
                'pointoutlinecolor'  : this.getOptionValue("pointoutlinecolor"),
                'linecolor'          : this.getOptionValue("linecolor"),
                'linewidth'          : this.getOptionValue("linewidth")
            };
            this.settings(settings);

            context.strokeStyle = settings.linecolor.getHexString('#');
            context.lineWidth = settings.linewidth;
            context.beginPath();
        });
        ns.PointlineRenderer.respondsTo("dataPoint", function(datap) {
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

        ns.PointlineRenderer.respondsTo("end", function() {
            var settings = this.settings(),
                context  = settings.context;
            if (settings.linewidth > 0) {
                context.stroke();
                context.closePath();
            }
            if (settings.pointsize > 0) {
                this.drawPoints();
            }
        });


        ns.PointlineRenderer.respondsTo("drawPoints", function(p) {
            var settings = this.settings(),
                context  = settings.context,
                points   = settings.points,
                i;

            if ((settings.pointshape == ns.PointlineRenderer.PLUS) || (settings.pointshape == ns.PointlineRenderer.X)) {
                context.strokeStyle = settings.pointcolor.getHexString('#');
                context.lineWidth = settings.pointoutlinewidth;
                context.beginPath();
            } else {
                //context.fillStyle = settings.pointcolor.getHexString("#");
                context.fillStyle = toRGBA(settings.pointcolor, settings.pointopacity);
                context.strokeStyle = settings.pointoutlinecolor.getHexString("#");
                context.lineWidth = settings.pointoutlinewidth;
            }

            for (i=0; i<points.length; ++i) {
                this.drawPoint(context, settings, points[i]);
            }

            if ((settings.pointshape == ns.PointlineRenderer.PLUS) || (settings.pointshape == ns.PointlineRenderer.X)) {
                context.stroke();
                context.closePath();
            }

        });

        ns.PointlineRenderer.respondsTo("drawPoint", function(context, settings, p) {

            var a,b,d;

            if (settings.pointshape == ns.PointlineRenderer.PLUS) {
                context.moveTo(p[0], p[1]-settings.pointsize);
                context.lineTo(p[0], p[1]+settings.pointsize);
                context.moveTo(p[0]-settings.pointsize, p[1]);
                context.lineTo(p[0]+settings.pointsize, p[1]);
                return;
            } else if (settings.pointshape == ns.PointlineRenderer.X) {
                d = 0.70710 * settings.pointsize;
                context.moveTo(p[0]-d, p[1]-d);
                context.lineTo(p[0]+d, p[1]+d);
                context.moveTo(p[0]-d, p[1]+d);
                context.lineTo(p[0]+d, p[1]-d);
                return;
            }

            context.beginPath();

            if (settings.pointshape == ns.PointlineRenderer.SQUARE) {
                context.moveTo(p[0] - settings.pointsize, p[1] - settings.pointsize);
                context.lineTo(p[0] + settings.pointsize, p[1] - settings.pointsize);
                context.lineTo(p[0] + settings.pointsize, p[1] + settings.pointsize);
                context.lineTo(p[0] - settings.pointsize, p[1] + settings.pointsize);
            } else if (settings.pointshape == ns.PointlineRenderer.TRIANGLE) {
                d = 1.5*settings.pointsize;
                a = 0.866025*d;
                b = 0.5*d;
                context.moveTo(p[0], p[1]+d);
                context.lineTo(p[0]+a, p[1]-b);
                context.lineTo(p[0]-a, p[1]-b);
            } else if (settings.pointshape == ns.PointlineRenderer.DIAMOND) {
                d = 1.5*settings.pointsize;
                context.moveTo(p[0]-settings.pointsize, p[1]);
                context.lineTo(p[0], p[1]+d);
                context.lineTo(p[0]+settings.pointsize, p[1]);
                context.lineTo(p[0], p[1]-d);
            } else if (settings.pointshape == ns.PointlineRenderer.STAR) {
                d = 1.5*settings.pointsize;
                context.moveTo(p[0]-d*0.0000, p[1]+d*1.0000);
                context.lineTo(p[0]+d*0.3536, p[1]+d*0.3536);
                context.lineTo(p[0]+d*0.9511, p[1]+d*0.3090);
                context.lineTo(p[0]+d*0.4455, p[1]-d*0.2270);
                context.lineTo(p[0]+d*0.5878, p[1]-d*0.8090);
                context.lineTo(p[0]-d*0.0782, p[1]-d*0.4938);
                context.lineTo(p[0]-d*0.5878, p[1]-d*0.8090);
                context.lineTo(p[0]-d*0.4938, p[1]-d*0.0782);
                context.lineTo(p[0]-d*0.9511, p[1]+d*0.3090);
                context.lineTo(p[0]-d*0.2270, p[1]+d*0.4455);
            } else { // ns.PointlineRenderer.CIRCLE
                context.arc(p[0], p[1], settings.pointsize, 0, 2*Math.PI, false);
            }

            context.closePath();
            context.fill();
            context.stroke();


        });

    });

});
