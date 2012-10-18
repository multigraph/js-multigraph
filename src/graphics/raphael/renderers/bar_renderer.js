window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.BarRenderer.hasA("settings");

        ns.BarRenderer.respondsTo("begin", function (graphicsContext) {
            var settings = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "paths"              : [],
                "barpixelwidth"      : this.getOptionValue("barwidth").getRealValue() * this.plot().horizontalaxis().axisToDataRatio(),
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

            this.settings(settings);
        });

        ns.BarRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p,
                x0,
                x1,
                fillcolor = this.getOptionValue("fillcolor", datap[1]),
                flag = false,
                i;

            if (this.isMissing(datap)) {
                return;
            }

            p = this.transformPoint(datap);

            x0 = p[0] + settings.baroffset;
            x1 = p[0] + settings.baroffset + settings.barpixelwidth;
            
            for (i = 0; i < settings.paths.length; i++) {
                if (settings.paths[i].fillcolor === fillcolor) {
                    settings.paths[i].path += this.generateBar(x0, settings.barpixelbase, settings.barpixelwidth, p[1] - settings.barpixelbase);
                    flag = true;
                    break;
                }
            }

            if (flag === false) {
                i = settings.paths.length;
                settings.paths[i] = {};
                settings.paths[i].fillcolor = fillcolor;
                settings.paths[i].path = this.generateBar(x0, settings.barpixelbase, settings.barpixelwidth, p[1] - settings.barpixelbase);
            }

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
                p,
                outlinePath = "",
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
                outlinePath += "M" + barGroup[1][0] + "," + barGroup[0][1];
                outlinePath += "L" + barGroup[0][0] + "," + barGroup[0][1];
                //   vertical line @ x from y to base
                outlinePath += "L" + barGroup[0][0] + "," + settings.barpixelbase;
                //   horizontal line @ base from x to x(next)
                outlinePath += "L" + barGroup[1][0] + "," + settings.barpixelbase;
                
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
                    outlinePath += "M" + barGroup[j][0] + "," + Math.min(barGroup[j-1][1], barGroup[j][1], settings.barpixelbase);
                    outlinePath += "L" + barGroup[j][0] + "," + Math.max(barGroup[j-1][1], barGroup[j][1], settings.barpixelbase);
                    //   horizontal line @ y(next) from x to x(next)
                    outlinePath += "M" + barGroup[j][0] + "," +   barGroup[j][1];
                    outlinePath += "L" + barGroup[j+1][0] + "," + barGroup[j][1];
                    //   horizontal line @ base from x to x(next)
                    outlinePath += "M" + barGroup[j][0] + "," +   settings.barpixelbase;
                    outlinePath += "L" + barGroup[j+1][0] + "," + settings.barpixelbase;
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
                outlinePath += "M" + barGroup[n-1][0] + "," + barGroup[n-1][1];
                outlinePath += "L" + barGroup[n-1][0] + "," + settings.barpixelbase;
            }


            for (i = 0; i < settings.paths.length; i++) {
                settings.set.push( settings.paper.path(settings.paths[i].path)
                                   .attr({
                                       "stroke-width": 1,
                                       "fill": settings.paths[i].fillcolor.getHexString("#"),
                                       "stroke": settings.fillcolor.getHexString("#")
                                   })
                                 );
            }

            settings.set.push( settings.paper.path(outlinePath)
                               .attr({
                                   "stroke-width": 1,
                                   "stroke": settings.linecolor.getHexString("#")
                               })
                             );


        });


        ns.BarRenderer.respondsTo("generateBar", function (x, y, width, height) {
            var path = "M" + x + "," + y;
            path    += "L" + x + "," + (y + height); 
            path    += "L" + (x + width) + "," + (y + height); 
            path    += "L" + (x + width) + "," + y; 
            path    += "Z";
            return path; 
        });

        ns.BarRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon, opacity) {
            var settings          = this.settings(),
                rendererFillColor = this.getOptionValue("fillcolor", 0),
                rendererOpacity   = this.getOptionValue("fillopacity", 0),
                iconAttrs,
                barwidth;

            // Draw icon background (with opacity)
            graphicsContext.set.push(
                graphicsContext.paper.rect(x, y, icon.width(), icon.height())
                    .attr({                    
                        "stroke" : "rgba(255, 255, 255, " + opacity + ")",
                        "fill"   : "rgba(255, 255, 255, " + opacity + ")"
                    })
            );

            iconAttrs = {
                "stroke-width" : 1,
                "fill"         : rendererFillColor.toRGBA(opacity * rendererOpacity)
            };

            if (settings.barpixelwidth < settings.hidelines) {
                iconAttrs.stroke = rendererFillColor.toRGBA(opacity * rendererOpacity);
            } else {
                iconAttrs.stroke = this.getOptionValue("linecolor", 0).toRGBA(opacity);
            }

            // Adjust the width of the icons bars based upon the width and height of the icon Ranges: {20, 10, 0}
            if (icon.width() > 20 || icon.height() > 20) {
                barwidth = icon.width() / 6;
            } else if (icon.width() > 10 || icon.height() > 10) {
                barwidth = icon.width() / 4;
            } else {
                barwidth = icon.width() / 4;
            }

            // If the icon is large enough draw extra bars
            if (icon.width() > 20 && icon.height() > 20) {
                graphicsContext.set.push(
                    graphicsContext.paper.rect((icon.width() / 4) - (barwidth / 2), 0, barwidth, icon.height() / 2)
                        .attr(iconAttrs)
                        .transform("t" + x + "," + y),

                    graphicsContext.paper.rect(icon.width() - (icon.width() / 4) - (barwidth / 2), 0, barwidth, icon.height() / 3)
                        .attr(iconAttrs)
                        .transform("t" + x + "," + y)
                );
            }

            graphicsContext.set.push(
                graphicsContext.paper.rect((icon.width() / 2) - (barwidth / 2), 0, barwidth, icon.height() - (icon.height() / 4))
                    .attr(iconAttrs)
                    .transform("t" + x + "," + y)
            );

        });

    });

});
