window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Datatips[parse] = function (xml) {
            var datatips = new ns.core.Datatips(),
                $ = ns.jQuery,
                parseRGBColor    = ns.math.RGBColor.parse,
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseInteger     = utilityFunctions.parseInteger,
                parseString      = utilityFunctions.parseString,
                child;
            if (xml) {
                child = xml.find("variable");
                if (child.length > 0) {
                    $.each(child, function (i, e) {
                        datatips.variables().add( ns.core.DatatipsVariable[parse]($(e)) );
                    });
                }
                
                parseAttribute(xml.attr("format"),      datatips.format,      parseString);
                parseAttribute(xml.attr("bgcolor"),     datatips.bgcolor,     parseRGBColor);
                parseAttribute(xml.attr("bgalpha"),     datatips.bgalpha,     parseString);
                parseAttribute(xml.attr("border"),      datatips.border,      parseInteger);
                parseAttribute(xml.attr("bordercolor"), datatips.bordercolor, parseRGBColor);
                parseAttribute(xml.attr("pad"),         datatips.pad,         parseInteger);
            }
            return datatips;
        };

    });

});
