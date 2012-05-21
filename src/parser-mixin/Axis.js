var jQueryXMLHandler = jQueryXMLHandler ? jQueryXMLHandler : { 'mixinfuncs' : [] }
jQueryXMLHandler.mixinfuncs.push(function(parse,serialize) {

    var Axis = window.multigraph.Axis;

    Axis[parse] = function(orientation, xml) {
	console.log(xml.attr('id'));
	var axis = new Axis().orientation(orientation);
	if (xml) {
	    axis.id(xml.attr('id'));
	    axis.min(xml.attr('min'));
	    axis.max(xml.attr('max'));
	}
	return axis;
    };

    Axis.prototype[serialize] = function() {
	return '<' + this.orientation() + 'axis id="' + this.id() + '" min="' +
	this.min() + '" max="' + this.max() + '"/>';
    };

});
