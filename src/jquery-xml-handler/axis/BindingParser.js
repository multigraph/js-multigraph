if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var attributes = ['id', 'min', 'max'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Binding[parse] = function (xml) {
            var binding = new nsObj.Axis.Binding();
            if (xml) {
                binding.id(xml.attr('id'));
                binding.min(xml.attr('min'));
                binding.max(xml.attr('max'));
            }
            return binding;
        };
        
        nsObj.Axis.Binding.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('binding');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
