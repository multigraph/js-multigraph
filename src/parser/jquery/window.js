window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["width", "height", "border"];
    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Window[parse] = function (xml) {
            //WARNING: do not declare a local var named "window" here; it masks the global 'window' object,
            //  which screws up the references to window.multigraph.* below!
            var w = new ns.core.Window();
            if (xml) {
                if (xml.attr("width") !== undefined) {
                    w.width(parseInt(xml.attr("width"), 10));
                }
                if (xml.attr("height") !== undefined) {
                    w.height(parseInt(xml.attr("height"), 10));
                }
                if (xml.attr("border") !== undefined) {
                    w.border(parseInt(xml.attr("border"), 10));
                }

                if (xml.attr("margin") !== undefined) {
                    (function (m) {
                        w.margin().set(m,m,m,m);
                    }(parseInt(xml.attr("margin"), 10)));
                }

                if (xml.attr("padding") !== undefined) {
                    (function (m) {
                        w.padding().set(m,m,m,m);
                    }(parseInt(xml.attr("padding"), 10)));
                }

                w.bordercolor(ns.math.RGBColor.parse(xml.attr("bordercolor")));
            }
            return w;
        };
        
        ns.core.Window.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<window ';

            attributeStrings.push('margin="' + this.margin().top() + '"');
            attributeStrings.push('padding="' + this.padding().top() + '"');
            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
