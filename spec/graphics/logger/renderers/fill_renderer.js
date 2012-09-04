window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.FillRenderer.hasA("settings");
        ns.FillRenderer.hasA("obj");

        ns.FillRenderer.respondsTo("begin", function (graphicsContext) {
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

            this.obj({
                "type"        : "fill",
                "linecolor"   : settings.linecolor,
                "linewidth"   : settings.linewidth,
                "fillcolor"   : settings.fillcolor,
                "fillopacity" : settings.fillopacity,
                "fillbase"    : settings.fillbase,
                "line"        : [],
                "fill"        : []
            });

            this.obj().toString = function () {
                var output = "",
                    i,
                    j;

                output += "setFillColor(" + that.obj().fillcolor.getHexString("#") + ");\r\n";
                output += "setLineColor(" + that.obj().fillcolor.getHexString("#") + ");\r\n";

                for (i = 0; i < that.obj().fill.length; ++i) {
                    if (!that.obj().fill[i].isMissing) {
                        for (j = 0; j < that.obj().fill[i].length; j++) {
                            output += that.obj().fill[i][j].command;
                            output += "(";
                            output += that.obj().fill[i][j].x;
                            output += ",";                        
                            output += that.obj().fill[i][j].y;
                            output += ");\r\n";
                        }
                        output += "fillArea();\r\n";
                    }
                }

                if (that.obj().linewidth > 0) {
                    output += "setLineColor(" + that.obj().linecolor.getHexString("#") + ");\r\n";
                    for (i = 0; i < that.obj().line.length; ++i) {
                        for (j = 0; j < that.obj().line[i].length; j++) {
                            output += that.obj().line[i][j].command;
                            output += "(";
                            output += that.obj().line[i][j].x;
                            output += ",";                        
                            output += that.obj().line[i][j].y;
                            output += ");\r\n";
                        }
                    }
                }
                return output;

            };

            this.settings(settings);
        });

        ns.FillRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                this.obj().line.push({
                    "datap"     : datap,
                    "isMissing" : true
                });
                this.obj().fill.push({
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
                this.obj().fill.push([
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
                    this.obj().line.push([
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
                    this.obj().line.push({
                        "message" : "line is not being rendered due to linewidth",
                        "x"       : p[0],
                        "y"       : p[1]
                    });
                }

            }

            settings.previouspoint = p;
            return;
        });

        ns.FillRenderer.respondsTo("end", function () {
            return this.obj();
        });

    });

});
