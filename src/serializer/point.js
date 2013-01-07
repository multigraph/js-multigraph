window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, serialize) {

        ns.math.Point.prototype["serialize"] = function () {
            return this.x() + "," + this.y();
        };

    });
});
