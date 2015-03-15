var _INCLUDED = false;
module.exports = function() {
    var PointlineRenderer = require('../../../core/renderers/pointline_renderer.js'),
        Renderer = require('../../../core/renderer.js');

    if (_INCLUDED) { return PointlineRenderer; }
    _INCLUDED = true;

    // cached settings object, for quick access during rendering, populated in begin() method:
    PointlineRenderer.hasA("settings");

    PointlineRenderer.respondsTo("begin", function (context) {
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
        if (this.type() === Renderer.LINE) {
            settings.pointsize = 0;
        }
        // turns off lines for point renderers
        if (this.type() === Renderer.POINT) {
            settings.linewidth = 0;
        }
        this.settings(settings);

        if (settings.linewidth > 0) {
            context.save();
            context.beginPath();
            context.lineWidth = settings.linewidth;
            context.strokeStyle = settings.linecolor.getHexString("#");
        }

        if (this.filter()) {
            this.filter().reset();
        }
    });
    PointlineRenderer.respondsTo("dataPoint", function (datap) {
        var settings = this.settings(),
            context  = settings.context,
            p;
        if (this.isMissing(datap)) {
            settings.first = true;
            return;
        }
        p = this.transformPoint(datap);
        if (this.filter()) {
            if (this.filter().filter(datap, p)) {
                return;
            }
        }
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

    PointlineRenderer.respondsTo("end", function () {
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


    PointlineRenderer.respondsTo("drawPoints", function (p) {
        var settings   = this.settings(),
            context    = settings.context,
            points     = settings.points,
            pointshape = settings.pointshape,
            i;

        context.save();
        context.beginPath();
        if ((pointshape === PointlineRenderer.PLUS) || (pointshape === PointlineRenderer.X)) {
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

        if (!((pointshape === PointlineRenderer.PLUS) || (pointshape === PointlineRenderer.X))) {
            context.fill();
        }
        context.stroke();
        context.restore();
    });

    PointlineRenderer.respondsTo("drawPoint", function (context, settings, p) {
        var pointsize = settings.pointsize,
            p0 = p[0],
            p1 = p[1],
            a,b,d;

        switch (settings.pointshape) {
        case PointlineRenderer.PLUS:
            context.moveTo(p0,             p1 - pointsize);
            context.lineTo(p0,             p1 + pointsize);
            context.moveTo(p0 - pointsize, p1);
            context.lineTo(p0 + pointsize, p1);
            return;
        case PointlineRenderer.X:
            d = 0.70710 * pointsize;
            context.moveTo(p0-d, p1-d);
            context.lineTo(p0+d, p1+d);
            context.moveTo(p0-d, p1+d);
            context.lineTo(p0+d, p1-d);
            return;
        case PointlineRenderer.SQUARE:
            context.moveTo(p0 - pointsize, p1 - pointsize);
            context.lineTo(p0 + pointsize, p1 - pointsize);
            context.lineTo(p0 + pointsize, p1 + pointsize);
            context.lineTo(p0 - pointsize, p1 + pointsize);
            return;
        case PointlineRenderer.TRIANGLE:
            d = 1.5 * pointsize;
            a = 0.866025 * d;
            b = 0.5 * d;
            context.moveTo(p0,     p1 + d);
            context.lineTo(p0 + a, p1 - b);
            context.lineTo(p0 - a, p1 - b);
            return;
        case PointlineRenderer.DIAMOND:
            d = 1.5 * pointsize;
            context.moveTo(p0 - pointsize, p1);
            context.lineTo(p0,             p1 + d);
            context.lineTo(p0 + pointsize, p1);
            context.lineTo(p0,             p1 - d);
            return;
        case PointlineRenderer.STAR:
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
        case PointlineRenderer.CIRCLE:
            context.moveTo(p0 + pointsize, p1);
            context.arc(p0, p1, pointsize, 0, 2*Math.PI, false);
            return;
        }
    });

    PointlineRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon) {
        var settings   = this.settings(),
            pointshape = settings.pointshape,
            iconWidth  = icon.width(),
            iconHeight = icon.height();

        context.save();
        // Draw icon background (with opacity)
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fillRect(x, y, iconWidth, iconHeight);

        if (settings.linewidth > 0) {
            context.strokeStyle = settings.linecolor.toRGBA();
            context.lineWidth   = settings.linewidth;
            context.beginPath();
            context.moveTo(x, y + iconHeight/2);
            context.lineTo(x + iconWidth, y + iconHeight/2);
            context.stroke();
        }
        if (settings.pointsize > 0) {
            context.beginPath();
            if ((pointshape === PointlineRenderer.PLUS) || (pointshape === PointlineRenderer.X)) {
                context.strokeStyle = settings.pointcolor.toRGBA();
                context.lineWidth   = settings.pointoutlinewidth;
            } else {
                context.fillStyle   = settings.pointcolor.toRGBA(settings.pointopacity);
                context.strokeStyle = settings.pointoutlinecolor.toRGBA();
                context.lineWidth   = settings.pointoutlinewidth;
            }

            this.drawPoint(context, settings, [(x + iconWidth/2), (y + iconHeight/2)]);

            if (!((pointshape === PointlineRenderer.PLUS) || (pointshape === PointlineRenderer.X))) {
                context.fill();
            }
            context.stroke();
        }
        context.restore();
    });

    return PointlineRenderer;
};
