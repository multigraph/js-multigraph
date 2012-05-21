var jQueryXMLHandler = jQueryXMLHandler ? jQueryXMLHandler : { 'mixinfuncs' : [] }
jQueryXMLHandler.mixinfuncs.push(function(parse,serialize) {

    Graph[parse] = function(xml) {
	var graph = new Graph();
	if (xml) {
	    // NOTE: 'OBJ.find(">TAG")' returns a list of JQuery objects corresponding to the immediate
	    // (1st generation) child nodes of OBJ corresponding to xml tag TAG
	    graph.axes = graph.axes.concat($.map(xml.find(">horizontalaxis"),
                    function (e) { return Axis[parse]('horizontal', $(e)); }));
	    graph.axes = graph.axes.concat($.map(xml.find(">verticalaxis"),
		    function (e) { return Axis[parse]('vertical',   $(e)); }));
	    graph.plots = graph.plots.concat($.map(xml.find(">plot"),
		    function (e) { return Plot[parse](graph, $(e)); }));
	}
	return graph;
    }

    Graph.prototype[serialize] = function() {
	var xmlstring = '<graph>';
	$.each(this.axes, function (i,axis) {
		xmlstring += axis[serialize]();
	    });
	$.each(this.plots, function (i,plot) {
		xmlstring += plot[serialize]();
	    });
	xmlstring += "</graph>";
	return xmlstring;
    };

});
