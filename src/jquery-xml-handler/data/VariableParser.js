if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['id', 'column', 'type', 'missingvalue', 'missingop'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Data.Variables.Variable[parse] = function (xml) {
            var variable;
            if (xml && xml.attr('id')) {
                variable = new nsObj.Data.Variables.Variable(xml.attr('id'));
                variable.column(xml.attr('column'));
                variable.type(xml.attr('type'));
                variable.missingvalue(xml.attr('missingvalue'));
                variable.missingop(xml.attr('missingop'));
            }
            return variable;
        };
        
        nsObj.Data.Variables.Variable.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variable ',
                i;

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
