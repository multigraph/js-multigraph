window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.BarRenderer.hasA("settings");
        ns.BarRenderer.hasA("obj");

        ns.BarRenderer.respondsTo("begin", function (graphicsContext) {
            var that = this;
            var settings = {
                "barpixelwidth"      : this.getOptionValue("barwidth") * this.plot().horizontalaxis().axisToDataRatio(),
                "baroffset"          : this.getOptionValue("baroffset"),
                "barpixelbase"       : (this.getOptionValue("barbase") !== null)?this.plot().verticalaxis().dataValueToAxisValue(this.getOptionValue("barbase")):0,
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "linecolor"          : this.getOptionValue("linecolor"),
                "hidelines"          : this.getOptionValue("hidelines"),
                "barGroups"          : [],
                "currentBarGroup"    : null,
                "prevCorner"         : null,
                "pixelEdgeTolerance" : 1
            };

            this.obj({
                "type"      : "bar",
                "barwidth"  : settings.barpixelwidth,
                "baroffset" : settings.baroffset,
                "barbase"   : settings.barpixelbase,
                "fillcolor" : settings.fillcolor,
                "linecolor" : settings.linecolor,
                "hidelines" : settings.hidelines,
                "bars"      : [],
                "outlines"  : [],
            });

            this.obj().toString = function () {
                var output = "";
                var i;

                output += "setFillColor(" + that.obj().fillcolor.getHexString("#") + ");\r\n";
                output += "setLineColor(" + that.obj().linecolor.getHexString("#") + ");\r\n";
                for (i = 0; i < that.obj().bars.length; ++i) {
                    if (!that.obj().bars[i].isMissing) {
                        output += "drawRect(";
                        output += that.obj().bars[i].x;
                        output += ",";
                        output += that.obj().bars[i].y;
                        output += ",";
                        output += that.obj().bars[i].width;
                        output += ",";
                        output += that.obj().bars[i].height;
                        output += ");\r\n";
                    }
                }
                if (that.obj().barwidth > that.obj().hidelines) {
                    for (i = 0; i < that.obj().outlines.length; ++i) {
                        output += that.obj().outlines[i].command;
                        output += "(";
                        output += that.obj().outlines[i].x;
                        output += ",";                        
                        output += that.obj().outlines[i].y;
                        output += ");\r\n";
                    }
                }
                return output;

            }
            this.settings(settings);
        });

        ns.BarRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p,
                x0,
                x1;

            if (this.isMissing(datap)) {
                this.obj().bars.push({
                    "datap"     : datap,
                    "isMissing" : true
                });
                return;
            }
            p = this.transformPoint(datap);

            x0 = p[0] + settings.baroffset;
            x1 = p[0] + settings.baroffset + settings.barpixelwidth;
            
            this.obj().bars.push({
                "p0" : p[0],
                "p1" : p[1],
                "x" : x0,
                "y" : settings.barpixelbase,
                "width" : settings.barpixelwidth,
                "height" : p[1] - settings.barpixelbase,
                "datap" : datap,
                "isMissing" : false
            });
            
            if (settings.barpixelwidth > settings.hidelines) {
                if (settings.prevCorner === null) {
                    settings.currentBarGroup = [ [x0,p[1]] ];
                } else {
                    if (Math.abs(x0 - settings.prevCorner[0]) <= settings.pixelEdgeTolerance) {
                        settings.currentBarGroup.push( [x0,p[1]] );
                    } else {
                        settings.currentBarGroup.push( settings.prevCorner );
                        settings.barGroups.push( settings.currentBarGroup );
                        settings.currentBarGroup = [ [x0,p[1]] ];
                    }
                }
                settings.prevCorner = [x1,p[1]];
            }
        });

        ns.BarRenderer.respondsTo("end", function () {
            var settings = this.settings(),
                barGroup,
                i,
                j,
                n;

            if (settings.prevCorner !== null && settings.currentBarGroup !== null) {
                settings.currentBarGroup.push( settings.prevCorner );
                settings.barGroups.push( settings.currentBarGroup );
            }        

            for (i = 0; i < settings.barGroups.length; i++) {
                barGroup = settings.barGroups[i];
                n = barGroup.length;
                if (n < 2) { return; } // this should never happen
                
                // For the first point, draw 3 lines:
                //
                //       y |------
                //         |
                //         |
                //    base |------
                //         ^     ^
                //         x     x(next)
                //
                
                //   horizontal line @ y from x(next) to x
                this.obj().outlines.push({
                    "command" : "MoveTo",
                    "x"       : barGroup[1][0],
                    "y"       : barGroup[0][1]
                });
                this.obj().outlines.push({
                    "command" : "LineTo",
                    "x"       : barGroup[0][0],
                    "y"       : barGroup[0][1]
                });
                //   vertical line @ x from y to base
                this.obj().outlines.push({
                    "command" : "LineTo",
                    "x"       : barGroup[0][0],
                    "y"       : settings.barpixelbase
                });
                //   horizontal line @ base from x to x(next)
                this.obj().outlines.push({
                    "command" : "LineTo",
                    "x"       : barGroup[1][0],
                    "y"       : settings.barpixelbase
                });
                
                for (j = 1; j < n - 1; ++j) {
                    // For intermediate points, draw 3 lines:
                    //
                    //       y |
                    //         |
                    //         |
                    //         |------ y(next)
                    //         |
                    //         |
                    //         |------ base
                    //         ^     ^
                    //         x     x(next)
                    //
                    //   vertical line @ x from min to max of (y, y(next), base)
                    this.obj().outlines.push({
                        "command" : "MoveTo",
                        "x"       : barGroup[j][0],
                        "y"       : Math.min(barGroup[j-1][1], barGroup[j][1], settings.barpixelbase)
                    });
                    this.obj().outlines.push({
                        "command" : "LineTo",
                        "x"       : barGroup[j][0],
                        "y"       : Math.max(barGroup[j-1][1], barGroup[j][1], settings.barpixelbase)
                    });
                    //   horizontal line @ y(next) from x to x(next)
                    this.obj().outlines.push({
                        "command" : "MoveTo",
                        "x"       : barGroup[j][0],
                        "y"       : barGroup[j][1]
                    });
                    this.obj().outlines.push({
                        "command" : "LineTo",
                        "x"       : barGroup[j+1][0],
                        "y"       : barGroup[j][1]
                    });
                    //   horizontal line @ base from x to x(next)
                    this.obj().outlines.push({
                        "command" : "MoveTo",
                        "x"       : barGroup[j][0],
                        "y"       : settings.barpixelbase
                    });
                    this.obj().outlines.push({
                        "command" : "LineTo",
                        "x"       : barGroup[j+1][0],
                        "y"       : settings.barpixelbase
                    });
                }
                // For last point, draw one line:
                //
                //       y |
                //         |
                //         |
                //    base |
                //         ^     ^
                //         x     x(next)
                //
                //   vertical line @ x from base to y
                this.obj().outlines.push({
                    "command" : "MoveTo",
                    "x"       : barGroup[n-1][0],
                    "y"       : barGroup[n-1][1]
                });
                this.obj().outlines.push({
                    "command" : "LineTo",
                    "x"       : barGroup[n-1][0],
                    "y"       : settings.barpixelbase
                });
            }

            return this.obj();

        });

    });

});
