window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule raphael
     */

    ns.mixin.add(function (ns) {

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
        ns.Title.respondsTo("render", function (paper, set) {
            var h = this.text().origHeight();
            var w = this.text().origWidth();
            var ax = (0.5 * w + this.padding() + this.border()) * (this.anchor().x() + 1);
            var ay = (0.5 * h + this.padding() + this.border()) * (this.anchor().y() + 1);
            var base;
            var transformString = "";

            if (this.frame() === "padding") {
                base = new window.multigraph.math.Point(
                    (this.base().x() + 1) * (this.graph().paddingBox().width() / 2) - this.graph().plotarea().margin().left(),
                    (this.base().y() + 1) * (this.graph().paddingBox().height() / 2) - this.graph().plotarea().margin().bottom()
                );
            } else {
                base = new window.multigraph.math.Point(
                    (this.base().x() + 1) * (this.graph().plotBox().width() / 2),
                    (this.base().y() + 1) * (this.graph().plotBox().height() / 2)
                );
            }

            transformString += "t" + base.x() + "," + base.y();
            transformString += "s1,-1";
            transformString += "t" + this.position().x() + "," + (-this.position().y());
            transformString += "t" + (-ax) + "," + ay;

            // border
            if (this.border() > 0) {
                set.push(
                    paper.rect(
                        this.border()/2,
                        this.border()/2,
                        w + (2 * this.padding()) + this.border(),
                        h + (2 * this.padding()) + this.border()
                    )
                        .transform(transformString)
                        .attr({
                            "stroke"       : this.bordercolor().toRGBA(),
                            "stroke-width" : this.border()
                        })
                );
            }

            // background
            set.push(
                paper.rect(
                    this.border(),
                    this.border(),
                    w + (2 * this.padding()),
                    h + (2 * this.padding())
                )
                    .transform(transformString)
                    .attr({
                        "stroke" : this.color().toRGBA(this.opacity()),
                        "fill"   : this.color().toRGBA(this.opacity())
                    })
            );

            // text
            set.push(
                paper.text(this.border() + this.padding() + w/2, this.border() + this.padding() + h/2, this.text().string())
                    .transform(transformString)
                    .attr({"font-size" : this.fontSize()})
            );

            return this;
        });

    });

});
