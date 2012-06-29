if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['border', 'bordercolor'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Plotarea[parse] = function (xml) {
            var plotarea = new nsObj.Plotarea();
            if (xml) {
                plotarea.margin().bottom(parseInt(xml.attr('marginbottom')));
                plotarea.margin().left(parseInt(xml.attr('marginleft')));
                plotarea.margin().top(parseInt(xml.attr('margintop')));
                plotarea.margin().right(parseInt(xml.attr('marginright')));
                plotarea.border(xml.attr('border'));
                plotarea.bordercolor(xml.attr('bordercolor'));
            }
            return plotarea;
        };
        
        nsObj.Plotarea.prototype[serialize] = function () {
            var strings = [],
                i;
            strings.push('plotarea');

            strings.push('margintop="' + this.margin().top() + '"');
            strings.push('marginleft="' + this.margin().left() + '"');
            strings.push('marginbottom="' + this.margin().bottom() + '"');
            strings.push('marginright="' + this.margin().right() + '"');

            for(i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    strings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            return '<' + strings.join(' ') + '/>';
        };

    });
}(window.multigraph));
