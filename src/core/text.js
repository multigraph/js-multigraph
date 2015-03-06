var jermaine = require('../../lib/jermaine/src/jermaine.js');

/**
 * Text is a Jermaine model that supports storing and determining metrics of
 * strings in different graphics contexts.
 *
 * @class Text
 * @for Text
 * @constructor
 * @param string {String} The string stored in the Text model
 */
var Text = new jermaine.Model("Text", function () {
    this.isBuiltWith("string");

    /**
     * The string stored in the Text model
     *
     * @property string
     * @type {String}
     */
    this.hasA("string").which.isA("string");

    /**
     * The unrotated width of the string
     *
     * @property origWidth
     * @type {float}
     * @final
     */
    this.hasA("origWidth").which.isA("number");

    /**
     * The unrotated height of the string
     *
     * @property origHeight
     * @type {float}
     * @final
     */
    this.hasA("origHeight").which.isA("number");

    /**
     * The rotated width of the string
     *
     * @property rotatedWidth
     * @type {float}
     * @final
     */
    this.hasA("rotatedWidth").which.isA("number");

    /**
     * The rotated height of the string
     *
     * @property rotatedHeight
     * @type {float}
     * @final
     */
    this.hasA("rotatedHeight").which.isA("number");

    /**
     * Determines unrotated and rotated widths and heights for the stored string. Overridden by
     * implementations in graphics drivers.
     *
     * @method initializeGeometry
     * @chainable
     * @param {Object} graphicsContext
     *   @param {Float} graphicsContext.angle
     */
    this.respondsTo("initializeGeometry", function (graphicsContext) {
        var origWidth,
            origHeight,
            rotatedWidth,
            rotatedHeight;

        origWidth  = this.measureStringWidth(graphicsContext);
        origHeight = this.measureStringHeight(graphicsContext);
        rotatedWidth = origWidth;
        rotatedHeight = origHeight;

        if (graphicsContext && graphicsContext.angle !== undefined) {
            var angle = graphicsContext.angle/180 * Math.PI;
            rotatedWidth = Math.abs(Math.cos(angle)) * origWidth + Math.abs(Math.sin(angle)) * origHeight;
            rotatedHeight = Math.abs(Math.sin(angle)) * origWidth + Math.abs(Math.cos(angle)) * origHeight;
        }

        this.origWidth(origWidth);
        this.origHeight(origHeight);
        this.rotatedWidth(rotatedWidth);
        this.rotatedHeight(rotatedHeight);

        return this;
    });

    /**
     * Determines unrotated width for the stored string. Overridden by implementations in graphics
     * drivers.
     *
     * @method measureStringWidth
     * @private
     * @return {Float} Unrotated width of string.
     * @param {Object} graphicsContext
     */
    this.respondsTo("measureStringWidth", function (graphicsContext) {
        // Graphics drivers should replace this method with an actual implementation; this
        // is just a placeholder.  The implementation should return the width, in pixels,
        // of the given string.  Of course this is dependent on font choice, size, etc,
        // but we gloss over that at the moment.  Just return the width of the string
        // using some reasonable default font for now.  Later on, we'll modify this
        // function to use font information.
        var lines,
            maxLength = 1,
            testLength,
            i;

        if (this.string() === undefined) {
            throw new Error("measureStringWidth requires the string attr to be set.");
        }

        lines = this.string().split(/\n/);
        for (i = 0; i < lines.length; i++) {
            testLength = lines[i].length;
            if (testLength > maxLength) {
                maxLength = testLength;
            }
        }
        
        return maxLength * 15;
    });

    /**
     * Determines unrotated height for the stored string. Overridden by implementations in graphics
     * drivers.
     *
     * @method measureStringHeight
     * @private
     * @return {Float} Unrotated height of string.
     * @param {Object} graphicsContext
     */
    this.respondsTo("measureStringHeight", function (graphicsContext) {
        // Graphics drivers should replace this method with an actual implementation; this
        // is just a placeholder.  The implementation should return the height, in pixels,
        // of the given string.  Of course this is dependent on font choice, size, etc,
        // but we gloss over that at the moment.  Just return the height of the string
        // using some reasonable default font for now.  Later on, we'll modify this
        // function to use font information.
        if (this.string() === undefined) {
            throw new Error("measureStringHeight requires the string attr to be set.");
        }
        var newlineCount = this.string().match(/\n/g);
        return (newlineCount !== null ? (newlineCount.length + 1) : 1) * 12;
    });
});

module.exports = Text;
