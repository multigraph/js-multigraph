if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLMixin.add(function(nsObj, parse, serialize) {

        nsObj.Plot[parse] = function(xml, graph) {
            var Plot = window.multigraph.Plot,
                Legend = nsObj.Plot.Legend,
                Filter = nsObj.Plot.Filter,
                Renderer = nsObj.Plot.Renderer,
                Datatips = nsObj.Plot.Datatips,
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

                if (xml.find("variable").length > 0) {
                    if (graph) {
                        $.each(xml.find("variable"), function (i,e) {
                            variable = graph.variableById( $(e).attr("ref") );
                            if (variable !== undefined) {
                                plot.variable().add(variable);
                            } else {
                                throw new Error("The graph does not contain a variable with an id of: " + $(e).attr("ref"));
                            }
                        });
                    }
                }

                if (xml.find("legend").length > 0) {
                    plot.legend(Legend[parse](xml.find("legend")));
                }
                if (xml.find("renderer").length > 0) {
                    plot.renderer(Renderer[parse](xml.find("renderer")));
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

        nsObj.Plot.prototype[serialize] = function() {
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
}(window.multigraph));
