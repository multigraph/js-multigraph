if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";
    
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Plotarea[parse] = function(xml) {
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
        
        nsObj.Plotarea.prototype[serialize] = function() {
            var attributeStrings = [];
            attributeStrings.push('plotarea');
            if (this.marginbottom() !== undefined) {
                attributeStrings.push('marginbottom="' + this.marginbottom() + '"');
            }
            if (this.marginleft() !== undefined) {
                attributeStrings.push('marginleft="' + this.marginleft() + '"');
            }
            if (this.margintop() !== undefined) {
                attributeStrings.push('margintop="' + this.margintop() + '"');
            }
            if (this.marginright() !== undefined) {
                attributeStrings.push('marginright="' + this.marginright() + '"');
            }
            if (this.border() !== undefined) {
                attributeStrings.push('border="' + this.border() + '"');
            }
            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor() + '"');
            }
            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
