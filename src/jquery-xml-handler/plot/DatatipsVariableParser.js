if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['format'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Datatips.Variable[parse] = function (xml) {
            var variable = new nsObj.Plot.Datatips.Variable();
            if (xml) {
                variable.format(xml.attr('format'));
            }
            return variable;
        };
        
        nsObj.Plot.Datatips.Variable.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('variable');

            for(i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
