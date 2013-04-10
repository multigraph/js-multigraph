window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule raphael
     */

    ns.mixin.add(function (ns) {
        var Text = ns.Text;

        /**
         * Determines unrotated and rotated widths and heights for the stored string in the raphael
         * environment
         *
         * @method initializeGeometry
         * @for Text
         * @chainable
         * @param {Object} graphicsContext
         *   @param {TextElem} graphicsContext.elem
         *   @param {Float} graphicsContext.angle
         *   @param {String} graphicsContext.fontSize
         */
        Text.respondsTo("initializeGeometry", function (graphicsContext) {
            var elem = graphicsContext.elem,
                origWidth, origHeight,
                rotatedWidth, rotatedHeight,
                boundingBox,
                defaultFontSize,
                currentTransform,
                currentText;

            if (graphicsContext.fontSize !== undefined) {
                defaultFontSize = elem.attr("font-size");
                elem.attr("font-size", graphicsContext.fontSize);
            }

            currentText = elem.attr("text");
            elem.attr("text", this.string());

            currentTransform = elem.transform();
            elem.transform("");

            boundingBox = elem.getBBox();
            origWidth   = boundingBox.width;
            origHeight  = boundingBox.height;
            if (graphicsContext.angle !== undefined) {
                var angle = graphicsContext.angle/180 * Math.PI,
                    sinAngle = Math.abs(Math.sin(angle)),
                    cosAngle = Math.abs(Math.cos(angle));

                rotatedWidth  = cosAngle * origWidth + sinAngle * origHeight;
                rotatedHeight = sinAngle * origWidth + cosAngle * origHeight;
            } else {
                rotatedWidth  = origWidth;
                rotatedHeight = origHeight;
            }

            if (graphicsContext.fontSize !== undefined) {
                elem.attr("font-size", defaultFontSize);
            }

            elem.attr("text", currentText);

            var i;
            for (i = 0; i < currentTransform.length; i++) {
                currentTransform[i] = currentTransform[i].join(" ");
            }
            elem.transform(currentTransform.join(" "));

            this.origWidth(origWidth);
            this.origHeight(origHeight);
            this.rotatedWidth(rotatedWidth);
            this.rotatedHeight(rotatedHeight);

            return this;
        });

        /**
         * Determines unrotated width for the stored string in the raphael environment.
         *
         * @method measureStringWidth
         * @for Text
         * @private
         * @return {Float} Unrotated width of string.
         * @param {TextElem} elem
         */
        Text.respondsTo("measureStringWidth", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringWidth requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().width;
        });

        /**
         * Determines unrotated height for the stored string in the raphael environment.
         *
         * @method measureStringHeight
         * @for Text
         * @private
         * @return {Float} Unrotated height of string.
         * @param {TextElem} text
         */
        Text.respondsTo("measureStringHeight", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringHeight requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().height;
        });

        Text.respondsTo("computeTransform", function (anchor, base, position, angle) {
            return "t" + base.x() + "," + base.y() +
                "s1,-1" +
                "t" + position.x() + "," + (-position.y()) +
                "r" + (-angle) +
                "t" + (-anchor.x()) + "," + anchor.y();
        });

        Text.respondsTo("drawText", function (paper, anchor, base, position, angle) {
            return paper.text(0, 0, this.string())
                .transform(this.computeTransform(anchor, base, position, angle));
        });

    });

});
