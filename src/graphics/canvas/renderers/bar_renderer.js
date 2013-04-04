window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var BarRenderer = ns.BarRenderer;

        // cached settings object, for quick access during rendering, populated in begin() method:
        BarRenderer.hasA("settings");

        BarRenderer.respondsTo("begin", function (context) {
            var settings = {
                "context"            : context,
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

        // This bar renderer uses a somewhat sophisticated technique when drawing
        // the outlines around the bars, in order to make sure that it only draws
        // one vertical line between two bars that share an edge.  If a complete
        // outline were drawn around each bar separately, the common edge between
        // adjacent bars would get drawn twice, once for each bar, possibly in
        // slightly different locations on the screen due to roundoff error,
        // thereby making some of the outline lines appear thicker than others.
        // 
        // In order to avoid this roundoff artifact, this render only draws the
        // bars (the filled region of the bar, that is) in its dataPoint() method,
        // and keeps a record of the bar locations and heights so that it can draw all
        // of the bar outlines at once, in its end() method.  The bar locations and
        // heights are stored in an array called _barGroups, which is an array of
        // "bar group" objects.  Each "bar group" corresponds to a sequence of adjacent
        // bars --- two bars are considered to be adjacent if the right edge of the left
        // bar is within _pixelEdgeTolerance pixels of the left edge of the right bar.
        // A "bar group" is represented by an array of points representing the pixel
        // coordinates of the upper left corners of all the bars in the group, followed by
        // the pixel coordinates of the upper right corner of the right-most bar in the group.
        // (The last, right-most, bar is the only one whose upper right corner is included
        // in the list).  So, for example, the following bar group
        // 
        //        *--*
        //        |  |--*
        //     *--*  |  |
        //     |  |  |  |
        //     |  |  |  |
        //   ---------------
        //     1  2  3  4
        // 
        // would be represented by the array
        //
        //    [ [1,2], [2,3], [3,3], [4,3] ]
        //
    
        BarRenderer.respondsTo("dataPoint", function (datap) {
            if (this.isMissing(datap)) {
                return;
            }

            var settings = this.settings(),
                context  = settings.context,
                p  = this.transformPoint(datap),
                x0 = p[0] + settings.baroffset,
                x1 = p[0] + settings.baroffset + settings.barpixelwidth;

            context.save();
            context.fillStyle = this.getOptionValue("fillcolor", datap[1]).getHexString("#");
            context.fillRect(x0, settings.barpixelbase, settings.barpixelwidth, p[1] - settings.barpixelbase);
            context.restore();

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
        
        BarRenderer.respondsTo("end", function () {
            var settings     = this.settings(),
                context      = settings.context,
                barpixelbase = settings.barpixelbase,
                max = Math.max,
                min = Math.min,
                p,
                barGroup,
                i, j, n;

            if (settings.prevCorner !== null && settings.currentBarGroup !== null) {
                settings.currentBarGroup.push( settings.prevCorner );
                settings.barGroups.push( settings.currentBarGroup );
            }        

            context.save();
            context.strokeStyle = settings.linecolor.getHexString("#");
            context.beginPath();
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
                context.moveTo(barGroup[1][0], barGroup[0][1]);
                context.lineTo(barGroup[0][0], barGroup[0][1]);
                //   vertical line @ x from y to base
                context.lineTo(barGroup[0][0], barpixelbase);
                //   horizontal line @ base from x to x(next)
                context.lineTo(barGroup[1][0], barpixelbase);
                
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
                    context.moveTo(barGroup[j][0], min(barGroup[j-1][1], barGroup[j][1], barpixelbase));
                    context.lineTo(barGroup[j][0], max(barGroup[j-1][1], barGroup[j][1], barpixelbase));
                    //   horizontal line @ y(next) from x to x(next)
                    context.moveTo(barGroup[j][0],   barGroup[j][1]);
                    context.lineTo(barGroup[j+1][0], barGroup[j][1]);
                    //   horizontal line @ base from x to x(next)
                    context.moveTo(barGroup[j][0],   barpixelbase);
                    context.lineTo(barGroup[j+1][0], barpixelbase);
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
                context.moveTo(barGroup[n-1][0], barGroup[n-1][1]);
                context.lineTo(barGroup[n-1][0], barpixelbase);
            }
            context.stroke();
            context.restore();
        });

        BarRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon) {
            var settings          = this.settings(),
                rendererFillColor = this.getOptionValue("fillcolor", 0).toRGBA(this.getOptionValue("fillopacity", 0));

            context.save();
            context.transform(1, 0, 0, 1, x, y);

            // Draw icon background (with opacity)
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.fillRect(0, 0, icon.width(), icon.height());

            context.lineWidth = 1;
            context.fillStyle = rendererFillColor;

            if (settings.barpixelwidth < settings.hidelines) {
                context.strokeStyle = rendererFillColor;
            } else {
                context.strokeStyle = this.getOptionValue("linecolor", 0).toRGBA();
            }

            // Adjust the width of the icons bars based upon the width and height of the icon Ranges: {20, 10, 0}
            var iconWidth = icon.width(),
                iconHeight = icon.height(),
                barwidth;
            if (iconWidth > 20 || iconHeight > 20) {
                barwidth = iconWidth / 6;
            } else if (iconWidth > 10 || iconHeight > 10) {
                barwidth = iconWidth / 4;
            } else {
                barwidth = iconWidth / 4;
            }

            // If the icon is large enough draw extra bars
            if (iconWidth > 20 && iconHeight > 20) {
                context.fillRect(   (iconWidth / 4) - (barwidth / 2),             0, barwidth, iconHeight / 2);
                context.strokeRect( (iconWidth / 4) - (barwidth / 2),             0, barwidth, iconHeight / 2);

                context.fillRect(   iconWidth - (iconWidth / 4) - (barwidth / 2), 0, barwidth, iconHeight / 3);
                context.strokeRect( iconWidth - (iconWidth / 4) - (barwidth / 2), 0, barwidth, iconHeight / 3);
            }

            context.fillRect(       (iconWidth / 2) - (barwidth / 2),             0, barwidth, iconHeight - (iconHeight / 4));
            context.strokeRect(     (iconWidth / 2) - (barwidth / 2),             0, barwidth, iconHeight - (iconHeight / 4));

            context.restore();
        });
    
    });

});
