if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {

        nsObj.Graph[parse] = function(xml) {
            var graph = new nsObj.Graph();
            if (xml) {
                // NOTE: 'OBJ.find(">TAG")' returns a list of JQuery objects corresponding to the immediate
                // (1st generation) child nodes of OBJ corresponding to xml tag TAG
                if (xml.find('>window').length > 0) {
                    graph.window( nsObj.Window[parse](xml.find('>window')) );
                }
                if (xml.find('>ui').length > 0) {
                    graph.ui( nsObj.UI[parse](xml.find('>ui')) );
                }
                if (xml.find('>networkmonitor').length > 0) {
                    graph.networkmonitor( nsObj.NetworkMonitor[parse](xml.find('>networkmonitor')) );
                }
                if (xml.find('>debugger').length > 0) {
                    graph.Debugger( nsObj.Debugger[parse](xml.find('>debugger')) );
                }
                if (xml.find('>legend').length > 0) {
                    graph.legend( nsObj.Legend[parse](xml.find('>legend')) );
                }
                if (xml.find('>background').length > 0) {
                    graph.background( nsObj.Background[parse](xml.find('>background')) );
                }
                if (xml.find('>plotarea').length > 0) {
                    graph.plotarea( nsObj.Plotarea[parse](xml.find('>plotarea')) );
                }
                if (xml.find('>title').length > 0) {
                    graph.title( nsObj.Title[parse](xml.find('>title')) );
                }
                $.each(xml.find(">horizontalaxis"), function (i,e) {
                    graph.axes().add( nsObj.Axis[parse]($(e)) );
                });
                $.each(xml.find(">verticalaxis"), function (i,e) {
                    graph.axes().add( nsObj.Axis[parse]($(e)) );
                });
                $.each(xml.find(">plot"), function (i,e) {
                    graph.plots().add( nsObj.Plot[parse]($(e), graph) );
                });
                $.each(xml.find(">data"), function (i,e) {
                    graph.data().add( nsObj.Data[parse]($(e)) );
                });
            }
            return graph;
        };

        nsObj.Graph.prototype[serialize] = function () {
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

}(window.multigraph));

