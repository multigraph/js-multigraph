if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Graph = ns.Graph;

    Graph.respondsTo("render", function(paper) {
        paper.path("M 0,0 L 500,300 M 500,0 L 0,300");
    });

}(window.multigraph));
