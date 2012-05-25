if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['marginbottom', 'marginleft', 'margintop', 'marginright', 'border', 'bordercolor'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Plotarea[parse] = function (xml) {
            var plotarea = new nsObj.Plotarea();
            if (xml) {
                plotarea.marginbottom(xml.attr('marginbottom'));
                plotarea.marginleft(xml.attr('marginleft'));
                plotarea.margintop(xml.attr('margintop'));
                plotarea.marginright(xml.attr('marginright'));
                plotarea.border(xml.attr('border'));
                plotarea.bordercolor(xml.attr('bordercolor'));
            }
            return plotarea;
        };
        
        nsObj.Plotarea.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('plotarea');

            for(i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
