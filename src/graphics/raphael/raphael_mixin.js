window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    /**
     * Mixin functions for the raphael driver.
     *
     * @module multigraph
     * @submodule raphael
     */
    ns.mixin = new window.multigraph.core.Mixin();

    ns.mixin.add(function (ns) {
        window.multigraph.driver = "raphael";
    });

});
