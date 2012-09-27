window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    ns.Text = new window.jermaine.Model( "Text", function () {
        this.hasA("string").which.isA("string");
        this.hasA("width").which.isA("number");
        this.hasA("height").which.isA("number");

        this.isBuiltWith("string");

        this.respondsTo("initializeGeometry", function (graphicsContext) {
            this.width(this.measureStringWidth(graphicsContext));
            this.height(this.measureStringHeight(graphicsContext));
        });

        this.respondsTo("measureStringWidth", function () {
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

        this.respondsTo("measureStringHeight", function () {
            if (this.string() === undefined) {
                throw new Error("measureStringHeight requires the string attr to be set.");
            }
            var newlineCount = this.string().match(/\n/g);
            return (newlineCount !== null ? (newlineCount.length + 1) : 1) * 12;
        });
    });
});
