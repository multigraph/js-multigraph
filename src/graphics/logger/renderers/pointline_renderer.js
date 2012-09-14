window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var PointlineRenderer = ns.PointlineRenderer;

        // cached settings object, for quick access during rendering, populated in begin() method:
        PointlineRenderer.hasA("settings");
        PointlineRenderer.hasA("logger");

        PointlineRenderer.respondsTo("dumpLog", function () {
            var logger = this.logger(),
                output = "",
                i,
                j;

            if (logger.linewidth > 0) {
                output += "setLineColor(" + logger.linecolor.getHexString("#") + ");\n";
                output += "setLineWidth(" + logger.linewidth + ");\n";
                for (i = 0; i < logger.line.length; ++i) {
                    if (logger.line[i].isMissing !== true) {
                        output += logger.line[i].command;
                        output += "(";
                        output += logger.line[i].x;
                        output += ",";                        
                        output += logger.line[i].y;
                        output += ");\n";
                    }
                }
            }

            if (logger.pointsize > 0) {
                output += "setLineColor(" + logger.pointoutlinecolor.getHexString("#") + ");\n";
                output += "setLineWidth(" + logger.pointoutlinewidth + ");\n";
                output += "setFillColor(" + logger.pointcolor.getHexString("#") + ");\n";
                for (i = 0; i < logger.points.length; ++i) {
                    if (logger.points[i].isMissing !== true) {
                        output += logger.points[i].type;
                        output += "(";
                        output += logger.points[i].x;
                        output += ",";
                        output += logger.points[i].y;
                        output += ",";
                        output += logger.points[i].radius;
                        output += ");\n";
                        output += "fillArea();\n";
                    }
                }
            }

            return output;

        });

        PointlineRenderer.respondsTo("begin", function (graphicsContext) {
            var that = this;
            var settings = {
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

            this.logger({
                "pointshape"        : settings.pointshape,       
                "pointcolor"        : settings.pointcolor,       
                "pointopacity"      : settings.pointopacity,     
                "pointsize"         : settings.pointsize,        
                "pointoutlinewidth" : settings.pointoutlinewidth,
                "pointoutlinecolor" : settings.pointoutlinecolor,
                "linecolor"         : settings.linecolor,        
                "linewidth"         : settings.linewidth,        
                "line"              : [],
                "points"            : []
            });

            this.settings(settings);
        });

        PointlineRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                if (settings.linewidth > 0) {
                    this.logger().line.push({
                        "datap"     : datap,
                        "isMissing" : true
                    });
                }
                if (settings.pointsize > 0) {
                    this.logger().points.push({
                        "datap"     : datap,
                        "isMissing" : true
                    });
                }
                settings.first = true;
                return;
            }
            p = this.transformPoint(datap);
            if (settings.linewidth > 0) {
                if (settings.first) {
                    this.logger().line.push({
                        "command" : "moveTo",
                        "x"       : p[0],
                        "y"       : p[1]
                    });
                    settings.first = false;
                } else {
                    this.logger().line.push({
                        "command" : "lineTo",
                        "x"       : p[0],
                        "y"       : p[1]
                    });
                }
            }
            if (settings.pointsize > 0) {
                this.logger().points.push({
                    "type"   : settings.pointshape.toString(),
                    "x"      : p[0],
                    "y"      : p[1],
                    "radius" : settings.pointsize
                });
            }
        });

        PointlineRenderer.respondsTo("end", function () {
            //no-op
        });

    });

});
