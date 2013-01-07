window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, serialize) {

        ns.math.Displacement.prototype["serialize"] = function () {
            var output = this.a().toString(10);
            if (this.b() !== undefined && this.b() !== 0) {
                if (this.b() >= 0) {
                    output += "+";
                }
                output += this.b().toString(10);
            }
            return output;
        };

    });
});
