if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var attributes = ['visible'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.AxisControls[parse] = function (xml) {
            var axiscontrols = new nsObj.Axis.AxisControls();
            if (xml) {
                axiscontrols.visible(xml.attr('visible'));
            }
            return axiscontrols;
        };
        
        nsObj.Axis.AxisControls.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('axiscontrols');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
