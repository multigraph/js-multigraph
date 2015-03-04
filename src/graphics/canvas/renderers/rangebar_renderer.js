var _INCLUDED = false;
module.exports = function() {
    var RangeBarRenderer = require('../../core/renderers/rangebar_renderer.js');

    if (_INCLUDED) { return RangeBarRenderer; }
    _INCLUDED = true;

    // cached state object, for quick access during rendering, populated in begin() method:
    RangeBarRenderer.hasA("state");

    RangeBarRenderer.respondsTo("begin", function (context) {
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
        context.save();
        context.beginPath();
    });

    RangeBarRenderer.respondsTo("dataPoint", function (datap) {
        if (this.isMissing(datap)) {
            return;
        }

        var state = this.state(),
            context = state.context,
            p = this.transformPoint(datap),
            x0 = p[0] - state.barpixeloffset,
            x1 = x0 + state.barpixelwidth;

        context.moveTo(x0, p[1]);
        context.lineTo(x0, p[2]);
        context.lineTo(x1, p[2]);
        context.lineTo(x1, p[1]);
        context.lineTo(x0, p[1]);
    });

    RangeBarRenderer.respondsTo("end", function () {
        var state = this.state(),
            context = state.context;

        context.globalAlpha = state.fillopacity;
        context.fillStyle = state.fillcolor.getHexString("#");
        context.fill();
        if (state.linewidth > 0 && state.barpixelwidth > state.hidelines) {
            context.strokeStyle = state.linecolor.getHexString("#");
            context.lineWidth = state.linewidth;
            context.stroke();
        }
        context.restore();
    });

    RangeBarRenderer.respondsTo("renderLegendIcon", function (context, x, y, icon) {
        var state = this.state(),
            iconWidth  = icon.width(),
            iconHeight = icon.height(),
            barwidth;

        context.save();
        context.transform(1, 0, 0, 1, x, y);

        // Draw icon background (with opacity)
        context.save();
        context.strokeStyle = "#FFFFFF";
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, iconWidth, iconHeight);
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
        if (iconWidth > 20 || iconHeight > 20) {
            barwidth = iconWidth / 6;
        } else if(iconWidth > 10 || iconHeight > 10) {
            barwidth = iconWidth / 4;
        } else {
            barwidth = iconWidth / 4;
        }

        // If the icon is large enough draw extra bars
        if (iconWidth > 20 && iconHeight > 20) {
            context.fillRect(  iconWidth/4 - barwidth/2,             iconHeight/8, barwidth, iconHeight/2);
            context.strokeRect(iconWidth/4 - barwidth/2,             iconHeight/8, barwidth, iconHeight/2);

            context.fillRect(  iconWidth - iconWidth/4 - barwidth/2, iconHeight/4, barwidth, iconHeight/3);
            context.strokeRect(iconWidth - iconWidth/4 - barwidth/2, iconHeight/4, barwidth, iconHeight/3);
        }

        context.fillRect(  iconWidth/2 - barwidth/2, 0, barwidth, iconHeight-iconHeight/4);
        context.strokeRect(iconWidth/2 - barwidth/2, 0, barwidth, iconHeight-iconHeight/4);

        context.restore();
    });

    return RangeBarRenderer;
};
