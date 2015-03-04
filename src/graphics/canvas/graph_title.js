module.exports = function() {
    var Title = require('../../core/title.js'),
        Point = require('../../math/point.js');

    if (typeof(Title.render)==="function") { return Title; }

    Title.respondsTo("render", function (context) {
        var graph           = this.graph(),
            border          = this.border(),
            padding         = this.padding(),
            storedAnchor    = this.anchor(),
            storedBase      = this.base(),
            position        = this.position(),
            title           = this.text(),
            backgroundColor = this.color().toRGBA(this.opacity()),
            paddingBox      = graph.paddingBox(),
            plotBox         = graph.plotBox(),
            plotareaMargin  = graph.plotarea().margin(),
            h = title.origHeight(),
            w = title.origWidth(),
            pixelAnchor = new Point(
                (0.5 * w + padding + border) * (storedAnchor.x() + 1),
                (0.5 * h + padding + border) * (storedAnchor.y() + 1)
            ),
            pixelBase;

        if (this.frame() === "padding") {
            pixelBase = new Point(
                (storedBase.x() + 1) * (paddingBox.width() / 2)  - plotareaMargin.left(),
                (storedBase.y() + 1) * (paddingBox.height() / 2) - plotareaMargin.bottom()
            );
        } else {
            pixelBase = new Point(
                (storedBase.x() + 1) * (plotBox.width() / 2),
                (storedBase.y() + 1) * (plotBox.height() / 2)
            );
        }

        context.save();
        title.setTransform(context, pixelAnchor, pixelBase, position, 0);
        context.transform(1, 0, 0, -1, 0, 0);

        // border
        if (border > 0) {
            context.strokeStyle = this.bordercolor().toRGBA();
            context.lineWidth = border;
            context.strokeRect(
                border / 2,
                border / 2,
                w + (2 * padding) + border,
                h + (2 * padding) + border
            );
        }

        // background
        context.fillStyle = backgroundColor;
        context.fillRect(
            border,
            border,
            w + (2 * padding),
            h + (2 * padding)
        );
        context.restore();

        // text
        context.save();
        var textPosition = new Point(
            position.x() + border + padding,
            position.y() + border + padding
        );
        context.font = this.fontSize() + " sans-serif";
        context.fillStyle = "rgba(0, 0, 0, 1)";
        title.drawText(context, pixelAnchor, pixelBase, textPosition, 0);
        context.restore();
    });

    return Title;
};
