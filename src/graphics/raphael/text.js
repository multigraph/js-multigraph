window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Text = ns.Text;

        Text.respondsTo("measureStringWidth", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringWidth requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().height;
        });

        Text.respondsTo("measureStringHeight", function (elem) {
            if (this.string() === undefined) {
                throw new Error("measureStringHeight requires the string attr to be set.");
            }

            elem.attr("text", this.string());
            return elem.getBBox().height;
        });
    });
});
