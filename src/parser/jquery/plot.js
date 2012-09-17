window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function(ns, parse, serialize) {

        ns.core.Plot[parse] = function(xml, graph) {
            var Plot = window.multigraph.core.Plot,
                PlotLegend = ns.core.PlotLegend,
                Filter = ns.core.Filter,
                Renderer = ns.core.Renderer,
                Datatips = ns.core.Datatips,
                plot = new Plot(),
                axis,
                variable;
            if (xml) {
                // the Plot's horizontalaxis property is a pointer to an Axis object (not just the
                // string id of the axis!)
                if (xml.find(">horizontalaxis").length === 1 && xml.find(">horizontalaxis").attr("ref") !== undefined) {
                    if (graph) {
                        axis = graph.axisById(xml.find(">horizontalaxis").attr("ref"));
                        if (axis !== undefined) {
                            plot.horizontalaxis(axis);
                        } else {
                            throw new Error("The graph does not contain an axis with an id of: " + xml.find(">horizontalaxis").attr("ref"));
                        }
                    }
                }
                // same for verticalaxis property...
                if (xml.find(">verticalaxis").length === 1 && xml.find(">verticalaxis").attr("ref") !== undefined) {
                    if (graph) {
                        axis = graph.axisById(xml.find(">verticalaxis").attr("ref"));
                        if (axis !== undefined) {
                            plot.verticalaxis(axis);
                        } else {
                            throw new Error("The graph does not contain an axis with an id of: " + xml.find(">verticalaxis").attr("ref"));
                        }
                    }
                }

                if (xml.find("horizontalaxis variable, verticalaxis variable").length > 0) {
                    if (graph) {
                        $.each(xml.find("horizontalaxis variable, verticalaxis variable"), function (i,e) {
                            variable = graph.variableById( $(e).attr("ref") );
                            if (variable !== undefined) {
                                plot.data( variable.data() );
                                plot.variable().add(variable);
                            } else {
                                throw new Error("The graph does not contain a variable with an id of: " + $(e).attr("ref"));
                            }
                        });
                    }
                }

                // TODO: Move this bit of code into a post-parse default insertion mechanism.
                // TODO: modify this code so that it only sucks in the proper number of variables
                //       ie. 2 for pointline, bar, fill, 3 for error's, etc
                var variableCount = 2;
                if (graph) { 
                    if (plot.variable().size() < variableCount) {
                        var flag,
                        i, j, r;
                        for (i = 0; i < graph.data().size(); i++) {
                            for (j = 0; j < graph.data().at(i).columns().size(); j++) {
                                variable = graph.data().at(i).columns().at(j);
                                flag = true;
                                for (r = 0; r < plot.variable().size(); r++) {
                                    if (variable === plot.variable().at(r)) {
                                        flag = false;
                                        break;
                                    }
                                }
                                if (flag === true) {
                                    plot.variable().add(variable);
                                }
                                if (plot.variable().size() >= variableCount) {
                                    break;
                                }
                            }
                            if (plot.variable().size() >= variableCount) {
                                break;
                            }
                        }
                    }
                }

                if (xml.find("legend").length > 0) {
                    plot.legend(PlotLegend[parse](xml.find("legend"), plot));
                } else {
                    plot.legend(PlotLegend[parse](undefined, plot));
                }
                if (xml.find("renderer").length > 0) {
                    plot.renderer(Renderer[parse](xml.find("renderer"), plot));
                }
                if (xml.find("filter").length > 0) {
                    plot.filter(Filter[parse](xml.find("filter")));
                }
                if (xml.find("datatips").length > 0) {
                    plot.datatips(Datatips[parse](xml.find("datatips")));
                }

            }
            return plot;
        };

        ns.core.Plot.prototype[serialize] = function() {
            var output = '<plot>',
                i;

            if (this.horizontalaxis() || this.variable().size() > 0) {
                output += '<horizontalaxis';
                if (this.horizontalaxis() && this.horizontalaxis().id()) {
                    output += ' ref="' + this.horizontalaxis().id() + '"';
                }
                if (this.variable().size() > 0) {
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
                if (this.variable().size() > 1) {
                    output += '>';
                    for (i = 1; i < this.variable().size(); i++) {
                        output += '<variable ref="' + this.variable().at(i).id() + '"/>';
                    }
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
