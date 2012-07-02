if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['width', 'height', 'border', 'bordercolor'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Window[parse] = function (xml) {
            var window = new nsObj.Window();
            if (xml) {
                if (xml.attr('width') !== undefined) {
                    window.width(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr('width')));
                }
                if (xml.attr('height') !== undefined) {
                    window.height(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr('height')));
                }
                if (xml.attr('border') !== undefined) {
                    window.border(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr('border')));
                }

                (function (m) {
                    window.margin().set(m,m,m,m);
                }(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr('margin'))));

                (function (m) {
                    window.padding().set(m,m,m,m);
                }(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr('padding'))));

                window.bordercolor(xml.attr('bordercolor'));
            }
            return window;
        };
        
        nsObj.Window.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<window ',
                i;

            attributeStrings.push('margin="' + this.margin().top() + '"');
            attributeStrings.push('padding="' + this.padding().top() + '"');

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
