if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Data.Values[parse] = function (xml) {
            var values = new nsObj.Data.Values();
            if (xml) {
                values.content(xml.text());
            }
            return values;
        };
        
        nsObj.Data.Values.prototype[serialize] = function () {
            var output;

            output = '<values';

            if (this.content() !== undefined && this.content() !== '') {
                output += '>' + this.content() + '</values>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
