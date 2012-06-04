if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Debugger = new ns.ModelTool.Model( 'Debugger', function () {
        this.hasA("visible").which.validatesWith(function (visible) {
            return typeof(visible) === 'string';
        });
        this.hasA("fixed").which.validatesWith(function (fixed) {
            return typeof(fixed) === 'string';
        });

    });

    ns.Debugger = Debugger;

}(window.multigraph));
