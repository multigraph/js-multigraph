window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse, serialize) {

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
                            throw new Error("The graph does not contain an axis with an id of: " + xml.find(">verticalaxis").attr("ref"));
                        }
                    }
                }

                if (xml.find("verticalaxis constant").length > 0) {
                    var constantValueString = xml.find("verticalaxis constant").attr("value");
                    if (constantValueString === undefined) {
                        throw new Error("foo foo");
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
                            throw new Error("The graph does not contain an axis with an id of: " + xml.find(">horizontalaxis").attr("ref"));
                        }
                    }
                }

                //if this is a DataPlot, parse variables
                if (plot instanceof DataPlot) {

                    //provide default horizontalaxis variable if not present in xml
                    if (xml.find("horizontalaxis variable").length === 0) {
                        plot.variable().add(null);
                    }

                    //populate axis variables from xml
                    if (xml.find("horizontalaxis variable, verticalaxis variable").length > 0) {
                        if (graph) {
                            window.multigraph.jQuery.each(xml.find("horizontalaxis variable, verticalaxis variable"), function (i,e) {
                                variable = graph.variableById( window.multigraph.jQuery(e).attr("ref") );
                                if (variable !== undefined) {
                                    plot.data( variable.data() );
                                    plot.variable().add(variable);
                                } else {
                                    throw new Error("The graph does not contain a variable with an id of: " + window.multigraph.jQuery(e).attr("ref"));
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

        ns.core.Plot.prototype[serialize] = function () {
            var output = '<plot>',
                axisHasContent,
                i;

            if (this.horizontalaxis() || (this.variable().size() > 0 && this.variable().at(0) !== null && this.variable().size() !==1)) {
                output += '<horizontalaxis';
                if (this.horizontalaxis() && this.horizontalaxis().id()) {
                    output += ' ref="' + this.horizontalaxis().id() + '"';
                }
                if (this.variable().size() > 0 && this.variable().at(0) !== null) {
                    output += '><variable ref="' + this.variable().at(0).id() + '"/></horizontalaxis>';
                } else {
                    output += '/>';
                }
            }

            if (this.verticalaxis() || this.variable().size() > 1) {
                output += '<verticalaxis';
                if (this.verticalaxis() && this.verticalaxis().id()) {
                    output += ' ref="' + this.verticalaxis().id() + '"';
                }
                axisHasContent = false;
                if (this instanceof ns.core.ConstantPlot) {
                    output += '<constant value="' + this.constantValue().toString() + '"/>';
                    axisHasContent = true;
                } else {
                    if (this.variable().size() > 1) {
                        output += '>';
                        for (i = 1; i < this.variable().size(); i++) {
                            output += '<variable ref="' + this.variable().at(i).id() + '"/>';
                        }
                        axisHasContent = true;
                    }
                }
                if (axisHasContent) {
                    output += '</verticalaxis>';
                } else {
                    output += '/>';
                }
            }

            if (this.legend()) {
                output += this.legend()[serialize]();
            }
            if (this.renderer()) {
                output += this.renderer()[serialize]();
            }
            if (this.filter()) {
                output += this.filter()[serialize]();
            }
            if (this.datatips()) {
                output += this.datatips()[serialize]();
            }

            output += '</plot>';

            return output;
        };

    });
});
