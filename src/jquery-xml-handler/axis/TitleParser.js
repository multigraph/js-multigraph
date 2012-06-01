if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var attributes = ['position', 'anchor', 'angle'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Title[parse] = function (xml) {
            var title = new nsObj.Axis.Title();
            if (xml) {
                title.content(xml.text());
                title.position(xml.attr('position'));
                title.anchor(xml.attr('anchor'));
                title.angle(xml.attr('angle'));
            }
            return title;
        };
        
        nsObj.Axis.Title.prototype[serialize] = function () {
            var attributeStrings = [],
                output,
                i;

            attributeStrings.push('title');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            output = '<' + attributeStrings.join(' ');

            if (this.content() !== undefined && this.content() !== '') {
                output += '>' + this.content() + '</title>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
