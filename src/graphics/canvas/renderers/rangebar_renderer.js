window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        // cached state object, for quick access during rendering, populated in begin() method:
        ns.RangeBarRenderer.hasA("state");

        ns.RangeBarRenderer.respondsTo("begin", function (context) {
            var state = {
                "context"            : context,
                "run"                : [],
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
                context = state.context,
                p;

            if (this.isMissing(datap)) {
                return;
            }

            p = this.transformPoint(datap);

            var x0 = p[0] - state.barpixeloffset;
            var x1 = x0 + state.barpixelwidth;

            context.save();
            context.globalAlpha = state.fillopacity;
            context.fillStyle = state.fillcolor.getHexString("#");
            context.beginPath();
            context.moveTo(x0, p[1]);
            context.lineTo(x0, p[2]);
            context.lineTo(x1, p[2]);
            context.lineTo(x1, p[1]);
            context.closePath();
            context.fill();
            context.restore();

            if (state.linewidth > 0 && state.barpixelwidth > state.hidelines) {
                context.save();
                context.strokeStyle = state.linecolor.getHexString("#");
                context.lineWidth = state.linewidth;
                context.beginPath();
                context.moveTo(x0, p[1]);
                context.lineTo(x0, p[2]);
                context.lineTo(x1, p[2]);
                context.lineTo(x1, p[1]);
                context.closePath();
                context.stroke();
                context.restore();
            }

        });

        ns.RangeBarRenderer.respondsTo("end", function () {
        });

        ns.RangeBarRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon, opacity) {
        });

    });

});
