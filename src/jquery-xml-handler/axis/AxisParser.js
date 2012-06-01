if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['id', 'type', 'length', 'position', 'pregap', 'postgap', 'anchor', 'base', 'min', 'minoffset', 'minposition', 'max', 'maxoffset', 'maxposition', 'positionbase', 'color', 'tickmin', 'tickmax', 'highlightstyle', 'linewidth'],
        children = ['title', 'labels', 'grid', 'pan', 'zoom', 'binding', 'axiscontrols'];

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Axis[parse] = function(xml, orient) {
            var orientation = $(xml).prop('tagName').toLowerCase().replace('axis', ''),
                axis = new nsObj.Axis().orientation(orientation),
                childModels = ['Title', 'Labels', 'Grid', 'Pan', 'Zoom', 'Binding', 'AxisControls'],
                i;

            if (xml) {
                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0) {
                        axis[children[i]](ns.Axis[childModels[i]][parse](xml.find(children[i])));
                    }
                }

                axis.id(xml.attr('id'));
                axis.type(xml.attr('type'));
                axis.length(xml.attr('length'));
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
                axis.tickmin(xml.attr('tickmin'));
                axis.tickmax(xml.attr('tickmax'));
                axis.highlightstyle(xml.attr('highlightstyle'));
                axis.linewidth(xml.attr('linewidth'));
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

            for (i = 0; i < children.length; i++) {
                if (this[children[i]]()) {
                    childStrings.push(this[children[i]]()[serialize]());
                }
            }

            output = '<' + attributeStrings.join(' ');

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</' + this.orientation() + 'axis>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
