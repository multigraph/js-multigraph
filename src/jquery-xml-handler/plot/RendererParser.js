if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['type'],
        Option = ns.Plot.Renderer.Option,
        i;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Plot.Renderer[parse] = function (xml) {
            var renderer = new nsObj.Plot.Renderer();
            if (xml) {
                $.each(xml.find(">option"), function(i,e) {
                    renderer.options().add( nsObj.Plot.Renderer.Option[parse]($(e)) );
                });
                renderer.type(xml.attr('type'));
            }
            return renderer;
        };

        nsObj.Plot.Renderer.prototype[serialize] = function () {
            var attributeStrings = [],
                output,
                i;

            attributeStrings.push('renderer');

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
                output += '</renderer>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
}(window.multigraph));
