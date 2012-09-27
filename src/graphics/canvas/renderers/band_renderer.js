window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached state object, for quick access during rendering, populated in begin() method:
        ns.BandRenderer.hasA("state");

        ns.BandRenderer.respondsTo("begin", function (context) {
            var state = {
                "context"            : context,
                "run"                : [],
                "linecolor"          : this.getOptionValue("linecolor"),
                "line1color"         : this.getOptionValue("line1color"),
                "line2color"         : this.getOptionValue("line2color"),
                "linewidth"          : this.getOptionValue("linewidth"),
                "line1width"         : this.getOptionValue("line1width"),
                "line2width"         : this.getOptionValue("line2width"),
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "fillopacity"        : this.getOptionValue("fillopacity")
            };
            this.state(state);
        });

        // This renderer's dataPoint() method works by accumulating
        // and drawing one "run" of data points at a time.  A "run" of
        // points consists of a consecutive sequence of non-missing
        // data points which have the same fill color.  (The fill
        // color can change if the data line crosses the fill base
        // line, if the downfillcolor is different from the
        // fillcolor.)
        ns.BandRenderer.respondsTo("dataPoint", function (datap) {
            var state = this.state(),
                p;

            if (this.isMissing(datap)) {
                // if this is a missing point, render and reset the current run, if any
                if (state.run.length > 0) {
                    this.renderRun();
                    state.run = [];
                }
            } else {
                // otherwise, transform point to pixel coords
                p = this.transformPoint(datap);
                // and add it to the current run
                state.run.push(p);
            }
        });

        ns.BandRenderer.respondsTo("end", function () {
            var state = this.state();
            // render the current run, if any
            if (state.run.length > 0) {
                this.renderRun();
            }
        });

        /**
         * Private utility function to stroke line segments connecting the points of a run
         */
        var strokeRunLine = function(context, run, whichLine, color, defaultColor, width, defaultWidth) {
            var i;

            width = (width >= 0) ? width : defaultWidth;
            if (width > 0) {
                color = (color != null) ? color : defaultColor;
                context.save();
                context.strokeStyle = color.getHexString("#");
                context.lineWidth = width;
                context.beginPath();
                context.moveTo(run[0][0], run[0][whichLine]);
                for (i=1; i<run.length; ++i) {
                    context.lineTo(run[i][0], run[i][whichLine]);
                }
                context.stroke();
            }
            context.restore();
        };

        // Render the current run of data points.  This consists of drawing the fill region
        // in the band between the two data lines, and connecting the points of each data line
        // with lines of the appropriate color.
        ns.BandRenderer.respondsTo("renderRun", function () {
            var state = this.state(),
                context = state.context,
                run = state.run,
                i;

            // fill the run
            context.save();
            context.globalAlpha = state.fillopacity;
            context.fillStyle = state.fillcolor.getHexString("#");
            context.beginPath();
            // trace to the right along line 1
            context.moveTo(run[0][0], run[0][1]);
            for (i=1; i<run.length; ++i) {
                context.lineTo(run[i][0], run[i][1]);
            }
            // trace back to the left along line 2
            context.lineTo(run[run.length-1][0], run[run.length-1][2]);
            for (i=run.length-1; i>=0; --i) {
                context.lineTo(run[i][0], run[i][2]);
            }
            context.closePath();
            context.fill();
            context.restore();

            // stroke line1
            strokeRunLine(context, run, 1, state.line1color, state.linecolor, state.line1width, state.linewidth);

            // stroke line2
            strokeRunLine(context, run, 2, state.line2color, state.linecolor, state.line2width, state.linewidth);
        });

        ns.BandRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon, opacity) {
            var state = this.state();
            
            context.save();
            context.transform(1, 0, 0, 1, x, y);

            context.save();
            // Draw icon background (with opacity)
            if (icon.width() < 10 || icon.height() < 10) {
                context.fillStyle = state.fillcolor.toRGBA(opacity);
            } else {
                context.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
            }
            context.fillRect(0, 0, icon.width(), icon.height());
            context.restore();

            context.strokeStyle = state.linecolor.toRGBA(opacity);
            context.lineWidth   = state.linewidth;
            context.fillStyle   = state.fillcolor.toRGBA(opacity * state.fillopacity);

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
