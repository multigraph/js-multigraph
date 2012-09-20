window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["angle"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.AxisTitle[parse] = function (xml) {
            var title = new ns.core.AxisTitle();
            if (xml) {
                title.content(xml.text());
                if (xml.attr("anchor") !== undefined) {
                    title.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("position") !== undefined) {
                    title.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
                if (xml.attr("angle") !== undefined) {
                    title.angle(parseFloat(xml.attr("angle")));
                }
            }
            return title;
        };
        
        ns.core.AxisTitle.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<title ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            if (this.anchor() !== undefined) {
                attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            }
            if (this.position() !== undefined) {
                attributeStrings.push('position="' + this.position().serialize() + '"');
            }

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
