if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {

        var Plot = window.multigraph.Plot,
            Legend = nsObj.Plot.Legend,
            Filter = nsObj.Plot.Filter,
            Renderer = nsObj.Plot.Renderer,
            Datatips = nsObj.Plot.Datatips;

        nsObj.Plot[parse] = function(xml, graph) {
            var plot = new nsObj.Plot();
            if (xml) {
                // the Plot's horizontalaxis property is a pointer to an Axis object (not just the
                // string id of the axis!)
//                plot.horizontalaxis(graph.axisById( xml.find(">horizontalaxis").attr('ref') ));
                // same for verticalaxis property...
//                plot.verticalaxis(graph.axisById( xml.find(">verticalaxis").attr('ref') ));

                if (xml.find('legend').length > 0) {
                    plot.legend(Legend[parse](xml.find('legend')));
                }
                if (xml.find('renderer').length > 0) {
                    plot.renderer(Renderer[parse](xml.find("renderer")));
                }
                if (xml.find('filter').length > 0) {
                    plot.filter(Filter[parse](xml.find("filter")));
                }
                if (xml.find('datatips').length > 0) {
                    plot.datatips(Datatips[parse](xml.find("datatips")));
                }

            }
            return plot;
        };

        nsObj.Plot.prototype[serialize] = function() {
            var output = '<plot>',
            legendString,
            rendererString,
            filterString,
            datatipsString;

            if (this.horizontalaxis() && this.horizontalaxis().id()) {
                output += '<horizontalaxis ref="' + this.horizontalaxis().id()+ '"/>';
            }
            if (this.verticalaxis() && this.verticalaxis().id()) {
                output += '<verticalaxis ref="' + this.verticalaxis().id()+ '"/>';
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
