window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["type"];

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Renderer[parse] = function (xml, plot) {
            var renderer;
            if (xml && xml.attr("type") !== undefined) {
                //TODO: change this later to create appropriate renderer subclass based on render type:
                renderer = new ns.core.PointlineRenderer();
                renderer.type(xml.attr("type"));
                if (plot) {
                    //TODO: horiz and vert axis should be required??  Currently, without the above 'if', some tests fail.
                    renderer.horizontalaxis( plot.horizontalaxis() );
                    renderer.verticalaxis( plot.verticalaxis() );
                }
                if (xml.find("option").length > 0) {
                    $.each(xml.find(">option"), function (i, e) {
                        renderer.options().add( ns.core.RendererOption[parse]($(e)) );
                    });
                }
            }
            return renderer;
        };

        ns.core.Renderer.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<renderer ',
                i;

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

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
});
