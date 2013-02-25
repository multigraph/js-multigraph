window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var RangeBarRenderer = ns.RangeBarRenderer;

        RangeBarRenderer.hasAn("elem");
        // cached state object, for quick access during rendering, populated in begin() method:
        RangeBarRenderer.hasA("state");

        RangeBarRenderer.respondsTo("begin", function (graphicsContext) {
            var state = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "path"               : "",
                "barwidth"           : this.getOptionValue("barwidth"),
                "baroffset"          : this.getOptionValue("baroffset"),
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "fillopacity"        : this.getOptionValue("fillopacity"),
                "linecolor"          : this.getOptionValue("linecolor"),
                "linewidth"          : this.getOptionValue("linewidth"),
                "hidelines"          : this.getOptionValue("hidelines")
            };
            state.barpixelwidth  = state.barwidth.getRealValue() * this.plot().horizontalaxis().axisToDataRatio();
            state.barpixeloffset = state.barpixelwidth * state.baroffset;
            this.state(state);
        });

        RangeBarRenderer.respondsTo("beginRedraw", function () {
            var state = this.state();
            state.path = "";
            state.barpixelwidth  = state.barwidth.getRealValue() * this.plot().horizontalaxis().axisToDataRatio();
            state.barpixeloffset = state.barpixelwidth * state.baroffset;
        });

        RangeBarRenderer.respondsTo("dataPoint", function (datap) {
            if (this.isMissing(datap)) {
                return;
            }

            var state = this.state(),
                p     = this.transformPoint(datap),
                x0    = p[0] - state.barpixeloffset,
                x1    = x0 + state.barpixelwidth;

            state.path += "M" + x0 + "," + p[1] +
                "L" + x0 + "," + p[2] +
                "L" + x1 + "," + p[2] +
                "L" + x1 + "," + p[1] +
                "Z";
        });

        RangeBarRenderer.respondsTo("end", function () {
            var state = this.state(),
                path  = state.path,
                rangeBarAttrs = {
                    "fill-opacity" : state.fillopacity,
                    fill           : state.fillcolor.getHexString("#"),
                    stroke         : "none"
                };

            if (state.linewidth > 0 && state.barpixelwidth > state.hidelines) {
                rangeBarAttrs.stroke          = state.linecolor.getHexString("#");
                rangeBarAttrs["stroke-width"] = state.linewidth;
            }

            var elem = state.paper.path(path).attr(rangeBarAttrs);
            this.elem(elem);
            state.set.push(elem);
        });

        RangeBarRenderer.respondsTo("endRedraw", function () {
            var state = this.state(),
                rangeBarAttrs = {
                    path : state.path
                };

            if (state.linewidth > 0 && state.barpixelwidth > state.hidelines) {
                rangeBarAttrs.stroke          = state.linecolor.getHexString("#");
                rangeBarAttrs["stroke-width"] = state.linewidth;
            } else {
                rangeBarAttrs.stroke          = "none";
                rangeBarAttrs["stroke-width"] = 1;
            }

            this.elem().attr(rangeBarAttrs);
        });

        RangeBarRenderer.respondsTo("generateBar", function (x, y, width, height) {
            var path = "M" + x + "," + y;
            path    += "L" + x + "," + (y + height);
            path    += "L" + (x + width) + "," + (y + height);
            path    += "L" + (x + width) + "," + y;
            path    += "Z";
            return path;
        });

        RangeBarRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon) {
            var state = this.state(),
                paper = graphicsContext.paper,
                set = graphicsContext.set,
                path = "";

            // Draw icon background
            set.push(
                paper.rect(x, y, icon.width(), icon.height())
                    .attr({
                        "stroke" : "#FFFFFF",
                        "fill"   : "#FFFFFF"
                    })
            );

            // Draw icon graphics
            var attrs = {
                "fill"         : state.fillcolor.toRGBA(state.fillopacity),
                "stroke-width" : state.linewidth
            };

            if (state.barpixelwidth < 10) {
                attrs.stroke = state.fillcolor.toRGBA(state.fillopacity);
            } else {
                attrs.stroke = state.linecolor.getHexString("#");
            }

            // Adjust the width of the icons bars based upon the width and height of the icon Ranges: {20, 10, 0}
            var barwidth;
            if (icon.width() > 20 || icon.height() > 20) {
                barwidth = icon.width() / 6;
            } else if(icon.width() > 10 || icon.height() > 10) {
                barwidth = icon.width() / 4;
            } else {
                barwidth = icon.width() / 4;
            }

            // If the icon is large enough draw extra bars
            if (icon.width() > 20 && icon.height() > 20) {
                path += this.generateBar(x + icon.width()/4 - barwidth/2,                y + icon.height()/8, barwidth, icon.height()/2);

                path += this.generateBar(x + icon.width() - icon.width()/4 - barwidth/2, y + icon.height()/4, barwidth, icon.height()/3);
            }
            path += this.generateBar(x + icon.width()/2 - barwidth/2, y, barwidth, icon.height()-icon.height()/4);

            set.push(
                paper.path(path)
                    .attr(attrs)
            );

            return this;
        });

    });

});
