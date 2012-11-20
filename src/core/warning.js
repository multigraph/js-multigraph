window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    ns.Warning = function(message) {
        this.message = message;
    };
    ns.Warning.prototype = new Error();

});
