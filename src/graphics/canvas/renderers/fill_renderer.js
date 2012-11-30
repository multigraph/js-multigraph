window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    var mathUtil = window.multigraph.math.util;

    ns.mixin.add(function (ns) {

        // cached state object, for quick access during rendering, populated in begin() method:
        ns.FillRenderer.hasA("state");

        ns.FillRenderer.respondsTo("begin", function (context) {
            var state = {
                "context"            : context,
                "run"             : [],
                "previouspoint"      : null,
                "linecolor"          : this.getOptionValue("linecolor"),
                "linewidth"          : this.getOptionValue("linewidth"),
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "downfillcolor"      : this.getOptionValue("downfillcolor"),
                "fillopacity"        : this.getOptionValue("fillopacity"),
                "fillbase"           : this.getOptionValue("fillbase"),
                "currentfillcolor"   : null,
                "currentlinecolor"   : null
            };
            if (state.downfillcolor === null) {
                state.downfillcolor = state.fillcolor;
            }
            if (state.fillbase !== null) {
                state.fillpixelbase = this.plot().verticalaxis().dataValueToAxisValue(state.fillbase);
            } else {
                state.fillpixelbase = 0;
            }

            this.state(state);

            context.fillStyle = state.fillcolor.getHexString("#");
        });

        // This renderer's dataPoint() method works by accumulating
        // and drawing one "run" of data points at a time.  A "run" of
        // points consists of a consecutive sequence of non-missing
        // data points which have the same fill color.  (The fill
        // color can change if the data line crosses the fill base
        // line, if the downfillcolor is different from the
        // fillcolor.)
        ns.FillRenderer.respondsTo("dataPoint", function (datap) {
            var state = this.state(),
                context = state.context,
                fillcolor,
                linecolor,
                p;

            // if this is a missing point, and if it's not the first point, end the current run and render it
            if (this.isMissing(datap)) {
                if (state.previouspoint !== null) {
                    state.run.push( [state.previouspoint[0], state.fillpixelbase] );
                    this.renderRun();
                    state.run = [];
                    state.previouspoint = null;
                }
                return;
            }

            // transform point to pixel coords
            p = this.transformPoint(datap);

            // set the fillcolor and linecolor for this data point, based on whether it's above
            // or below the base line
            if (p[1] >= state.fillpixelbase) {
                fillcolor = state.fillcolor;
                linecolor = state.linecolor;
            } else {
                fillcolor = state.downfillcolor;
                linecolor = state.downlinecolor;
            }

            // if we're starting a new run, start with this data point's base line projection
            if (state.run.length === 0) {
                state.run.push( [p[0], state.fillpixelbase] );
            } else {
                // if we're not starting a new run, but the fill color
                // has changed, interpolate to find the exact base
                // line crossing point, end the current run with that
                // point, render it, and start a new run with the
                // crossing point.
                if (!fillcolor.eq(state.currentfillcolor)) {
                    var x = mathUtil.safe_interp(state.previouspoint[1], p[1], state.previouspoint[0], p[0], state.fillpixelbase);
                    // base line crossing point is [x, state.fillpixelbase]
                    state.run.push( [x, state.fillpixelbase] );
                    this.renderRun();
                    state.run = [];
                    state.run.push( [x, state.fillpixelbase] );
                }
            }

            // add this point to the current run, and remember it and the current colors for next time
            state.run.push(p);
            state.previouspoint = p;
            state.currentfillcolor = fillcolor;
            state.currentlinecolor = linecolor;
        });

        ns.FillRenderer.respondsTo("end", function () {
            var state = this.state(),
                context = state.context;
            if (state.run.length > 0) {
                state.run.push( [state.run[state.run.length-1][0], state.fillpixelbase] );
                this.renderRun(state.currentfillcolor, state.currentlinecolor);
            }
        });

        // Render the current run of data points.  This consists of drawing the fill region
        // under the points, and the lines connecting the points.  The first and last points
        // in the run array are always on the base line; the points in between these two
        // are the actual data points.
        ns.FillRenderer.respondsTo("renderRun", function () {
            var state = this.state(),
                context = state.context,
                i;

            // fill the run
            context.save();
            context.globalAlpha = state.fillopacity;
            context.strokeStyle = state.fillcolor.getHexString("#");
            context.beginPath();
            context.moveTo(state.run[0][0], state.run[0][1]);
            for (i=1; i<state.run.length; ++i) {
                context.lineTo(state.run[i][0], state.run[i][1]);
            }
            context.closePath();
            context.fill();
            context.restore();

            // stroke the run
            context.save();
            context.strokeStyle = state.linecolor.getHexString("#");
            context.lineWidth = state.linewidth;
            context.beginPath();
            context.moveTo(state.run[1][0], state.run[1][1]);
            for (i=2; i<state.run.length-1; ++i) {
                context.lineTo(state.run[i][0], state.run[i][1]);
            }
            context.stroke();
            context.restore();
        });

        ns.FillRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon, opacity) {
            var state = this.state();
            
            context.save();
            context.transform(1, 0, 0, 1, x, y);

            context.save();
            // Draw icon background (with opacity)
            if (icon.width() < 10 || icon.height() < 10) {
                context.fillStyle = state.fillcolor.toRGBA();
            } else {
                context.fillStyle = "rgba(255, 255, 255, 1)";
            }
            context.fillRect(0, 0, icon.width(), icon.height());
            context.restore();

            context.strokeStyle = state.linecolor.toRGBA();
            context.lineWidth   = state.linewidth;
            context.fillStyle   = state.fillcolor.toRGBA(state.fillopacity);

            context.beginPath();
            context.moveTo(0, 0);
            // Draw the middle range icon or the large range icon if the width and height allow it
            if (icon.width() > 10 || icon.height() > 10) {
                // Draw a more complex icon if the icons width and height are large enough
                if (icon.width() > 20 || icon.height() > 20) {
                    context.lineTo(icon.width() / 6, icon.height() / 2);
                    context.lineTo(icon.width() / 3, icon.height() / 4);
                }
                context.lineTo(icon.width() / 2, icon.height() - icon.height() / 4);

                if (icon.width() > 20 || icon.height() > 20) {
                    context.lineTo(icon.width() - icon.width() / 3, icon.height() / 4);
                    context.lineTo(icon.width() - icon.width() / 6, icon.height() / 2);
                }
            }
            context.lineTo(icon.width(), 0);
            context.stroke();
            context.fill();
            context.closePath();

            context.restore();

        });

    });

});
