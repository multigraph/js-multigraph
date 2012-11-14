window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    ns.Text = new window.jermaine.Model( "Text", function () {
        this.hasA("string").which.isA("string");
        this.hasA("origWidth").which.isA("number");
        this.hasA("origHeight").which.isA("number");
        this.hasA("rotatedWidth").which.isA("number");
        this.hasA("rotatedHeight").which.isA("number");

        this.isBuiltWith("string");

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
});
