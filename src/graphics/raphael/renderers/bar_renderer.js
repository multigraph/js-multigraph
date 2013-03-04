window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var BarRenderer = ns.BarRenderer;

        BarRenderer.hasMany("barElems");
        BarRenderer.hasAn("outlineElem");
        BarRenderer.hasAn("iconGraphicElem");

        // cached settings object, for quick access during rendering, populated in begin() method:
        BarRenderer.hasA("settings");

        BarRenderer.respondsTo("begin", function (graphicsContext) {
            var settings = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "paths"              : {},
                "barwidth"           : this.getOptionValue("barwidth"),
                "baroffset"          : this.getOptionValue("baroffset"),
                "barbase"            : this.getOptionValue("barbase"),
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "linecolor"          : this.getOptionValue("linecolor"),
                "hidelines"          : this.getOptionValue("hidelines"),
                "barGroups"          : [],
                "currentBarGroup"    : null,
                "prevCorner"         : null,
                "pixelEdgeTolerance" : 1
            };
            settings.barpixelwidth = settings.barwidth.getRealValue() * this.plot().horizontalaxis().axisToDataRatio();
            settings.barpixelbase  = (settings.barbase !== null) ? this.plot().verticalaxis().dataValueToAxisValue(settings.barbase) : 0;

            var i;
            for (i = 0; i < this.options().fillcolor().size(); i++) {
                settings.paths[this.options().fillcolor().at(i).value().getHexString("0x")] = {
                    fillcolor : this.options().fillcolor().at(i).value(),
                    path      : ""
                };
            }
            for (i = 0; i < this.barElems().size(); i++) {
                this.barElems().pop();
            }

            this.settings(settings);
        });

        BarRenderer.respondsTo("beginRedraw", function () {
            var settings = this.settings();
            settings.barpixelwidth   = settings.barwidth.getRealValue() * this.plot().horizontalaxis().axisToDataRatio();
            settings.barpixelbase    = (settings.barbase !== null) ? this.plot().verticalaxis().dataValueToAxisValue(settings.barbase) : 0;
            settings.barGroups       = [];
            settings.currentBarGroup = null;
            settings.prevCorner      = null;

            var i;
            for (i = 0; i < this.options().fillcolor().size(); i++) {
                settings.paths[this.options().fillcolor().at(i).value().getHexString("0x")] = {
                    fillcolor : this.options().fillcolor().at(i).value(),
                    path      : ""
                };
            }
        });

        BarRenderer.respondsTo("dataPoint", function (datap) {
            if (this.isMissing(datap)) {
                return;
            }

            var settings = this.settings(),
                p = this.transformPoint(datap),
                x0 = p[0] + settings.baroffset,
                x1 = p[0] + settings.baroffset + settings.barpixelwidth,
                fillcolor = this.getOptionValue("fillcolor", datap[1]);

            settings.paths[fillcolor.getHexString("0x")].path = settings.paths[fillcolor.getHexString("0x")].path +
                generateBar(x0, settings.barpixelbase, settings.barpixelwidth, p[1] - settings.barpixelbase);

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

        var computeBarOutline = function (settings) {
            var outlinePath = "",
                barpixelbase = settings.barpixelbase,
                barGroup,
                i, j, n;

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
                outlinePath = outlinePath + "M" + barGroup[1][0] + "," + barGroup[0][1] +
                    "L" + barGroup[0][0] + "," + barGroup[0][1] +
                    //   vertical line @ x from y to base
                    "L" + barGroup[0][0] + "," + barpixelbase +
                    //   horizontal line @ base from x to x(next)
                    "L" + barGroup[1][0] + "," + barpixelbase;
                
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
                    outlinePath = outlinePath + "M" + barGroup[j][0] + "," + Math.min(barGroup[j-1][1], barGroup[j][1], barpixelbase) +
                        "L" + barGroup[j][0] + "," + Math.max(barGroup[j-1][1], barGroup[j][1], barpixelbase) +
                        //   horizontal line @ y(next) from x to x(next)
                        "M" + barGroup[j][0] + "," +   barGroup[j][1] +
                        "L" + barGroup[j+1][0] + "," + barGroup[j][1] +
                        //   horizontal line @ base from x to x(next)
                        "M" + barGroup[j][0] + "," +   barpixelbase +
                        "L" + barGroup[j+1][0] + "," + barpixelbase;
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
                outlinePath = outlinePath + "M" + barGroup[n-1][0] + "," + barGroup[n-1][1] +
                    "L" + barGroup[n-1][0] + "," + barpixelbase;
            }
            return outlinePath;
        };

        BarRenderer.respondsTo("end", function () {
            var settings = this.settings(),
                paper    = settings.paper,
                set      = settings.set,
                barElem, outlineElem;

            if (settings.prevCorner !== null && settings.currentBarGroup !== null) {
                settings.currentBarGroup.push( settings.prevCorner );
                settings.barGroups.push( settings.currentBarGroup );
            }        

            var key;
            for (key in settings.paths) {
                if (settings.paths.hasOwnProperty(key)) {
                    barElem = paper.path(settings.paths[key].path)
                        .attr({
                            "fill"   : settings.paths[key].fillcolor.getHexString("#"),
                            "stroke" : "none"
                        });
                    this.barElems().add(barElem);
                    set.push(barElem);
                }
            }

            outlineElem = paper.path(computeBarOutline(settings))
                .attr({
                    "stroke-width" : 1,
                    "stroke"       : settings.linecolor.getHexString("#")
                });
            this.outlineElem(outlineElem);
            set.push(outlineElem);
        });

        BarRenderer.respondsTo("endRedraw", function () {
            var settings = this.settings(),
                barElem, outlineElem;

            if (settings.prevCorner !== null && settings.currentBarGroup !== null) {
                settings.currentBarGroup.push( settings.prevCorner );
                settings.barGroups.push( settings.currentBarGroup );
            }        

            var key,
                i = 0;
            for (key in settings.paths) {
                if (settings.paths.hasOwnProperty(key)) {
                    this.barElems().at(i).attr("path", settings.paths[key].path);
                    i++;
                }
            }

            this.outlineElem().attr("path", computeBarOutline(settings));
        });

        var generateBar = function (x, y, width, height) {
            return "M" + x + "," + y +
                "L" + x + "," + (y + height) +
                "L" + (x + width) + "," + (y + height) +
                "L" + (x + width) + "," + y +
                "Z";
        };

        BarRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon) {
            var settings = this.settings(),
                paper = graphicsContext.paper,
                set   = graphicsContext.set,
                rendererFillColor = this.getOptionValue("fillcolor", 0),
                rendererOpacity   = this.getOptionValue("fillopacity", 0),
                iconWidth  = icon.width(),
                iconHeight = icon.height(),
                path = "",
                barAttrs,
                barwidth;

            // Draw icon background (with opacity)
            set.push(
                paper.rect(x, y, iconWidth, iconHeight)
                    .attr({                    
                        "stroke" : "rgba(255, 255, 255, 1)",
                        "fill"   : "rgba(255, 255, 255, 1)"
                    })
            );

            barAttrs = {
                "stroke-width" : 1,
                "fill"         : rendererFillColor.toRGBA(rendererOpacity)
            };

            if (settings.barpixelwidth < settings.hidelines) {
                barAttrs.stroke = "none";
            } else {
                barAttrs.stroke = this.getOptionValue("linecolor", 0).toRGBA(rendererOpacity);
            }

            // Adjust the width of the icons bars based upon the width and height of the icon Ranges: {20, 10, 0}
            if (iconWidth > 20 || iconHeight > 20) {
                barwidth = iconWidth / 6;
            } else if (iconWidth > 10 || iconHeight > 10) {
                //TODO: determine if this conditional is neccesary, the next two cases have the same result
                barwidth = iconWidth / 4;
            } else {
                barwidth = iconWidth / 4;
            }

            // If the icon is large enough draw extra bars
            if (iconWidth > 20 && iconHeight > 20) {
                path = path + 
                    generateBar(x + (iconWidth / 4) - (barwidth / 2),             y, barwidth, iconHeight / 2) +
                    generateBar(x + iconWidth - (iconWidth / 4) - (barwidth / 2), y, barwidth, iconHeight / 3);
            }
            path = path + generateBar(x + (iconWidth / 2) - (barwidth / 2), y, barwidth, iconHeight - (iconHeight / 4));

            var iconGraphicElem = paper.path(path)
                .attr(barAttrs);
            this.iconGraphicElem(iconGraphicElem);
            set.push(iconGraphicElem);
        });

        BarRenderer.respondsTo("redrawLegendIcon", function () {
            var settings = this.settings(),
                stroke;

            if (settings.barpixelwidth < settings.hidelines) {
                stroke = "none";
            } else {
                stroke = this.getOptionValue("linecolor", 0).toRGBA(this.getOptionValue("fillopacity", 0));
            }

            this.iconGraphicElem().attr("stroke", stroke);
        });

    });

});
