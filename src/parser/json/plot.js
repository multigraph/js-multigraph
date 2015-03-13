var Plot = require('../../core/plot.js');

// "plot" : {
//   "legend" : { "visible": "BOOLEAN", "label": "STRING" }, 
//   "legend" : BOOLEAN,
//                 //NO:  "horizontalaxis" : {
//                 //NO:    "ref" : STRING!,
//                 //NO:    "variables" [ STRING, ... ]
//                 //NO:  },
//                 //NO:  "verticalaxis" : {
//                 //NO:    "ref" : STRING!,
//                 //NO:    "variables" [ STRING, ... ],
//                 //NO:    "constant" : DATAVALUE
//                 //NO:  },
// 
//   "horizontalaxis" : AXIS-ID(string)
//   "horizontalaxis" : [ VARIABLE-ID(string), ... ]
//   "horizontalaxis" : { AXIS-ID(string): [ VARIABLE-ID(string), ... ] }
// 
//   "verticalaxis" : [ VARIABLE-ID(string), ... ]
//   "verticalaxis" : { AXIS-ID(string): DATA-VALUE(number or string) }     <-- ConstantPlot
//   "verticalaxis" : { AXIS-ID(string): VARIABLE-ID(string) }
//   "verticalaxis" : { AXIS-ID(string): [ VARIABLE-ID(string), ... ] }
//   "verticalaxis" : DATA-VALUE(number or string)                          <-- ConstantPlot
//   "verticalaxis" : AXIS-ID(string)
// 
//   "renderer" : {
//     "type" : RENDERERTYPE(line),
//     "options" : {
//         "option1": value1,
//         "option2": value2,
//         "option3": [ { "value": value3, "min": DATAVALUE, "max" : DATAVALUE }, .. ]
//         ...
//     },
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
//
// Alternately, instead of the "renderer" section, the "plot" section may instead contain
// the following (at the top level of the "plot" object):
// 
//   "style" : RENDERERTYPE(line),
//   "options" : {
//       "option1": value1,
//       "option2": value2,
//       "option3": [ { "value": value3, "min": DATAVALUE, "max" : DATAVALUE }, .. ]
//       ...
//   },
// 
Plot.parseJSON = function (json, graph, messageHandler) {
    var DataPlot      = require('../../core/data_plot.js'),
        PlotLegend    = require('../../core/plot_legend.js'),
        ConstantPlot  = require('../../core/constant_plot.js'),
        DataValue     = require('../../core/data_value.js'),
        DateTimeValue = require('../../core/datetime_value.js'),
        Renderer      = require('../../core/renderer.js'),
        Filter        = require('../../core/filter.js'),
        Datatips      = require('../../core/datatips.js'),
        pF            = require('../../util/parsingFunctions.js'),
        vF            = require('../../util/validationFunctions.js'),
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

    // return the (first) key of an object; intended for convenient fetching of the
    // key name of an object (verticalaxis or horizontalaxis) that contains only one key
    function key(obj) {
        return (Object.keys(obj))[0];
    }

    // return the number of keys in an object
    function keyCount(obj) {
        return Object.keys(obj).length;
    }

    // Return true iff the value v looks like a data_value -- i.e. it's either a number,
    // or a string that looks like it could be parsed into either a number or a datetime value.
    function looks_like_data_value(v) {
        if (vF.typeOf(v) === 'number') {
            return true;
        } else if (vF.typeOf(v) === 'string') {
            // !isNaN is the recommended way to test whether a string represents a valid number
            // http://stackoverflow.com/questions/175739/is-there-a-built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
            if (!isNaN(v)) {  
                return true;
            } else {
                // if the string isn't a valid number, try to parse it as a DatetimeValue
                try { DatetimeValue.parse(v); }
                catch (e) { return false; }
                return true;
            }
        } else {
            return false;
        }
    }

    if (json) {
        var vars = {
            "horizontal" : [],
            "vertical"   : []
        };
        var axisid = {
            "horizontal" : undefined,
            "vertical"   : undefined
        };

//   "verticalaxis" : [ VARIABLE-ID(string), ... ]
//   "verticalaxis" : { AXIS-ID(string): DATA-VALUE(number or string) }     <-- ConstantPlot
//   "verticalaxis" : { AXIS-ID(string): VARIABLE-ID(string) }
//   "verticalaxis" : { AXIS-ID(string): [ VARIABLE-ID(string), ... ] }
//   "verticalaxis" : DATA-VALUE(number or string)                          <-- ConstantPlot
//   "verticalaxis" : AXIS-ID(string)

        // deal with vertical axis first, because it determines whether we have
        // a ConstantPlot or a DataPlot
        var constant_value = undefined;
        if (json.verticalaxis) {
            if (vF.typeOf(json.verticalaxis) === 'array') {
                // if it's an array, it's a list of variable ids for the plot,
                // and the axisid is unspecified
                vars.vertical = json.verticalaxis;
            } else if (vF.typeOf(json.verticalaxis) === 'number') {
                // in theory we'd like to validate here that the vertical axis type is NUMBER, but
                // we can't do that because we don't actually have the axis yet -- its id is implied
                // so it will be determined later.  So we set a numeric constant value and hope
                // for the best.
                constant_value = DataValue.parse(DataValue.NUMBER, json.verticalaxis);
            } else if (vF.typeOf(json.verticalaxis) === 'string') {
                // It's a string that is either an axis id, or a DatetimeValue constant (we
                // know it's not a number constant, because that would have been caught by
                // the 'number' case above).
                if (looks_like_data_value(json.verticalaxis)) {
                    // Again, in theory, we'd like to validate that the axis type is DateTime,
                    // but we can't because we don't have the axis yet.
                    constant_value = DataValue.parse(DataValue.DATETIME, json.verticalaxis);
                } else {
                    axisid.vertical = json.verticalaxis;
                    vaxis = graph.axisById(axisid.vertical);
                    if (typeof(vaxis) === 'undefined') {
                        throw new Error("plot refers to unknown vertical axis id: " + axisid.vertical);
                    }
                }
            } else if (vF.typeOf(json.verticalaxis) === 'object') {
                // if it's an object, the key is the axis id, and the value
                // is either:
                //    case 1: an array of variable ids, or
                //    case 2: a single value that is either an axis id, or
                //            a constant value for a constant plot
                if (keyCount(json.verticalaxis) !== 1) {
                    throw new Error("plot.verticalaxis object must contain exactly one key/value pair");
                }
                axisid.vertical = key(json.verticalaxis);
                vaxis = graph.axisById(axisid.vertical);
                if (typeof(vaxis) === 'undefined') {
                    throw new Error("plot refers to unknown vertical axis id: " + axisid.vertical);
                }
                if (vF.typeOf(json.verticalaxis[axisid.vertical]) !== "undefined") {
                    if (vF.typeOf(json.verticalaxis[axisid.vertical]) === 'array') {
                        // case 1: array of variable ids.
                        vars.vertical = json.verticalaxis[axisid.vertical];
                    } else {
                        // case 2: single value, either axis id, or constant value.
                        //   if it's a number, it must be a constant value
                        if (vF.typeOf(json.verticalaxis[axisid.vertical]) === 'number') {
                            if (vaxis.type() !== DataValue.NUMBER) {
                                throw new Error("constant value of '" + json.verticalaxis[axisid.vertical]
                                                + "' not appropriate for axis of type '" + vaxis.type() + "'");
                            }
                            constant_value = DataValue.parse(DataValue.NUMBER, json.verticalaxis[axisid.vertical]);
                        } else {
                            // it's not a number, so it must be a string that is either
                            // a constant DatetimeValue, or an axis id.
                            if (vF.typeOf(json.verticalaxis[axisid.vertical]) !== 'string') {
                                throw new Error("value for key '" + axisid.vertical + "' for verticalaxis is of wrong type");
                            }
                            if (looks_like_data_value(json.verticalaxis[axisid.vertical])) {
                                constant_value = DataValue.parse(vaxis.type(), json.verticalaxis[axisid.vertical]);
                            } else {
                                vars.vertical = [ json.verticalaxis[axisid.vertical] ];
                            }
                        }
                    }
                }
            }
        }

        if (constant_value !== undefined) {
            plot = new ConstantPlot(constant_value);
        } else {
            plot = new DataPlot();
        }

        plot.verticalaxis(vaxis);

        //   "horizontalaxis" : AXIS-ID(string)
        //   "horizontalaxis" : [ VARIABLE-ID(string), ... ]
        //   "horizontalaxis" : { AXIS-ID(string): [ VARIABLE-ID(string), ... ] }
        if (json.horizontalaxis) {
            if (vF.typeOf(json.horizontalaxis) === 'array') {
                // if it's an array, it's a list of variable ids for the plot,
                // and the axisid is unspecified
                vars.horizontal = json.horizontalaxis;
            } else if (vF.typeOf(json.horizontalaxis) === 'string') {
                axisid.horizontal = json.horizontalaxis;
                haxis = graph.axisById(axisid.horizontal);
                if (haxis !== undefined) {
                    plot.horizontalaxis(haxis);
                } else {
                    throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + axisid.horizontal + "'");
                }
            } else if (vF.typeOf(json.horizontalaxis) === 'object') {
                // if it's an object, the key is the axis id, and the value
                // is either:
                //    case 1: an array of variable ids, or
                //    case 2: an axis id
                if (keyCount(json.horizontalaxis) !== 1) {
                    throw new Error("plot.horizontalaxis object must contain exactly one key/value pair");
                }
                axisid.horizontal = key(json.horizontalaxis);
                haxis = graph.axisById(axisid.horizontal);
                if (haxis !== undefined) {
                    plot.horizontalaxis(haxis);
                } else {
                    throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + axisid.horizontal + "'");
                }
                if (vF.typeOf(json.horizontalaxis[axisid.horizontal]) !== "undefined") {
                    if (vF.typeOf(json.horizontalaxis[axisid.horizontal]) === 'array') {
                        // case 1: array of variable ids.
                        vars.horizontal = json.horizontalaxis[axisid.horizontal];
                    } else {
                        // case 2: an axis id
                            // must be a string that is an axis id.
                            if (vF.typeOf(json.horizontalaxis[axisid.horizontal]) !== 'string') {
                                throw new Error("value for key '" + axisid.horizontal + "' for horizontalaxis is of wrong type");
                            }
                        vars.horizontal = [ json.horizontalaxis[axisid.horizontal] ];
                    }
                }
            }
        }

        // if this is a DataPlot, parse variables
        if (plot instanceof DataPlot) {

            // provide default horizontalaxis variable if none present
            if (vars.horizontal.length == 0) {
                plot.variable().add(null);
            }

            //TODO: defer population of variables until normalizer has executed
            // populate axis variables
            if (graph) {
                var allvars = [].concat(vars.horizontal, vars.vertical);
                allvars.forEach(function(vid) {
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





//xxx        // populate verticalaxis
//xxx        if (json.verticalaxis) {
//xxx            if (vF.typeOf(json.verticalaxis) === 'string') {
//xxx                axisid.vertical = json.verticalaxis;
//xxx            } else {
//xxx                if (keyCount(json.verticalaxis) !== 1) {
//xxx                    throw new Error("plot.verticalaxis must contain exactly one key/value pair");
//xxx                }
//xxx                axisid.vertical = key(json.verticalaxis);
//xxx                if (vF.typeOf(json.verticalaxis[axisid.vertical]) !== "undefined") {
//xxx                    if (vF.typeOf(json.verticalaxis[axisid.vertical]) === 'array') {
//xxx                        vars.vertical = json.verticalaxis[axisid.vertical];
//xxx                    } else {
//xxx                        vars.vertical = [ json.verticalaxis[axisid.vertical] ];
//xxx                    }
//xxx                }
//xxx            }
//xxx            vaxis = graph.axisById(axisid.vertical);
//xxx            if (vaxis === undefined) {
//xxx                throw new Error("Plot Vertical Axis Error: The graph does not contain an axis with an id of '" + axisid.vertical + "'");
//xxx            }
//xxx        }
//xxx
//xxx
//xxx//        // populate verticalaxis
//xxx//        if (json.verticalaxis && json.verticalaxis.ref) {
//xxx//            vaxis = graph.axisById(json.verticalaxis.ref);
//xxx//            if (vaxis === undefined) {
//xxx//                throw new Error("Plot Vertical Axis Error: The graph does not contain an axis with an id of '" + json.verticalaxis.ref + "'");
//xxx//            }
//xxx//        }
//xxx
//xxx        // If there is a verticalaxis object, and if the value it contains looks like a
//xxx        // number or datetime value, assume it's a Constant Plot.  Otherwise assume the
//xxx        // value is either a variable id, or a list of variable ids, so we have a Data Plot.
//xxx        if ((vF.typeOf(json.verticalaxis) === 'object') && looks_like_data_value(json.verticalaxis[axisid.vertical])) {
//xxx            plot = new ConstantPlot(DataValue.parse(vaxis.type(), json.verticalaxis[axisid.vertical]));
//xxx        } else {
//xxx            plot = new DataPlot();
//xxx        }
//xxx
//xxx//        if (json.verticalaxis && json.verticalaxis.constant) {
//xxx//            plot = new ConstantPlot(DataValue.parse(vaxis.type(), json.verticalaxis.constant));
//xxx//        } else {
//xxx//            plot = new DataPlot();
//xxx//        }
//xxx
//xxx        plot.verticalaxis(vaxis);
//xxx
//xxx        // populate horizontalaxis
//xxx        if (json.horizontalaxis) {
//xxx            if (vF.typeOf(json.horizontalaxis) === 'string') {
//xxx                axisid.horizontal = json.horizontalaxis;
//xxx            } else {
//xxx                if (keyCount(json.horizontalaxis) !== 1) {
//xxx                    throw new Error("plot.horizontalaxis must contain exactly one key/value pair");
//xxx                }
//xxx                axisid.horizontal = key(json.horizontalaxis);
//xxx                if (vF.typeOf(json.horizontalaxis[axisid.horizontal]) !== "undefined") {
//xxx                    if (vF.typeOf(json.horizontalaxis[axisid.horizontal]) === 'array') {
//xxx                        vars.horizontal = json.horizontalaxis[axisid.horizontal];
//xxx                    } else {
//xxx                        vars.horizontal = [ json.horizontalaxis[axisid.horizontal] ];
//xxx                    }
//xxx                }
//xxx                haxis = graph.axisById(axisid.horizontal);
//xxx                if (haxis !== undefined) {
//xxx                    plot.horizontalaxis(haxis);
//xxx                } else {
//xxx                    throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + axisid.horizontal + "'");
//xxx                }
//xxx            }
//xxx        }
//xxx
//xxx//        if (json.horizontalaxis && json.horizontalaxis.ref) {
//xxx//            haxis = graph.axisById(json.horizontalaxis.ref);
//xxx//            if (haxis !== undefined) {
//xxx//                plot.horizontalaxis(haxis);
//xxx//            } else {
//xxx//                throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + json.horizontalaxis.ref + "'");
//xxx//            }
//xxx//        }
//xxx
//xxx        // if this is a DataPlot, parse variables
//xxx        if (plot instanceof DataPlot) {
//xxx
//xxx            // provide default horizontalaxis variable if none present
//xxx            if (vars.horizontal.length == 0) {
//xxx                plot.variable().add(null);
//xxx            }
//xxx
//xxx            //TODO: defer population of variables until normalizer has executed
//xxx            // populate axis variables
//xxx            if (graph) {
//xxx                var allvars = [].concat(vars.horizontal, vars.vertical);
//xxx                allvars.forEach(function(vid) {
//xxx                    variable = graph.variableById(vid);
//xxx                    if (variable !== undefined) {
//xxx                        plot.data( variable.data() );
//xxx                        plot.variable().add(variable);
//xxx                    } else {
//xxx                        throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + vid + "'");
//xxx                    }
//xxx                });
//xxx            }
//xxx        }



//        // if this is a DataPlot, parse variables
//        if (plot instanceof DataPlot) {
//            // provide default horizontalaxis variable if not present
//            if (!json.horizontalaxis || !json.horizontalaxis.variables || json.horizontalaxis.variables.length === 0) {
//                plot.variable().add(null);
//            }
//
//            //TODO: defer population of variables until normalizer has executed
//            // populate axis variables
//            var vars = [];
//            if (graph) {
//                if (json.horizontalaxis && json.horizontalaxis.variables) {
//                    vars = vars.concat(json.horizontalaxis.variables);
//                }
//                if (json.verticalaxis && json.verticalaxis.variables) {
//                    vars = vars.concat(json.verticalaxis.variables);
//                }
//                vars.forEach(function(vid) {
//                    variable = graph.variableById(vid);
//                    if (variable !== undefined) {
//                        plot.data( variable.data() );
//                        plot.variable().add(variable);
//                    } else {
//                        throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + vid + "'");
//                    }
//                });
//            }
//        }

        if ("legend" in json) {
            plot.legend(PlotLegend.parseJSON(json.legend, plot));
        } else {
            plot.legend(PlotLegend.parseJSON(undefined, plot));
        }

        if (("renderer" in json) && (("style" in json) || ("options" in json))) {
            throw new Error("plot may not contain both 'renderer' and 'style', or 'renderer' and 'options'");
        }

        if ("renderer" in json) {
            plot.renderer(Renderer.parseJSON(json.renderer, plot, messageHandler));
        } else if ("style" in json) {
            // json.options may or may not be present here
            plot.renderer(Renderer.parseJSON(
                { "type" : json.style, "options" : json.options },
                plot, messageHandler));
        } else if ("options" in json) {
            // json.options is present, but json.style is not here
            // json.options may or may not be present here
            plot.renderer(Renderer.parseJSON(
                { "type" : "line", "options" : json.options },
                plot, messageHandler));
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
