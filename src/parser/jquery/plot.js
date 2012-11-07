window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Plot[parse] = function (xml, graph) {
            var DataPlot = window.multigraph.core.DataPlot,
                ConstantPlot = window.multigraph.core.ConstantPlot,
                DataValue = ns.core.DataValue,
                PlotLegend = ns.core.PlotLegend,
                Filter = ns.core.Filter,
                Renderer = ns.core.Renderer,
                Datatips = ns.core.Datatips,
                //plot = new DataPlot(),
                plot,
                haxis,
                vaxis,
                variable;
            if (xml) {

//populate verticalaxis from xml
                // same for verticalaxis property...
                vaxis = undefined;
                if (xml.find(">verticalaxis").length === 1 && xml.find(">verticalaxis").attr("ref") !== undefined) {
                    if (graph) {
                        vaxis = graph.axisById(xml.find(">verticalaxis").attr("ref"));
                        if (vaxis === undefined) {
                            throw new Error("Plot Vertical Axis Error: The graph does not contain an axis with an id of '" + xml.find(">verticalaxis").attr("ref") + "'");
                        }
                    }
                }

                if (xml.find("verticalaxis constant").length > 0) {
                    var constantValueString = xml.find("verticalaxis constant").attr("value");
                    if (constantValueString === undefined) {
                        throw new Error("Constant Plot Error: A 'value' attribute is needed to define a Constant Plot");
                    }
                    plot = new ConstantPlot(DataValue.parse(vaxis.type(), constantValueString));
                } else {
                    plot = new DataPlot();
                }


                plot.verticalaxis(vaxis);


//populate horizontalaxis from xml

                // the Plot's horizontalaxis property is a pointer to an Axis object (not just the
                // string id of the axis!)
                if (xml.find(">horizontalaxis").length === 1 && xml.find(">horizontalaxis").attr("ref") !== undefined) {
                    if (graph) {
                        haxis = graph.axisById(xml.find(">horizontalaxis").attr("ref"));
                        if (haxis !== undefined) {
                            plot.horizontalaxis(haxis);
                        } else {
                            throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + xml.find(">horizontalaxis").attr("ref") + "'");
                        }
                    }
                }

                //if this is a DataPlot, parse variables
                if (plot instanceof DataPlot) {

                    //provide default horizontalaxis variable if not present in xml
                    if (xml.find("horizontalaxis variable").length === 0) {
                        plot.variable().add(null);
                    }

                    // TODO: defer population of variables until normalizer has executed
                    //populate axis variables from xml
                    if (xml.find("horizontalaxis variable, verticalaxis variable").length > 0) {
                        if (graph) {
                            window.multigraph.jQuery.each(xml.find("horizontalaxis variable, verticalaxis variable"), function (i,e) {
                                variable = graph.variableById( window.multigraph.jQuery(e).attr("ref") );
                                if (variable !== undefined) {
                                    plot.data( variable.data() );
                                    plot.variable().add(variable);
                                } else {
                                    throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + window.multigraph.jQuery(e).attr("ref") + "'");
                                }
                            });
                        }
                    }
                }

//populate legend from xml
                if (xml.find("legend").length > 0) {
                    plot.legend(PlotLegend[parse](xml.find("legend"), plot));
                } else {
                    plot.legend(PlotLegend[parse](undefined, plot));
                }

//populate renderer from xml
                if (xml.find("renderer").length > 0) {
                    plot.renderer(Renderer[parse](xml.find("renderer"), plot));
                }

//populate filter from xml
                if (xml.find("filter").length > 0) {
                    plot.filter(Filter[parse](xml.find("filter")));
                }

//populate datatips from xml
                if (xml.find("datatips").length > 0) {
                    plot.datatips(Datatips[parse](xml.find("datatips")));
                }

            }
            return plot;
        };

    });

});
