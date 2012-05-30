if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['format', 'bgcolor', 'bgalpha', 'border', 'bordercolor', 'pad'],
        Variable = ns.Plot.Datatips.Variable;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Plot.Datatips[parse] = function (xml) {
            var datatips = new nsObj.Plot.Datatips();
            if (xml) {
                $.each(xml.find("variable"), function(i,e) {
                    datatips.variables().add( nsObj.Plot.Datatips.Variable[parse]($(e)) );
                });
                datatips.format(xml.attr('format'));
                datatips.bgcolor(xml.attr('bgcolor'));
                datatips.bgalpha(xml.attr('bgalpha'));
                datatips.border(xml.attr('border'));
                datatips.bordercolor(xml.attr('bordercolor'));
                datatips.pad(xml.attr('pad'));

            }
            return datatips;
        };

        nsObj.Plot.Datatips.prototype[serialize] = function () {
            var attributeStrings = [],
                output,
                i;

            attributeStrings.push('datatips');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            output = '<' + attributeStrings.join(' ');
            if (this.variables().size() !== 0) {
                output += '>';
                for (i = 0; i < this.variables().size(); i++) {
                    output += this.variables().at(i)[serialize]();
                }
                output += '</datatips>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
}(window.multigraph));
