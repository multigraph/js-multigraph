if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['eventhandler'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.UI[parse] = function (xml) {
            var ui = new nsObj.UI();
            if (xml) {
                ui.eventhandler(xml.attr('eventhandler'));
            }
            return ui;
        };
        
        nsObj.UI.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('ui');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }
            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
