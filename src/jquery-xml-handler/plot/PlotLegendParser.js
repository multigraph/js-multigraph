if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['visible', 'label'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Legend[parse] = function (xml) {
            var legend = new nsObj.Plot.Legend();
            if (xml) {
                legend.visible(xml.attr('visible'));
                legend.label(xml.attr('label'));
            }
            return legend;
        };
        
        nsObj.Plot.Legend.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('legend');

            for(i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
