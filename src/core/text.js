window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    ns.Text = new window.jermaine.Model( "Text", function () {
        this.hasA("string").which.isA("string");
        this.hasA("width").which.isA("number");
        this.hasA("height").which.isA("number");

        this.isBuiltWith("string");

        this.respondsTo("initializeGeometry", function (graphicsContext) {
            var tempWidth,
                tempHeight,
                widthArea,
                heightArea;

            tempWidth  = this.measureStringWidth(graphicsContext);
            tempHeight = this.measureStringHeight(graphicsContext);
            widthArea  = tempWidth;
            heightArea = tempHeight;

            if (graphicsContext && graphicsContext.angle !== undefined) {
                var angle = graphicsContext.angle/180 * Math.PI;
                widthArea = Math.abs(Math.cos(angle)) * tempWidth + Math.abs(Math.sin(angle)) * tempHeight;
                heightArea = Math.abs(Math.sin(angle)) * tempWidth + Math.abs(Math.cos(angle)) * tempHeight;
            }

            this.width(widthArea);
            this.height(heightArea);

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
