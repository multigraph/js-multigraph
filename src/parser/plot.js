window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Plot[parse] = function (xml, graph, messageHandler) {
            var $            = ns.jQuery,
                core         = ns.core,
                DataPlot     = core.DataPlot,
                PlotLegend   = core.PlotLegend,
                plot,
                haxis,
                vaxis,
                variable,
                attr, child;
            if (xml) {

                // populate verticalaxis from xml
                child = xml.find(">verticalaxis");
                if (child.length === 1 && child.attr("ref") !== undefined) {
                    if (graph) {
                        vaxis = graph.axisById(child.attr("ref"));
                        if (vaxis === undefined) {
                            throw new Error("Plot Vertical Axis Error: The graph does not contain an axis with an id of '" + child.attr("ref") + "'");
                        }
                    }
                }

                child = xml.find("verticalaxis constant");
                if (child.length > 0) {
                    var constantValueString = child.attr("value");
                    if (constantValueString === undefined) {
                        throw new Error("Constant Plot Error: A 'value' attribute is needed to define a Constant Plot");
                    }
                    plot = new core.ConstantPlot(core.DataValue.parse(vaxis.type(), constantValueString));
                } else {
                    plot = new DataPlot();
                }

                plot.verticalaxis(vaxis);

                // populate horizontalaxis from xml
                child = xml.find(">horizontalaxis");
                if (child.length === 1 && child.attr("ref") !== undefined) {
                    if (graph) {
                        haxis = graph.axisById(child.attr("ref"));
                        if (haxis !== undefined) {
                            plot.horizontalaxis(haxis);
                        } else {
                            throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + child.attr("ref") + "'");
                        }
                    }
                }

                // if this is a DataPlot, parse variables
                if (plot instanceof DataPlot) {

                    // provide default horizontalaxis variable if not present in xml
                    if (xml.find("horizontalaxis variable").length === 0) {
                        plot.variable().add(null);
                    }

                    //TODO: defer population of variables until normalizer has executed
                    // populate axis variables from xml
                    child = xml.find("horizontalaxis variable, verticalaxis variable");
                    if (child.length > 0) {
                        if (graph) {
                            $.each(child, function (i, e) {
                                attr = $(e).attr("ref");
                                variable = graph.variableById( attr );
                                if (variable !== undefined) {
                                    plot.data( variable.data() );
                                    plot.variable().add(variable);
                                } else {
                                    throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + attr + "'");
                                }
                            });
                        }
                    }
                }

                // populate legend from xml
                child = xml.find("legend");
                if (child.length > 0) {
                    plot.legend(PlotLegend[parse](child, plot));
                } else {
                    plot.legend(PlotLegend[parse](undefined, plot));
                }

                // populate renderer from xml
                child = xml.find("renderer");
                if (child.length > 0) {
                    plot.renderer(core.Renderer[parse](child, plot, messageHandler));
                }

                // populate filter from xml
                child = xml.find("filter");
                if (child.length > 0) {
                    plot.filter(core.Filter[parse](child));
                }

                // populate datatips from xml
                child = xml.find("datatips");
                if (child.length > 0) {
                    plot.datatips(core.Datatips[parse](child));
                }

            }
            return plot;
        };

    });

});
