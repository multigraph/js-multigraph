var jQueryXMLHandler = jQueryXMLHandler ? jQueryXMLHandler : { 'mixinfuncs' : [] }
jQueryXMLHandler.mixinfuncs.push(function(parse,serialize) {

    Plot[parse] = function(graph, xml) {
	var plot = new Plot();
	if (xml) {
	    // the Plot's horizontalaxis property is a pointer to an Axis object (not just the
	    // string id of the axis!)
	    plot.horizontalaxis = graph.axisById( xml.find(">horizontalaxis").attr('ref') );
	    // same for verticalaxis property...
	    plot.verticalaxis   = graph.axisById( xml.find(">verticalaxis").attr('ref') );
	}
	return plot;
    };

    Plot.prototype[serialize] = function() {
	return '<plot>' +
	'<horizontalaxis ref="'+this.horizontalaxis.id+'"/>' +
	'<verticalaxis ref="'+this.verticalaxis.id+'"/>' +
	'</plot>';
    }

});
