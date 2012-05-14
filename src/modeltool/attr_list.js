if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";
    function AttrList() {
        var that = this,
        arr = [];

        var delegate = function (obj, func) {
            return function() { return obj[func].apply(obj, arguments); };
        };

        this.pop = delegate(arr, "pop");
    }

    ns.AttrList = AttrList;
}(window.multigraph.ModelTool));