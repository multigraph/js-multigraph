if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['id', 'type', 'length', 'position', 'pregap', 'postgap', 'anchor', 'base', 'min', 'minoffset', 'minposition', 'max', 'maxoffset', 'maxposition', 'positionbase', 'color'],
        children = ['title', 'labels', 'grid', 'pan', 'zoom', 'binding', 'axiscontrols'];

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Axis[parse] = function(xml, orient) {
            var orientation = $(xml).prop('tagName').toLowerCase().replace('axis', ''),
                axis = new nsObj.Axis().orientation(orientation),
                childModels = [
                    new nsObj.Axis.Title(),
                    new nsObj.Axis.Labels(),
                    new nsObj.Axis.Grid(),
                    new nsObj.Axis.Pan(),
                    new nsObj.Axis.Zoom(),
                    new nsObj.Axis.Binding(),
                    new nsObj.Axis.AxisControls()
                ],
                i;

            if (xml) {
/*                    
                for (i = 0; i < children.length; i++) {
                    console.log(xml.find(children[i]));
                    if (xml.find(children[i])) {
                        axis[children[i]]([childModels[i]][parse](xml.find([children[i]])));
                    }
                }
*/

                axis.id(xml.attr('id'));
                axis.type(xml.attr('type'));
                axis.position(xml.attr('position'));
                axis.pregap(xml.attr('pregap'));
                axis.postgap(xml.attr('postgap'));
                axis.anchor(xml.attr('anchor'));
                axis.base(xml.attr('base'));
                axis.min(xml.attr('min'));
                axis.minoffset(xml.attr('minoffset'));
                axis.minposition(xml.attr('minposition'));
                axis.max(xml.attr('max'));
                axis.maxoffset(xml.attr('maxoffset'));
                axis.maxposition(xml.attr('maxposition'));
                axis.positionbase(xml.attr('positionbase'));
                axis.color(xml.attr('color'));
            }
            return axis;
        };
        
        nsObj.Axis.prototype[serialize] = function() {
            var attributeStrings = [],
                childStrings = [],
                output,
                i;
            attributeStrings.push(this.orientation() + 'axis');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

/*
            for (i = 0; i < children.length; i++) {
                if (this[children[i]]()) {
                    childStrings.push(this[children[i]]()[serialize]());
                }
            }
*/
            output = '<' + attributeStrings.join(' ');

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '<' + this.orientation() + 'axis>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
