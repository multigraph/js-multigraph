if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['name', 'value'];
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
                output = '<option ',
                i;

            for(i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
