window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        ns.PointlineRenderer.hasA("first");
        ns.PointlineRenderer.hasA("context");
        ns.PointlineRenderer.hasA("points");

        ns.PointlineRenderer.respondsTo("begin", function(context) {
            this.context(context);
            this.first(true);
            this.points([]);
            var color = this.getOptionValue("linecolor");
            var linewidth = this.getOptionValue("linewidth");
            context.strokeStyle = color.getHexString('#');
            context.lineWidth = linewidth;
            context.beginPath();
        });
        ns.PointlineRenderer.respondsTo("dataPoint", function(datap) {
            var context = this.context();
            if (this.isMissing(datap)) {
                context.stroke();
                context.closePath();
                this.first(true);
                context.beginPath();
                return;
            }
            var p = this.transformPoint(datap);
            if (this.first()) {
		context.moveTo(p[0], p[1]);
                this.first(false);
            } else {
		context.lineTo(p[0], p[1]);
            }
            this.points().push(p);
        });

        ns.PointlineRenderer.respondsTo("end", function() {
            var context = this.context();
            context.stroke();
            context.closePath();
            this.drawPoints();
        });


        ns.PointlineRenderer.respondsTo("drawPoints", function(p) {
            var context = this.context();
            var points = this.points(),
            i;

            var settings = {
                'pointshape' : this.getOptionValue("pointshape"),
                'pointcolor' : this.getOptionValue("pointcolor"),
                'pointsize'  : this.getOptionValue("pointsize"),
                'pointoutlinewidth'  : this.getOptionValue("pointoutlinewidth"),
                'pointoutlinecolor'  : this.getOptionValue("pointoutlinecolor")
            };

            if ((settings.pointshape == ns.PointlineRenderer.PLUS) || (settings.pointshape == ns.PointlineRenderer.X)) {
                context.strokeStyle = settings.pointcolor.getHexString('#');
                context.lineWidth = settings.pointoutlinewidth;
                context.beginPath();
            } else {
                context.fillStyle = settings.pointcolor.getHexString("#");
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

            if (settings.pointshape == ns.PointlineRenderer.PLUS) {
                context.moveTo(p[0], p[1]-settings.pointsize);
                context.lineTo(p[0], p[1]+settings.pointsize);
                context.moveTo(p[0]-settings.pointsize, p[1]);
                context.lineTo(p[0]+settings.pointsize, p[1]);
                return;
            } else if (settings.pointshape == ns.PointlineRenderer.X) {
                var d = 0.70710 * settings.pointsize;
                context.moveTo(p[0]-d, p[1]-d);
                context.lineTo(p[0]+d, p[1]+d);
                context.moveTo(p[0]-d, p[1]+d);
                context.lineTo(p[0]+d, p[1]-d);
                return;
            }

            context.beginPath();

            if (settings.pointshape == ns.PointlineRenderer.SQUARE) {
                context.fillRect(p[0] - settings.pointsize, p[1] - settings.pointsize, 2*settings.pointsize, 2*settings.pointsize);
            } else if (settings.pointshape == ns.PointlineRenderer.TRIANGLE) {
                console.log('at 1');
                var d = 1.5*settings.pointsize;
                var a = 0.866025*d;
                var b = 0.5*d;
                context.moveTo(p[0], p[1]+d);
                context.lineTo(p[0]+a, p[1]-b);
                context.lineTo(p[0]-a, p[1]-b);
            } else if (settings.pointshape == ns.PointlineRenderer.DIAMOND) {
                var d = 1.5*settings.pointsize;
                context.moveTo(p[0]-settings.pointsize, p[1]);
                context.lineTo(p[0], p[1]+d);
                context.lineTo(p[0]+settings.pointsize, p[1]);
                context.lineTo(p[0], p[1]-d);
            } else if (settings.pointshape == ns.PointlineRenderer.STAR) {
                var d = 1.5*settings.pointsize;
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

            context.stroke();
            context.closePath();
            context.fill();


        });

    });

});
