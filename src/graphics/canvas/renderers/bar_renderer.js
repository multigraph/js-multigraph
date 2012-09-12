window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.BarRenderer.hasA("settings");

        ns.BarRenderer.respondsTo("begin", function (context) {
            var settings = {
                "context"            : context,
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

            this.settings(settings);

            context.fillStyle = settings.fillcolor.getHexString("#");
            context.strokeStyle = settings.linecolor.getHexString("#");
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
    
        ns.BarRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                context = settings.context,
                p,
                x0,
                x1;

            if (this.isMissing(datap)) {
                return;
            }

            p = this.transformPoint(datap);

            x0 = p[0] + settings.baroffset;
            x1 = p[0] + settings.baroffset + settings.barpixelwidth;
            
            context.fillRect(x0, settings.barpixelbase, settings.barpixelwidth, p[1] - settings.barpixelbase);

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
                context = settings.context,
                p,
                barGroup,
                i,
                j,
                n;

            if (settings.prevCorner !== null && settings.currentBarGroup !== null) {
                settings.currentBarGroup.push( settings.prevCorner );
                settings.barGroups.push( settings.currentBarGroup );
            }        

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
                context.lineTo(barGroup[0][0], settings.barpixelbase);
                //   horizontal line @ base from x to x(next)
                context.lineTo(barGroup[1][0], settings.barpixelbase);
                
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
                    context.moveTo(barGroup[j][0], Math.min(barGroup[j-1][1], barGroup[j][1], settings.barpixelbase));
                    context.lineTo(barGroup[j][0], Math.max(barGroup[j-1][1], barGroup[j][1], settings.barpixelbase));
                    //   horizontal line @ y(next) from x to x(next)
                    context.moveTo(barGroup[j][0],   barGroup[j][1]);
                    context.lineTo(barGroup[j+1][0], barGroup[j][1]);
                    //   horizontal line @ base from x to x(next)
                    context.moveTo(barGroup[j][0],   settings.barpixelbase);
                    context.lineTo(barGroup[j+1][0], settings.barpixelbase);
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
                context.lineTo(barGroup[n-1][0], settings.barpixelbase);
            }
            context.stroke();
            context.closePath();

        });
    
    });

});