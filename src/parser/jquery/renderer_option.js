window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["name", "value", "min", "max"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.RendererOption[parse] = function (xml) {
            var option;
            if (xml && xml.attr("name") && xml.attr("value")) {
                option = new ns.core.RendererOption(xml.attr("name"), xml.attr("value"));
                option.min(xml.attr("min"));
                option.max(xml.attr("max"));
            }
            return option;
        };
        
        ns.core.RendererOption.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<option ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
