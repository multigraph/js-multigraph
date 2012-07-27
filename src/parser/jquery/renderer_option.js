if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["name", "value", "min", "max"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Renderer.Option[parse] = function (xml) {
            var option;
            if (xml && xml.attr("name") && xml.attr("value")) {
                option = new nsObj.Plot.Renderer.Option(xml.attr("name"), xml.attr("value"));
                option.min(xml.attr("min"));
                option.max(xml.attr("max"));
            }
            return option;
        };
        
        nsObj.Plot.Renderer.Option.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<option ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
