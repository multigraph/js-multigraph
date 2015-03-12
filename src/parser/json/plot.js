var Plot = require('../../core/plot.js');

// "plot" : {
//   "legend" : { "visible": "BOOLEAN", "label": "STRING" }, 
//   "legend" : BOOLEAN,
//   "horizontalaxis" : {
//     "ref" : STRING!,
//     "variables" [ STRING, ... ]
//   },
//   "verticalaxis" : {
//     "ref" : STRING!,
//     "variables" [ STRING, ... ],
//     "constant" : DATAVALUE
//   },
//   "renderer" : {
//     "type" : RENDERERTYPE(line),
//     "options" : [
//         { "name": STRING!, "value": STRING!, "min": DATAVALUE, "max": DATAVALUE },
//         { "name": STRING!, "value": STRING!, "min": DATAVALUE, "max": DATAVALUE },
//         ...
//     ],
//   },
//   "datatips" : {
//     "format"           : STRING!,
//     "bgcolor"          : COLOR,
//     "bgalpha"          : DOUBLE,
//     "border"           : INTEGER,
//     "bordercolor"      : COLOR,
//     "pad"              : INTEGER,
//     "variable-formats" : [ STRING!, ... ]
//   }
// }
Plot.parseJSON = function (json, graph, messageHandler) {
    var DataPlot     = require('../../core/data_plot.js'),
        PlotLegend   = require('../../core/plot_legend.js'),
        ConstantPlot = require('../../core/constant_plot.js'),
        DataValue    = require('../../core/data_value.js'),
        Renderer     = require('../../core/renderer.js'),
        Filter       = require('../../core/filter.js'),
        Datatips     = require('../../core/datatips.js'),
        pF           = require('../../util/parsingFunctions.js'),
        plot,
        haxis,
        vaxis,
        variable,
        attr;

    // so that PlotLegend,Renderer,Filter,Datatips will have .parseJSON when called below:
    require('./plot_legend.js');
    require('./renderer.js');
    require('./filter.js');
    require('./datatips.js');

    if (json) {

        // populate verticalaxis
        if (json.verticalaxis && json.verticalaxis.ref) {
            vaxis = graph.axisById(json.verticalaxis.ref);
            if (vaxis === undefined) {
                throw new Error("Plot Vertical Axis Error: The graph does not contain an axis with an id of '" + json.verticalaxis.ref + "'");
            }
        }

        if (json.verticalaxis && json.verticalaxis.constant) {
            plot = new ConstantPlot(DataValue.parse(vaxis.type(), json.verticalaxis.constant));
        } else {
            plot = new DataPlot();
        }

        plot.verticalaxis(vaxis);

        // populate horizontalaxis from
        if (json.horizontalaxis && json.horizontalaxis.ref) {
            haxis = graph.axisById(json.horizontalaxis.ref);
            if (haxis !== undefined) {
                plot.horizontalaxis(haxis);
            } else {
                throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + json.horizontalaxis.ref + "'");
            }
        }

        // if this is a DataPlot, parse variables
        if (plot instanceof DataPlot) {
            // provide default horizontalaxis variable if not present
            if (!json.horizontalaxis || !json.horizontalaxis.variables || json.horizontalaxis.variables.length === 0) {
                plot.variable().add(null);
            }

            //TODO: defer population of variables until normalizer has executed
            // populate axis variables
            var vars = [];
            if (graph) {
                if (json.horizontalaxis && json.horizontalaxis.variables) {
                    vars = vars.concat(json.horizontalaxis.variables);
                }
                if (json.verticalaxis && json.verticalaxis.variables) {
                    vars = vars.concat(json.verticalaxis.variables);
                }
                vars.forEach(function(vid) {
                    variable = graph.variableById(vid);
                    if (variable !== undefined) {
                        plot.data( variable.data() );
                        plot.variable().add(variable);
                    } else {
                        throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + vid + "'");
                    }
                });
            }
        }

        if ("legend" in json) {
            plot.legend(PlotLegend.parseJSON(json.legend, plot));
        } else {
            plot.legend(PlotLegend.parseJSON(undefined, plot));
        }

        if ("renderer" in json) {
            plot.renderer(Renderer.parseJSON(json.renderer, plot, messageHandler));
        }

        if ("filter" in json) {
            plot.filter(Filter.parseJSON(json.filter));
        }

        if ("datatips" in json) {
            plot.datatips(Datatips.parseJSON(json.datatips));
        }

    }
    return plot;
};

module.exports = Plot;
