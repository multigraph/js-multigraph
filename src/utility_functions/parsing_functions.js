window.multigraph.util.namespace("window.multigraph.utilityFunctions", function (ns) {
    "use strict";
    
    ns.parseBoolean = function (param) {
        switch (param.toLowerCase()) {
            case "true":
            case "yes":
                return true;
            case "false":
            case "no":
                return false;
            default:
                return param;
        }
    };

});
