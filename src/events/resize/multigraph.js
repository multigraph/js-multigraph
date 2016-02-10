module.exports = function($, window, errorHandler) {
    var Multigraph = require('../../core/multigraph.js')($),
        Point = require('../../math/point.js');

    if (typeof(Multigraph.registerResizeEvents)==="function") { return Multigraph; }

    Multigraph.respondsTo("registerResizeEvents", function (target) {
        var multigraph = this;
        var container = $(this.div());
        var c = $(target); // select canvas in multigraph div
        $(window).resize(respondGraph);

        function respondGraph()
        {
            c.attr("width", container.width() * window.devicePixelRatio);
            c.attr("height", container.height() * window.devicePixelRatio);
            c.css("width", container.width());
            c.css("height", container.height());
            multigraph.init();
        }
    });

    return Multigraph;
};
