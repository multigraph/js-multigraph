window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule raphael
     */

    ns.mixin.add(function (ns) {

        var Title = ns.Title;

        Title.hasA("borderElem");
        Title.hasA("backgroundElem");
        Title.hasA("textElem");
        Title.hasA("previousBase");

        var computeTitlePixelBase = function (title) {
            var graph          = title.graph(),
                base           = title.base(),
                paddingBox     = graph.paddingBox(),
                plotBox        = graph.plotBox(),
                plotareaMargin = graph.plotarea().margin(),
                Point          = window.multigraph.math.Point;

            if (title.frame() === "padding") {
                return new Point(
                    (base.x() + 1) * (paddingBox.width() / 2) -  plotareaMargin.left(),
                    (base.y() + 1) * (paddingBox.height() / 2) - plotareaMargin.bottom()
                );
            } else {
                return new Point(
                    (base.x() + 1) * (plotBox.width() / 2),
                    (base.y() + 1) * (plotBox.height() / 2)
                );
            }
        };

        /**
         * Renders the title using the Raphael driver.
         *
         * @method render
         * @for Title
         * @chainable
         * @param {Paper} paper
         * @param {Set} set
         * @author jrfrimme
         */
        Title.respondsTo("render", function (paper, set) {
            var Point = window.multigraph.math.Point,
                storedAnchor = this.anchor(),
                border       = this.border(),
                position     = this.position(),
                padding      = this.padding(),
                text         = this.text(),
                w = text.origWidth(),
                h = text.origHeight(),
                base = computeTitlePixelBase(this),
                transformString,
                pixelAnchor;

            pixelAnchor = new Point(
                (0.5 * w + padding + border) * (storedAnchor.x() + 1),
                (0.5 * h + padding + border) * (storedAnchor.y() + 1)
            );

            transformString = text.computeTransform(pixelAnchor, base, position, 0);

            this.previousBase(base);

            // border
            if (border > 0) {
                var borderElem = paper.rect(border/2, border/2, w + (2 * padding) + border, h + (2 * padding) + border)
                    .transform(transformString)
                    .attr({
                        "stroke"       : this.bordercolor().toRGBA(),
                        "stroke-width" : border
                    });
                this.borderElem(borderElem);
                set.push(borderElem);
            }

            // background
            var backgroundElem = paper.rect(border, border, w + (2 * padding), h + (2 * padding))
                .transform(transformString)
                .attr({
                    "stroke" : "none",
                    "fill"   : this.color().toRGBA(this.opacity())
                });
            this.backgroundElem(backgroundElem);
            set.push(backgroundElem);

            // text
            var textPosition = new Point(
                position.x() + border + padding + w/2,
                position.y() + border + padding + h/2
            ),
                textElem = text.drawText(paper, pixelAnchor, base, textPosition, 0)
                    .attr({"font-size" : this.fontSize()});

            this.textElem(textElem);
            set.push(textElem);

            return this;
        });

        Title.respondsTo("redraw", function () {
            var base         = computeTitlePixelBase(this),
                previousBase = this.previousBase();

            if (base.x() === previousBase.x() && base.y() === previousBase.y()) {
                return this;
            }

            var textElem = this.textElem(),
                deltaX = base.x() - previousBase.x(),
                deltaY = base.y() - previousBase.y(),
                x = textElem.attr("x"),
                y = textElem.attr("y"),
                transformString = "...t" + deltaX + " " + deltaY;

            textElem.attr({
                "x" : x + deltaX,
                "y" : y - deltaY
            });
            if (this.borderElem()) {
                this.borderElem().transform(transformString);
            }
            this.backgroundElem().transform(transformString);
            this.previousBase(base);

            return this;
        });

    });

});
