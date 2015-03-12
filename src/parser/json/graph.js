// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Graph = require('../../core/graph.js'),
        pF = require('../../util/parsingFunctions.js');

    // if parseJSON method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Graph.parseJSON)==="function") { return Graph; };

    Graph.parseJSON = function (json, multigraph, messageHandler) {
        var graph = new Graph(),
            Axis  = require('../../core/axis.js'),
            Window = require('../../core/window.js'),
            Legend = require('../../core/legend.js'),
            Background = require('../../core/background.js'),
            Plotarea = require('../../core/plotarea.js'),
            Title = require('../../core/title.js'),
            Data = require('../../core/data.js'),
            Plot = require('../../core/plot.js'),
            uF = require('../../util/utilityFunctions.js'),
            vF = require('../../util/validationFunctions.js'),
            defaults = uF.getDefaultValuesFromXSD(),
            child;

        // so that these objects' .parseJSON methods will exist when needed below:
        require('./window.js');
        require('./legend.js');
        require('./background.js');
        require('./plotarea.js');
        require('./title.js');
        require('./axis.js');
        require('./data.js')($);
        require('./plot.js');

        graph.multigraph(multigraph);
        if (json) {

            if (json.window) {
                graph.window( Window.parseJSON(json.window) );
            }

            if (json.legend) {
                graph.legend( Legend.parseJSON(json.legend) );
            } else {
                graph.legend( Legend.parseJSON() );
            }

            if (json.background) {
                graph.background( Background.parseJSON(json.background, graph.multigraph()) );
            }

            if (json.plotarea) {
                graph.plotarea( Plotarea.parseJSON(json.plotarea) );
            }

            if (json.title) {
                graph.title( Title.parseJSON(json.title, graph) );
            }

            if (json.horizontalaxis) {
                if (vF.typeOf(json.horizontalaxis) === 'array') {
                    json.horizontalaxis.forEach(function(axis) {
                        graph.axes().add( Axis.parseJSON(axis, Axis.HORIZONTAL, messageHandler, graph.multigraph()) );
                    });
                } else {
                    graph.axes().add( Axis.parseJSON(json.horizontalaxis, Axis.HORIZONTAL, messageHandler, graph.multigraph()) );
                }
            }

            if (json.verticalaxis) {
                if (vF.typeOf(json.verticalaxis) === 'array') {
                    json.verticalaxis.forEach(function(axis) {
                        graph.axes().add( Axis.parseJSON(axis, Axis.VERTICAL, messageHandler, graph.multigraph()) );
                    });
                } else {
                    graph.axes().add( Axis.parseJSON(json.verticalaxis, Axis.VERTICAL, messageHandler, graph.multigraph()) );
                }
            }

            function addAjaxThrottle(t) {
                var pattern    = t.pattern    ? t.pattern    : defaults.throttle.pattern,
                    requests   = t.requests   ? t.requests   : defaults.throttle.requests,
                    period     = t.period     ? t.period     : defaults.throttle.period,
                    concurrent = t.concurrent ? t.concurrent : defaults.throttle.concurrent;
                multigraph.addAjaxThrottle(pattern, requests, period, concurrent);
            }
            if (json.throttle) {
                if (vF.typeOf(json.throttle) === 'array') {
                    json.throttle.forEach(addAjaxThrottle);
                } else {
                    addAjaxThrottle(json.throttle);
                }
            }

            if (json.data) {
                if (vF.typeOf(json.data) === 'array') {
                    json.data.forEach(function(data) {
                        graph.data().add( Data.parseJSON(data, graph.multigraph(), messageHandler) );
                    });
                } else {
                    graph.data().add( Data.parseJSON(json.data, graph.multigraph(), messageHandler) );
                }
            }

            if (json.plot) {
                if (vF.typeOf(json.plot) === 'array') {
                    json.plot.forEach(function(plot) {
                        graph.plots().add( Plot.parseJSON(plot, graph, messageHandler) );
                    });
                } else {
                    graph.plots().add( Plot.parseJSON(json.plot, graph, messageHandler) );
                }
            }

            graph.postParse();
        }
        return graph;
    };

    return Graph;
};
