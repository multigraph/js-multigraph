window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.PointlineRenderer.hasA("settings");
        ns.PointlineRenderer.hasA("obj");

        ns.PointlineRenderer.respondsTo("begin", function (graphicsContext) {
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

            this.obj({
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

            this.obj().toString = function () {
                var output = "",
                    i,
                    j;

                if (that.obj().linewidth > 0) {
                    output += "setLineColor(" + that.obj().linecolor.getHexString("#") + ");\r\n";
                    output += "setLineWidth(" + that.obj().linewidth + ");\r\n";
                    for (i = 0; i < that.obj().line.length; ++i) {
                        if (that.obj().line[i].isMissing !== true) {
                            output += that.obj().line[i].command;
                            output += "(";
                            output += that.obj().line[i].x;
                            output += ",";                        
                            output += that.obj().line[i].y;
                            output += ");\r\n";
                        }
                    }
                }

                if (that.obj().pointsize > 0) {
                    output += "setLineColor(" + that.obj().pointoutlinecolor.getHexString("#") + ");\r\n";
                    output += "setLineWidth(" + that.obj().pointoutlinewidth + ");\r\n";
                    output += "setFillColor(" + that.obj().pointcolor.getHexString("#") + ");\r\n";
                    for (i = 0; i < that.obj().points.length; ++i) {
                        if (that.obj().points[i].isMissing !== true) {
                            output += that.obj().points[i].type;
                            output += "(";
                            output += that.obj().points[i].x;
                            output += ",";
                            output += that.obj().points[i].y;
                            output += ",";
                            output += that.obj().points[i].radius;
                            output += ");\r\n";
                            output += "fillArea();\r\n";
                        }
                    }
                }

                return output;

            };

            this.settings(settings);
        });

        ns.PointlineRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                if (settings.linewidth > 0) {
                    this.obj().line.push({
                        "datap"     : datap,
                        "isMissing" : true
                    });
                }
                if (settings.pointsize > 0) {
                    this.obj().points.push({
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
                    this.obj().line.push({
                        "command" : "moveTo",
                        "x"       : p[0],
                        "y"       : p[1]
                    });
                    settings.first = false;
                } else {
                    this.obj().line.push({
                        "command" : "lineTo",
                        "x"       : p[0],
                        "y"       : p[1]
                    });
                }
            }
            if (settings.pointsize > 0) {
                this.obj().points.push({
                    "type"   : settings.pointshape.toString(),
                    "x"      : p[0],
                    "y"      : p[1],
                    "radius" : settings.pointsize
                });
            }
        });

        ns.PointlineRenderer.respondsTo("end", function () {
            return this.obj;
        });

    });

});
