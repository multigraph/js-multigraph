window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var FillRenderer = ns.FillRenderer;

        // cached settings object, for quick access during rendering, populated in begin() method:
        FillRenderer.hasA("settings");
        FillRenderer.hasA("logger");

        FillRenderer.respondsTo("dumpLog", function () {
            var logger = this.logger(),
                output = "",
                i,
                j;

            output += "setFillColor(" + logger.fillcolor.getHexString("#") + ");\n";
            output += "setLineColor(" + logger.fillcolor.getHexString("#") + ");\n";

            for (i = 0; i < logger.fill.length; ++i) {
                if (!logger.fill[i].isMissing) {
                    for (j = 0; j < logger.fill[i].length; j++) {
                        output += logger.fill[i][j].command;
                        output += "(";
                        output += logger.fill[i][j].x;
                        output += ",";                        
                        output += logger.fill[i][j].y;
                        output += ");\n";
                    }
                    output += "fillArea();\n";
                }
            }

            if (logger.linewidth > 0) {
                output += "setLineColor(" + logger.linecolor.getHexString("#") + ");\n";
                for (i = 0; i < logger.line.length; ++i) {
                    for (j = 0; j < logger.line[i].length; j++) {
                        output += logger.line[i][j].command;
                        output += "(";
                        output += logger.line[i][j].x;
                        output += ",";                        
                        output += logger.line[i][j].y;
                        output += ");\n";
                    }
                }
            }
            return output;

        });

        FillRenderer.respondsTo("begin", function (graphicsContext) {
            var that = this;
            var settings = {
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

            this.logger({
                "type"        : "fill",
                "linecolor"   : settings.linecolor,
                "linewidth"   : settings.linewidth,
                "fillcolor"   : settings.fillcolor,
                "fillopacity" : settings.fillopacity,
                "fillbase"    : settings.fillbase,
                "line"        : [],
                "fill"        : []
            });

            this.settings(settings);
        });

        FillRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                this.logger().line.push({
                    "datap"     : datap,
                    "isMissing" : true
                });
                this.logger().fill.push({
                    "datap"     : datap,
                    "isMissing" : true
                });
                settings.first = true;
                settings.previouspoint = null;
                return;
            }

            p = this.transformPoint(datap);
            if (settings.first === true) {
                settings.first = false;
                settings.previouspoint = p;
                return;
            } else {
                this.logger().fill.push([
                    {
                        "command" : "moveTo",
                        "x"       : settings.previouspoint[0],
                        "y"       : settings.previouspoint[1]
                    },
                    {
                        "command" : "lineTo",
                        "x"       : p[0],
                        "y"       : p[1]
                    },
                    {
                        "command" : "lineTo",
                        "x"       : p[0],
                        "y"       : settings.fillbase
                    },
                    {
                        "command" : "lineTo",
                        "x"       : settings.previouspoint[0],
                        "y"       : settings.fillbase
                    }
                ]);

                if (settings.linewidth > 0) {
                    this.logger().line.push([
                        {
                            "command" : "moveTo",
                            "x"       : settings.previouspoint[0],
                            "y"       : settings.previouspoint[1]
                        },
                        {
                            "command" : "lineTo",
                            "x"       : p[0],
                            "y"       : p[1]
                        }
                    ]);
                } else {
                    this.logger().line.push({
                        "message" : "line is not being rendered due to linewidth",
                        "x"       : p[0],
                        "y"       : p[1]
                    });
                }

            }

            settings.previouspoint = p;
            return;
        });

        FillRenderer.respondsTo("end", function () {
            //no-op
        });

    });

});
