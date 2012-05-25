if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['width', 'height', 'border', 'margin', 'padding', 'bordercolor'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Window[parse] = function (xml) {
            var window = new nsObj.Window();
            if (xml) {
                window.width(xml.attr('width'));
                window.height(xml.attr('height'));
                window.border(xml.attr('border'));
                window.margin(xml.attr('margin'));
                window.padding(xml.attr('padding'));
                window.bordercolor(xml.attr('bordercolor'));
            }
            return window;
        };
        
        nsObj.Window.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('window');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }
            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
