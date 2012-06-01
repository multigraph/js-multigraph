if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['visible', 'base', 'anchor', 'position', 'frame', 'color', 'bordercolor', 'opacity', 'border', 'rows', 'columns', 'cornerradius', 'padding'],
        Icon = ns.Legend.Icon;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Legend[parse] = function (xml) {
            var legend = new nsObj.Legend();
            if (xml) {
                legend.visible(xml.attr('visible'));
                legend.base(xml.attr('base'));
                legend.anchor(xml.attr('anchor'));
                legend.position(xml.attr('position'));
                legend.frame(xml.attr('frame'));
                legend.color(xml.attr('color'));
                legend.bordercolor(xml.attr('bordercolor'));
                legend.opacity(xml.attr('opacity'));
                legend.border(xml.attr('border'));
                legend.rows(xml.attr('rows'));
                legend.columns(xml.attr('columns'));
                legend.cornerradius(xml.attr('cornerradius'));
                legend.padding(xml.attr('padding'));
                if (xml.find('icon').length > 0) {
                    legend.icon(Icon[parse](xml.find("icon")));
                }
            }
            return legend;
        };

        nsObj.Legend.prototype[serialize] = function () {
            var attributeStrings = [],
                output,
                i;

            attributeStrings.push('legend');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            output = '<' + attributeStrings.join(' ');
            if (this.icon()) {
                output += '>' + this.icon()[serialize]() + '</legend>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
}(window.multigraph));
