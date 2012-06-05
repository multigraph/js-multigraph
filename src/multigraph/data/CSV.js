if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var CSV = new ns.ModelTool.Model( 'CSV', function () {
        this.hasA("location").which.validatesWith(function (location) {
            return typeof(location) === 'string';
        });

    });

    ns.Data.CSV = CSV;

}(window.multigraph));
