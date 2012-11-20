window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    /**
     * Mixin functions for canvas driver.
     *
     * @module multigraph
     * @submodule canvas
     * @main canvas
     */

    ns.mixin = new window.multigraph.core.Mixin();

    ns.mixin.add(function (ns) {
        window.multigraph.driver = "canvas";
    });

});
