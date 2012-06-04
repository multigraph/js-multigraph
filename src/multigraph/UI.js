if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var UI = new ns.ModelTool.Model( 'UI', function () {
        this.hasA("eventhandler").which.validatesWith(function (eventhandler) {
            return typeof(eventhandler) === 'string';
        });

    });

    ns.UI = UI;

}(window.multigraph));
