if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] }
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {

        nsObj.Axis[parse] = function(orientation, xml) {
	    var axis = new nsObj.Axis().orientation(orientation);
	    if (xml) {
	        axis.id(xml.attr('id'));
	        axis.min(xml.attr('min'));
	        axis.max(xml.attr('max'));
	    }
	    return axis;
        };

        nsObj.Axis.prototype[serialize] = function() {
	    return '<' + this.orientation() + 'axis id="' + this.id() + '" min="' +
	        this.min() + '" max="' + this.max() + '"/>';
        };

    });
})(window.multigraph);
