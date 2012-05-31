if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['type'],
        Option = ns.Plot.Filter.Option;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Plot.Filter[parse] = function (xml) {
            var filter = new nsObj.Plot.Filter();
            if (xml) {
                $.each(xml.find(">option"), function(i,e) {
                    filter.options().add( nsObj.Plot.Filter.Option[parse]($(e)) );
                });
                filter.type(xml.attr('type'));
            }
            return filter;
        };

        nsObj.Plot.Filter.prototype[serialize] = function () {
            var attributeStrings = [],
                output,
                i;

            attributeStrings.push('filter');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            output = '<' + attributeStrings.join(' ');

            if (this.options().size() !== 0) {
                output += '>';
                for (i = 0; i < this.options().size(); i++) {
                    output += this.options().at(i)[serialize]();
                }
                output += '</filter>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
}(window.multigraph));
