window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Text = ns.Text;

        Text.respondsTo("measureStringWidth", function (context) {
            if (this.string() === undefined) {
                throw new Error("measureStringWidth requires the string attr to be set.");
            }

            var metrics = context.measureText(this.string());
            return metrics.width;
        });

        Text.respondsTo("measureStringHeight", function (context) {
            if (this.string() === undefined) {
                throw new Error("measureStringHeight requires the string attr to be set.");
            }

            //NOTE: kludge: canvas cannot exactly measure text height, so we just return a value
            //      estimated by using the width of an "M" as a substitute.  Maybe improve this
            //      later by using a better workaround.
            var metrics = context.measureText("M"),
                newlineCount = this.string().match(/\n/g);
            return (newlineCount !== null ? (newlineCount.length + 1) : 1) * metrics.width;
        });
    });
});
