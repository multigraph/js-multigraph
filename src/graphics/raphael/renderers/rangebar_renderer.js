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

        ns.RangeBarRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon, opacity) {
        });

    });

});
