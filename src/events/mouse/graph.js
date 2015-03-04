module.exports = function($, window, errorHandler) {
    var Graph = require('../../core/graph.js'),
        Axis = require('../../core/axis.js');

    if (typeof(Graph.mouseWheelTimer)==="function") { return Graph; }

    Graph.hasA("mouseWheelTimer").which.defaultsTo(null);

    Graph.respondsTo("doWheelZoom", function (multigraph, x, y, delta) {
        var that = this;
        try {
            this.pauseAllData();
            var axis = this.findNearestAxis(x, y);
            if (axis.orientation() === Axis.HORIZONTAL) {
                axis.doZoom(x, 4*delta);
            } else {
                axis.doZoom(y, 4*delta);
            }
            multigraph.redraw();

            // resume data fetching after .5 seconds of no mouse wheel motion:
            var mouseWheelTimer = this.mouseWheelTimer;
            if (mouseWheelTimer() !== null) {
                window.clearTimeout(mouseWheelTimer());
                mouseWheelTimer(null);
            }
            mouseWheelTimer(window.setTimeout(function () {
                that.resumeAllData();
            }, 500)); 
        } catch (e) {
            errorHandler(e);
        }
    });

    return Graph;
};
