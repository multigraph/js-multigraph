if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var Values = new ns.ModelTool.Model( 'Values', function () {
        this.hasA("content").which.validatesWith(function (content) {
            return typeof(content) === 'string';
        });
    });

    ns.Data.Values = Values;

}(window.multigraph));
