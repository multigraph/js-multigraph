if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['type'],
        Option = ns.Plot.Filter.Option;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Plot.Filter[parse] = function (xml) {
            var filter = new nsObj.Plot.Filter();
            if (xml) {
                if (xml.find('option').length > 0) {
                    $.each(xml.find(">option"), function (i, e) {
                        filter.options().add( nsObj.Plot.Filter.Option[parse]($(e)) );
                    });
                }
                filter.type(xml.attr('type'));
            }
            return filter;
        };

        nsObj.Plot.Filter.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<filter ',
                i;

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ');

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
