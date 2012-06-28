if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['width', 'height', 'border', 'padding', 'bordercolor'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Window[parse] = function (xml) {
            var window = new nsObj.Window();
            if (xml) {
                window.width(xml.attr('width'));
                window.height(xml.attr('height'));
                window.border(xml.attr('border'));

                (function (m) {
                    window.margin().set(m,m,m,m);
                })(parseInt(xml.attr('margin')));

                window.padding(xml.attr('padding'));
                window.bordercolor(xml.attr('bordercolor'));
            }
            return window;
        };
        
        nsObj.Window.prototype[serialize] = function () {
            var strings = [],
                i;
            strings.push('window');

            strings.push('margin="' + this.margin().top() + '"');

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    strings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }
            return '<' + strings.join(' ') + '/>';
        };

    });
}(window.multigraph));
