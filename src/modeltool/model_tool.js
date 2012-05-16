if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";

    function Model(name, specification) {
        var s = new ns.Spec();
        specification.call(s);
        return s.create(name);        
    }

    ns.Model = Model;
}(window.multigraph.ModelTool));