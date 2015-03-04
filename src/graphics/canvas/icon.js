module.exports = function() {
    var Icon = require('../../core/icon.js'),
        Point = require('../../math/point.js');

    if (typeof(Icon.renderBorder)==="function") { return Icon; }

    Icon.respondsTo("renderBorder", function (context, x, y) {
        context.save();
        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.strokeRect(x, y, this.width(), this.height());
        context.restore();
    });
    return Icon;
};
