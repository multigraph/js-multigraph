if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["type"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {

        nsObj.Plot.Renderer[parse] = function (xml) {
            var renderer;
            if (xml && xml.attr("type") !== undefined) {
                renderer = new nsObj.Plot.Renderer(xml.attr("type"));
                if (xml.find("option").length > 0) {
                    $.each(xml.find(">option"), function (i, e) {
                        renderer.options().add( nsObj.Plot.Renderer.Option[parse]($(e)) );
                    });
                }
            }
            return renderer;
        };

        nsObj.Plot.Renderer.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<renderer ',
                i;

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

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
