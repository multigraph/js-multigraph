if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var attributes = ['id', 'column', 'type', 'missingvalue', 'missingop'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Data.Variables.Variable[parse] = function (xml) {
            var variable = new nsObj.Data.Variables.Variable();
            if (xml) {
                variable.id(xml.attr('id'));
                variable.column(xml.attr('column'));
                variable.type(xml.attr('type'));
                variable.missingvalue(xml.attr('missingvalue'));
                variable.missingop(xml.attr('missingop'));
            }
            return variable;
        };
        
        nsObj.Data.Variables.Variable.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('variable');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
