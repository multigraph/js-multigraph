window.multigraph.util.namespace("window.multigraph.math", function (ns) {
    "use strict";

    ns.util = {
        "interp": function (x, x0, x1, y0, y1) {
            return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
        }
    };

});
