window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["type"];

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Renderer[parse] = function (xml, plot) {
            var rendererType,
                renderer,
                opt;
            if (xml && xml.attr("type") !== undefined) {
                rendererType = xml.attr("type");
                renderer = ns.core.Renderer.create(rendererType);
                if (!renderer) {
                    throw new Error("unknown renderer type '"+rendererType+"'");
                }
                renderer.plot(plot);
                if (xml.find("option").length > 0) {
                    $.each(xml.find(">option"), function (i, e) {
			var opt = ns.core.RendererOption[parse]($(e));
                        renderer.options().add( opt );
                        if (plot && plot.verticalaxis()) {
                            renderer.setOptionFromString(opt.name(),
                                                         opt.value(),
                                                         opt.min(),
                                                         opt.max());
                        }
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
