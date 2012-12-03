window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached state object, for quick access during rendering, populated in begin() method:
        ns.RangeBarRenderer.hasA("state");

        ns.RangeBarRenderer.respondsTo("begin", function (graphicsContext) {
            var state = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "path"               : "",
                "barpixelwidth"      : this.getOptionValue("barwidth").getRealValue() * this.plot().horizontalaxis().axisToDataRatio(),
                "barpixeloffset"     : 0,
                "baroffset"          : this.getOptionValue("baroffset"),
                "fillcolor"          : this.getOptionValue("fillcolor"),
                "fillopacity"        : this.getOptionValue("fillopacity"),
                "linecolor"          : this.getOptionValue("linecolor"),
                "linewidth"          : this.getOptionValue("linewidth"),
                "hidelines"          : this.getOptionValue("hidelines")
            };
            state.barpixeloffset = state.barpixelwidth * state.baroffset;
            this.state(state);
        });

        ns.RangeBarRenderer.respondsTo("dataPoint", function (datap) {
            var state = this.state(),
                path = "",
                p;

            if (this.isMissing(datap)) {
                return;
            }

            p = this.transformPoint(datap);

            var x0 = p[0] - state.barpixeloffset;
            var x1 = x0 + state.barpixelwidth;

            path += "M" + x0 + "," + p[1];
            path += "L" + x0 + "," + p[2];
            path += "L" + x1 + "," + p[2];
            path += "L" + x1 + "," + p[1];
            path += "Z";

            state.path += path;

        });

        ns.RangeBarRenderer.respondsTo("end", function () {
            var state = this.state(),
                paper = state.paper,
                set = state.set,
                path = state.path,
                rangeBarAttrs = {};

            rangeBarAttrs["fill-opacity"] = state.fillopacity;
            rangeBarAttrs.fill = state.fillcolor.getHexString("#");
            rangeBarAttrs.stroke = state.fillcolor.getHexString("#");

            if (state.linewidth > 0 && state.barpixelwidth > state.hidelines) {
                rangeBarAttrs.stroke = state.linecolor.getHexString("#");
                rangeBarAttrs["stroke-width"] = state.linewidth;
            }

            set.push(
                paper.path(path).attr(rangeBarAttrs)
            );

        });

        ns.RangeBarRenderer.respondsTo("generateBar", function (x, y, width, height) {
            var path = "M" + x + "," + y;
            path    += "L" + x + "," + (y + height);
            path    += "L" + (x + width) + "," + (y + height);
            path    += "L" + (x + width) + "," + y;
            path    += "Z";
            return path;
        });

        ns.RangeBarRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon) {
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
