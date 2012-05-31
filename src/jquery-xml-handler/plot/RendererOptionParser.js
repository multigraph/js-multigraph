if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['name', 'value', 'min', 'max'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Renderer.Option[parse] = function (xml) {
            var option = new nsObj.Plot.Renderer.Option();
            if (xml) {
                option.name(xml.attr('name'));
                option.value(xml.attr('value'));
                option.min(xml.attr('min'));
                option.max(xml.attr('max'));
            }
            return option;
        };
        
        nsObj.Plot.Renderer.Option.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('option');

            for(i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
