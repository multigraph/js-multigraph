if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["width", "height", "border"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Window[parse] = function (xml) {
            var window = new nsObj.Window();
            if (xml) {
                window.width(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("width")));
                window.height(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("height")));
                window.border(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));

                (function (m) {
                    window.margin().set(m,m,m,m);
                }(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("margin"))));

                (function (m) {
                    window.padding().set(m,m,m,m);
                }(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("padding"))));

                window.bordercolor(nsObj.math.RGBColor.parse(xml.attr("bordercolor")));
            }
            return window;
        };
        
        nsObj.Window.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<window ';

            attributeStrings.push('margin="' + this.margin().top() + '"');
            attributeStrings.push('padding="' + this.padding().top() + '"');
            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
