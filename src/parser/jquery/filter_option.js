window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["name", "value"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.FilterOption[parse] = function (xml) {
            var option = new ns.core.FilterOption();
            if (xml) {
                option.name(xml.attr("name"));
                option.value(xml.attr("value") === "" ? undefined : xml.attr("value"));
            }
            return option;
        };
        
        ns.core.FilterOption.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<option ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
