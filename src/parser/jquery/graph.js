window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function(ns, parse, serialize) {

        ns.core.Graph[parse] = function(xml) {
            var graph = new ns.core.Graph();
            if (xml) {
                // NOTE: 'OBJ.find(">TAG")' returns a list of JQuery objects corresponding to the immediate
                // (1st generation) child nodes of OBJ corresponding to xml tag TAG
                if (xml.find(">window").length > 0) {
                    graph.window( ns.core.Window[parse](xml.find(">window")) );
                } else {
                    graph.window( ns.core.Window[parse]() );
                }

                if (xml.find(">ui").length > 0) {
                    graph.ui( ns.core.UI[parse](xml.find(">ui")) );
                }
                if (xml.find(">networkmonitor").length > 0) {
                    graph.networkmonitor( ns.core.NetworkMonitor[parse](xml.find(">networkmonitor")) );
                }
                if (xml.find(">debugger").length > 0) {
                    graph.Debugger( ns.core.Debugger[parse](xml.find(">debugger")) );
                }
                if (xml.find(">legend").length > 0) {
                    graph.legend( ns.core.Legend[parse](xml.find(">legend")) );
                }
                if (xml.find(">background").length > 0) {
                    graph.background( ns.core.Background[parse](xml.find(">background")) );
                }
                if (xml.find(">plotarea").length > 0) {
                    graph.plotarea( ns.core.Plotarea[parse](xml.find(">plotarea")) );
                }
                if (xml.find(">title").length > 0) {
                    graph.title( ns.core.Title[parse](xml.find(">title")) );
                }
                $.each(xml.find(">horizontalaxis"), function (i,e) {
                    graph.axes().add( ns.core.Axis[parse]($(e)) );
                });
                $.each(xml.find(">verticalaxis"), function (i,e) {
                    graph.axes().add( ns.core.Axis[parse]($(e)) );
                });
                $.each(xml.find(">data"), function (i,e) {
                    graph.data().add( ns.core.Data[parse]($(e)) );
                });
                $.each(xml.find(">plot"), function (i,e) {
                    graph.plots().add( ns.core.Plot[parse]($(e), graph) );
                });
                graph.postParse();
            }
            return graph;
        };

        ns.core.Graph.prototype[serialize] = function () {
            var xmlstring = '<graph>',
                i;
            if (this.window()) {
                xmlstring += this.window()[serialize]();
            }
            if (this.ui()) {
                xmlstring += this.ui()[serialize]();
            }
            if (this.networkmonitor()) {
                xmlstring += this.networkmonitor()[serialize]();
            }
            if (this.Debugger()) {
                xmlstring += this.Debugger()[serialize]();
            }
            if (this.legend()) {
                xmlstring += this.legend()[serialize]();
            }
            if (this.background()) {
                xmlstring += this.background()[serialize]();
            }
            if (this.plotarea()) {
                xmlstring += this.plotarea()[serialize]();
            }
            if (this.title()) {
                xmlstring += this.title()[serialize]();
            }
            for (i = 0; i < this.axes().size(); ++i) {
                xmlstring += this.axes().at(i)[serialize]();
            }
            for (i = 0; i < this.plots().size(); ++i) {
                xmlstring += this.plots().at(i)[serialize]();
            }
            for (i = 0; i < this.data().size(); ++i) {
                xmlstring += this.data().at(i)[serialize]();
            }

            xmlstring += "</graph>";
            return xmlstring;
        };

    });

});

