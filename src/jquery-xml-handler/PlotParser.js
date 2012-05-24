if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {

        var Plot = window.multigraph.Plot;

        nsObj.Plot[parse] = function(graph, xml) {
            var plot = new nsObj.Plot();
            if (xml) {
                // the Plot's horizontalaxis property is a pointer to an Axis object (not just the
                // string id of the axis!)
                plot.horizontalaxis(graph.axisById( xml.find(">horizontalaxis").attr('ref') ));
                // same for verticalaxis property...
                plot.verticalaxis(graph.axisById( xml.find(">verticalaxis").attr('ref') ));
            }
            return plot;
        };

        nsObj.Plot.prototype[serialize] = function() {
            return '<plot>' +
                '<horizontalaxis ref="'+this.horizontalaxis.id()+'"/>' +
                '<verticalaxis ref="'+this.verticalaxis.id()+'"/>' +
                '</plot>';
        };

    });
}(window.multigraph));
