window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var RangeBarRenderer = ns.RangeBarRenderer;

        RangeBarRenderer.hasAn("elem");
        RangeBarRenderer.hasAn("iconGraphicElem");
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

            state.path = state.path +
                "M" + x0 + "," + p[1] +
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

        var generateBar = function (x, y, width, height) {
            return "M" + x + "," + y +
                "L" + x + "," + (y + height) +
                "L" + (x + width) + "," + (y + height) +
                "L" + (x + width) + "," + y +
                "Z";
        };

        RangeBarRenderer.respondsTo("renderLegendIcon", function (graphicsContext, x, y, icon) {
            var state = this.state(),
                paper = graphicsContext.paper,
                set   = graphicsContext.set,
                iconWidth  = icon.width(),
                iconHeight = icon.height(),
                path = "";

            // Draw icon background
            set.push(
                paper.rect(x, y, iconWidth, iconHeight)
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
            if (iconWidth > 20 || iconHeight > 20) {
                barwidth = iconWidth / 6;
            } else if(iconWidth > 10 || iconHeight > 10) {
                barwidth = iconWidth / 4;
            } else {
                barwidth = iconWidth / 4;
            }

            // If the icon is large enough draw extra bars
            if (iconWidth > 20 && iconHeight > 20) {
                path = path +
                    generateBar(x + iconWidth/4 - barwidth/2,             y + iconHeight/8, barwidth, iconHeight/2) +
                    generateBar(x + iconWidth - iconWidth/4 - barwidth/2, y + iconHeight/4, barwidth, iconHeight/3);
            }
            path = path + generateBar(x + iconWidth/2 - barwidth/2, y, barwidth, iconHeight-iconHeight/4);

            var iconGraphicElem = paper.path(path)
                .attr(attrs);
            this.iconGraphicElem(iconGraphicElem);
            set.push(iconGraphicElem);

            return this;
        });

        RangeBarRenderer.respondsTo("redrawLegendIcon", function () {
            var state = this.state(),
                stroke;

            if (state.barpixelwidth < 10) {
                stroke = state.fillcolor.toRGBA(state.fillopacity);
            } else {
                stroke = state.linecolor.getHexString("#");
            }

            this.iconGraphicElem().attr("stroke", stroke);
        });

    });

});
