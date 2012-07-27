window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["position", "anchor", "angle"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.AxisTitle[parse] = function (xml) {
            var title = new ns.core.AxisTitle();
            if (xml) {
                title.content(xml.text());
                title.position(xml.attr("position"));
                title.anchor(xml.attr("anchor"));
                title.angle(window.multigraph.utilityFunctions.parseDoubleOrUndefined(xml.attr("angle")));
            }
            return title;
        };
        
        ns.core.AxisTitle.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<title ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            if (this.content() !== undefined && this.content() !== '') {
                output += '>' + this.content() + '</title>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
