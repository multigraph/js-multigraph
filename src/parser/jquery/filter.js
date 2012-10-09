window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["type"];

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Filter[parse] = function (xml) {
            var filter = new ns.core.Filter();
            if (xml) {
                if (xml.find("option").length > 0) {
                    window.multigraph.jQuery.each(xml.find(">option"), function (i, e) {
                        filter.options().add( ns.core.FilterOption[parse](window.multigraph.jQuery(e)) );
                    });
                }
                filter.type(xml.attr("type"));
            }
            return filter;
        };

        ns.core.Filter.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<filter ',
                i;

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

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
});
