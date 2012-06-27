if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['name', 'value'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Filter.Option[parse] = function (xml) {
            var option = new nsObj.Plot.Filter.Option();
            if (xml) {
                option.name(xml.attr('name'));
                option.value(xml.attr('value') === '' ? undefined : xml.attr('value'));
            }
            return option;
        };
        
        nsObj.Plot.Filter.Option.prototype[serialize] = function () {
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
