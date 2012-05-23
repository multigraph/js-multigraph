if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] }
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {

        nsObj.Graph[parse] = function(xml) {
	    var graph = new nsObj.Graph();
	    if (xml) {
	        // NOTE: 'OBJ.find(">TAG")' returns a list of JQuery objects corresponding to the immediate
	        // (1st generation) child nodes of OBJ corresponding to xml tag TAG
	        $.each(xml.find(">horizontalaxis"), function(i,e) {
		    graph.axes().add( nsObj.Axis[parse]('horizontal', $(e)) );
	        });
	        $.each(xml.find(">verticalaxis"), function(i,e) {
		    graph.axes().add( nsObj.Axis[parse]('vertical', $(e)) );
	        });
	        $.each(xml.find(">plot"), function(i,e) {
		    graph.plots().add( nsObj.Plot[parse](graph, $(e)) );
	        });
	    }
	    return graph;
        }

        nsObj.Graph.prototype[serialize] = function() {
	    var xmlstring = '<graph>';
	    $.each(this.axes(), function (i,axis) {
		xmlstring += axis[serialize]();
	    });
	    $.each(this.plots(), function (i,plot) {
		xmlstring += plot[serialize]();
	    });
	    xmlstring += "</graph>";
	    return xmlstring;
        };

    });

})(window.multigraph);

