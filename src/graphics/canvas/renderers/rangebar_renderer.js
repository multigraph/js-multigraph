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

        ns.RangeBarRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon) {
            var state = this.state();

            context.save();
            context.transform(1, 0, 0, 1, x, y);

            // Draw icon background (with opacity)
            context.save();
            context.strokeStyle = "#FFFFFF";
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, icon.width(), icon.height());
            context.restore();

            // Draw icon graphics
            context.fillStyle = state.fillcolor.toRGBA(state.fillopacity);
            context.lineWidth = state.linewidth;
            if (state.barpixelwidth < 10) {
                context.strokeStyle = state.fillcolor.toRGBA(state.fillopacity);
            } else {
                context.strokeStyle = state.linecolor.getHexString("#");
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
                context.fillRect(  icon.width()/4 - barwidth/2,                icon.height()/8, barwidth, icon.height()/2);
                context.strokeRect(icon.width()/4 - barwidth/2,                icon.height()/8, barwidth, icon.height()/2);

                context.fillRect(  icon.width() - icon.width()/4 - barwidth/2, icon.height()/4, barwidth, icon.height()/3);
                context.strokeRect(icon.width() - icon.width()/4 - barwidth/2, icon.height()/4, barwidth, icon.height()/3);
            }

            context.fillRect(  icon.width()/2 - barwidth/2, 0, barwidth, icon.height()-icon.height()/4);
            context.strokeRect(icon.width()/2 - barwidth/2, 0, barwidth, icon.height()-icon.height()/4);

            context.restore();
        });

    });

});
