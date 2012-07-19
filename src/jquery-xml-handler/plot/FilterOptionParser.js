if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["name", "value"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Filter.Option[parse] = function (xml) {
            var option = new nsObj.Plot.Filter.Option();
            if (xml) {
                option.name(xml.attr("name"));
                option.value(xml.attr("value") === "" ? undefined : xml.attr("value"));
            }
            return option;
        };
        
        nsObj.Plot.Filter.Option.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<option ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
