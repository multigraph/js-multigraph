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
            ConsecutiveDistanceFilter = require('../../core/consecutive_distance_filter.js'),
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

            if ("legend" in json) {
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

            if ("filter" in json) {
                    if (vF.typeOf(json.filter) === 'object') {
                        if ((typeof(json.filter.type) !== 'undefined') && (json.filter.type !== 'consecutivedistance')) {
                            throw new Error('unknown filter type: ' + json.filter.type);
                        }
                        graph.filter(new ConsecutiveDistanceFilter(json.filter));
                    } else {
                        if (vF.typeOf(json.filter) !== 'boolean') {
                            throw new Error('invalid filter property: ' + json.filter);
                        } else if (json.filter) {
                            graph.filter(new ConsecutiveDistanceFilter({}));
                        }
                    }
            }

            var haxes = json.horizontalaxis ? json.horizontalaxis : json.horizontalaxes;
            if (json.horizontalaxis && json.horizontalaxes) {
                throw new Error("graph may not have both 'horizontalaxis' and 'horizontalaxes'");
            }
            if (haxes) {
                if (vF.typeOf(haxes) === 'array') {
                    haxes.forEach(function(axis) {
                        graph.axes().add( Axis.parseJSON(axis, Axis.HORIZONTAL, messageHandler, graph.multigraph()) );
                    });
                } else {
                    graph.axes().add( Axis.parseJSON(haxes, Axis.HORIZONTAL, messageHandler, graph.multigraph()) );
                }
            }

            var vaxes = json.verticalaxis ? json.verticalaxis : json.verticalaxes;
            if (json.verticalaxis && json.verticalaxes) {
                throw new Error("graph may not have both 'verticalaxis' and 'verticalaxes'");
            }
            if (vaxes) {
                if (vF.typeOf(vaxes) === 'array') {
                    vaxes.forEach(function(axis) {
                        graph.axes().add( Axis.parseJSON(axis, Axis.VERTICAL, messageHandler, graph.multigraph()) );
                    });
                } else {
                    graph.axes().add( Axis.parseJSON(vaxes, Axis.VERTICAL, messageHandler, graph.multigraph()) );
                }
            }


            function addAjaxThrottle(t) {
                var pattern    = t.pattern    ? t.pattern    : defaults.throttle.pattern,
                    requests   = t.requests   ? t.requests   : defaults.throttle.requests,
                    period     = t.period     ? t.period     : defaults.throttle.period,
                    concurrent = t.concurrent ? t.concurrent : defaults.throttle.concurrent;
                multigraph.addAjaxThrottle(pattern, requests, period, concurrent);
            }
            var throttles = json.throttle ? json.throttle : json.throttles;
            if (json.throttle && json.throttles) {
                throw new Error("graph may not have both 'throttle' and 'throttles'");
            }
            if (throttles) {
                if (vF.typeOf(throttles) === 'array') {
                    throttles.forEach(addAjaxThrottle);
                } else {
                    addAjaxThrottle(throttles);
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

            var plots = json.plot ? json.plot : json.plots;
            if (json.plot && json.plots) {
                throw new Error("graph may not have both 'plot' and 'plots'");
            }
            if (plots) {
                if (vF.typeOf(plots) === 'array') {
                    plots.forEach(function(plot) {
                        graph.plots().add( Plot.parseJSON(plot, graph, messageHandler) );
                    });
                } else {
                    graph.plots().add( Plot.parseJSON(plots, graph, messageHandler) );
                }
            }

            graph.postParse();
        }
        return graph;
    };

    return Graph;
};
