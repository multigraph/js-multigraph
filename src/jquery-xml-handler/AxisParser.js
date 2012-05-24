if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";
    
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
            var attributeStrings = [];
            attributeStrings.push(this.orientation() + 'axis');
            if (this.id() !== undefined) {
                attributeStrings.push('id="' + this.id() + '"');
            }
            if (this.type() !== undefined) {
                attributeStrings.push('type="' + this.type() + '"');
            }
            if (this.min() !== undefined) {
                attributeStrings.push('min="' + this.min() + '"');
            }
            if (this.max() !== undefined) {
                attributeStrings.push('max="' + this.max() + '"');
            }
            if (this.anchor() !== undefined) {
                attributeStrings.push('anchor="' + this.anchor() + '"');
            }
            if (this.base() !== undefined) {
                attributeStrings.push('base="' + this.base() + '"');
            }
            if (this.position() !== undefined) {
                attributeStrings.push('position="' + this.position() + '"');
            }
            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
