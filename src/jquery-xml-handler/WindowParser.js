if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";
    
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Window[parse] = function(xml) {
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
        
        nsObj.Window.prototype[serialize] = function() {
            var attributeStrings = [];
            attributeStrings.push('window');
            if (this.width() !== undefined) {
                attributeStrings.push('width="' + this.width() + '"');
            }
            if (this.height() !== undefined) {
                attributeStrings.push('height="' + this.height() + '"');
            }
            if (this.border() !== undefined) {
                attributeStrings.push('border="' + this.border() + '"');
            }
            if (this.margin() !== undefined) {
                attributeStrings.push('margin="' + this.margin() + '"');
            }
            if (this.padding() !== undefined) {
                attributeStrings.push('padding="' + this.padding() + '"');
            }
            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor() + '"');
            }
            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
