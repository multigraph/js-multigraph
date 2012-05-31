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

                if (xml.find('legend')) {
                    plot.legend(Legend[parse](xml.find('legend')));
                }
                if (xml.find('renderer')) {
                    plot.renderer(Renderer[parse](xml.find("renderer")));
                }
                if (xml.find('filter')) {
                    plot.filter(Filter[parse](xml.find("filter")));
                }
                if (xml.find('datatips')) {
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

            legendString = this.legend()[serialize]();
            if (legendString !== '<legend/>') {
                output += legendString;
            }
            rendererString = this.renderer()[serialize]();
            if (rendererString !== '<renderer/>') {
                output += rendererString;
            }
            filterString = this.filter()[serialize]();
            if (filterString !== '<filter/>') {
                output += filterString;
            }
            datatipsString = this.datatips()[serialize]();
            if (datatipsString !== '<datatips/>') {
                output += datatipsString;
            }

            output += '</plot>';

            return output;
        };

    });
}(window.multigraph));
