if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var attributes = ['color', 'visible'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Grid[parse] = function (xml) {
            var grid = new nsObj.Axis.Grid();
            if (xml) {
                grid.color(xml.attr('color'));
                grid.visible(xml.attr('visible'));
            }
            return grid;
        };
        
        nsObj.Axis.Grid.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('grid');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
