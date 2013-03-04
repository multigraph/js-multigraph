window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var BandRenderer = ns.BandRenderer;

        BandRenderer.hasA("fillElem");
        BandRenderer.hasA("line1Elem");
        BandRenderer.hasA("line2Elem");

        // cached state object, for quick access during rendering, populated in begin() method:
        BandRenderer.hasA("state");

        BandRenderer.respondsTo("begin", function (graphicsContext) {
            var state = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "run"                : [],
                "fillPath"           : "",
                "line1Path"          : "",
                "line2Path"          : "",
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

        BandRenderer.respondsTo("beginRedraw", function () {
            var state = this.state();
            state.run = [];
            state.fillPath = "";
            state.line1Path = "";
            state.line2Path = "";
        });

        // This renderer's dataPoint() method works by accumulating
        // and drawing one "run" of data points at a time.  A "run" of
        // points consists of a consecutive sequence of non-missing
        // data points which have the same fill color.  (The fill
        // color can change if the data line crosses the fill base
        // line, if the downfillcolor is different from the
        // fillcolor.)
        BandRenderer.respondsTo("dataPoint", function (datap) {
            var state = this.state();

            if (this.isMissing(datap)) {
                // if this is a missing point, render and reset the current run, if any
                if (state.run.length > 0) {
                    renderRun(state);
                    state.run = [];
                }
            } else {
                // otherwise, transform point to pixel coords
                // and add it to the current run
                state.run.push(this.transformPoint(datap));
            }
        });

        BandRenderer.respondsTo("end", function () {
            var state = this.state(),
                paper = state.paper,
                set = state.set,
                width,
                color;
            // render the current run, if any
            if (state.run.length > 0) {
                renderRun(state);
            }

            var fillElem = paper.path(state.fillPath)
                .attr({
                    "fill"         : state.fillcolor.toRGBA(state.fillopacity),
                    "stroke"       : "none"
                });

            this.fillElem(fillElem);
            set.push(fillElem);
                
            width = (state.line1width >= 0) ? state.line1width : state.linewidth;
            if (state.line1Path !== "" && width > 0) {
                color = (state.line1color !== null) ? state.line1color : state.linecolor;
                var line1Elem = paper.path(state.line1Path)
                    .attr({
                        "stroke-width" : width,
                        "stroke"       : color.getHexString("#")
                    });
                this.line1Elem(line1Elem);
                set.push(line1Elem);
            }
            
            width = (state.line2width >= 0) ? state.line2width : state.linewidth;
            if (state.line2Path !== "" && width > 0) {
                color = (state.line2color !== null) ? state.line2color : state.linecolor;
                var line2Elem = paper.path(state.line2Path)
                    .attr({
                        "stroke-width" : width,
                        "stroke"       : color.getHexString("#")
                    });
                this.line2Elem(line2Elem);
                set.push(line2Elem);
            }
        });

        BandRenderer.respondsTo("endRedraw", function () {
            var state = this.state(),
                width;
            // render the current run, if any
            if (state.run.length > 0) {
                renderRun(state);
            }

            this.fillElem().attr("path", state.fillPath);
            if (this.line1Elem()) {
                this.line1Elem().attr("path", state.line1Path);
            }
            if (this.line2Elem()) {
                this.line2Elem().attr("path", state.line2Path);
            }
        });

        //
        // Private utility function to stroke line segments connecting the points of a run
        //
        var strokeRunLine = function (path, run, whichLine, width, defaultWidth) {
            var i;

            width = (width >= 0) ? width : defaultWidth;
            if (width > 0) {
                path = path + "M" + run[0][0] + "," + run[0][whichLine];
                for (i = 1; i < run.length; ++i) {
                    path = path + "L" + run[i][0] + "," + run[i][whichLine];
                }
            }
            return path;
        };

        // Render the current run of data points.  This consists of drawing the fill region
        // in the band between the two data lines, and connecting the points of each data line
        // with lines of the appropriate color.
        var renderRun = function (state) {
            var fillPath  = state.fillPath,
                line1Path = state.line1Path,
                line2Path = state.line2Path,
                run = state.run,
                i;

            // trace to the right along line 1
            fillPath = fillPath + "M" + run[0][0] + "," + run[0][1];            
            for (i = 1; i < run.length; ++i) {
                fillPath += "L" + run[i][0] + "," + run[i][1];
            }

            // trace back to the left along line 2
            fillPath = fillPath + "L" + run[run.length-1][0] + "," + run[run.length-1][2];
            for (i = run.length-1; i >= 0; --i) {
                fillPath = fillPath + "L" + run[i][0] + "," + run[i][2];
            }
            fillPath = fillPath + "Z";

            // stroke line1
            line1Path = strokeRunLine(line1Path, run, 1, state.line1width, state.linewidth);
            
            // stroke line2
            line2Path = strokeRunLine(line2Path, run, 2, state.line2width, state.linewidth);

            state.fillPath = fillPath;
            state.line1Path = line1Path;
            state.line2Path = line2Path;
        };

        BandRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon) {
            var state = this.state(),
                paper = graphicsContext.paper,
                set   = graphicsContext.set,
                iconWidth  = icon.width(),
                iconHeight = icon.height(),
                backgroundColor,
                linewidth,
                linecolor,
                path = "M" + 0 + "," + (2*iconHeight/8) +
                    "L" + 0 + "," + (6*iconHeight/8) +
                    "L" + iconWidth + "," + (7*iconHeight/8) +
                    "L" + iconWidth + "," + (3*iconHeight/8) +
                    "L" + 0 + "," + (2*iconHeight/8);

            // Draw icon background (with opacity)
            if (iconWidth < 10 || iconHeight < 10) {
                backgroundColor = state.fillcolor.toRGBA();
            } else {
                backgroundColor = "#FFFFFF";
            }

            set.push(
                paper.rect(x, y, iconWidth, iconHeight)
                    .attr({
                        "fill"   : backgroundColor,
                        "stroke" : backgroundColor
                    })
            );
            
            // Draw icon graphics
            linewidth = (state.line2width >= 0) ? state.line2width : state.linewidth;
            linecolor = (state.line2color !== null) ? state.line2color : state.linecolor;

            set.push(
                paper.path(path)
                    .attr({
                        "stroke-width" : linewidth,
                        "stroke"       : linecolor.toRGBA(),
                        "fill"         : state.fillcolor.toRGBA(state.fillopacity)
                    })
                    .transform("t" + x + "," + y)
            );
        });

        BandRenderer.respondsTo("redrawLegendIcon", function () {
            // no-op
        });

    });

});
