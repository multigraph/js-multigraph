var Model = require('../../lib/jermaine/src/core/model.js');

var PlotLegend = require('./plot_legend.js'),
    Axis = require('./axis.js'),
    Renderer = require('./renderer.js');

var Plot = new Model("Plot", function () {
    this.hasA("legend").which.validatesWith(function (legend) {
        return legend instanceof PlotLegend;
    });
    this.hasA("horizontalaxis").which.validatesWith(function (axis) {
        return axis instanceof Axis;
    });
    this.hasA("verticalaxis").which.validatesWith(function (axis) {
        return axis instanceof Axis;
    });
    this.hasA("renderer").which.validatesWith(function (renderer) {
        return renderer instanceof Renderer;
    });
});

module.exports = Plot;
