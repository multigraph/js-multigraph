if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['id', 'type', 'min', 'max', 'anchor', 'base', 'position'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Axis[parse] = function(orientation, xml) {
            var axis = new nsObj.Axis().orientation(orientation);
            if (xml) {
                axis.id(xml.attr('id'));
                axis.type(xml.attr('type'));
                axis.min(xml.attr('min'));
                axis.max(xml.attr('max'));
                axis.anchor(xml.attr('anchor'));
                axis.base(xml.attr('base'));
                axis.position(xml.attr('position'));
            }
            return axis;
        };
        
        nsObj.Axis.prototype[serialize] = function() {
            var attributeStrings = [],
                i;
            attributeStrings.push(this.orientation() + 'axis');

            for(i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
