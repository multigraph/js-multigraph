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
            var graph = title.graph(),
                base  = title.base();

            if (title.frame() === "padding") {
                return new window.multigraph.math.Point(
                    (base.x() + 1) * (graph.paddingBox().width() / 2) -  graph.plotarea().margin().left(),
                    (base.y() + 1) * (graph.paddingBox().height() / 2) - graph.plotarea().margin().bottom()
                );
            } else {
                return new window.multigraph.math.Point(
                    (base.x() + 1) * (graph.plotBox().width() / 2),
                    (base.y() + 1) * (graph.plotBox().height() / 2)
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
            var anchor  = this.anchor(),
                border  = this.border(),
                padding = this.padding(),
                w = this.text().origWidth(),
                h = this.text().origHeight(),
                ax = (0.5 * w + padding + border) * (anchor.x() + 1),
                ay = (0.5 * h + padding + border) * (anchor.y() + 1),
                base = computeTitlePixelBase(this),
                transformString = "t" + base.x() + "," + base.y() +
                    "s1,-1" +
                    "t" + this.position().x() + "," + (-this.position().y()) +
                    "t" + (-ax) + "," + ay;

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
            var textElem = paper.text(border + padding + w/2, border + padding + h/2, this.text().string())
                .transform(transformString)
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

            var deltaX = base.x() - previousBase.x(),
                deltaY = base.y() - previousBase.y(),
                x = this.textElem().attr("x"),
                y = this.textElem().attr("y"),
                transformString = "...t" + deltaX + " " + deltaY;

            this.textElem().attr({
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
