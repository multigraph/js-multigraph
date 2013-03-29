window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Datatips[parse] = function (xml) {
            var datatips = new ns.core.Datatips(),
                $ = ns.jQuery,
                RGBColor = ns.math.RGBColor,
                attr, child;
            if (xml) {
                child = xml.find("variable");
                if (child.length > 0) {
                    $.each(child, function (i, e) {
                        datatips.variables().add( ns.core.DatatipsVariable[parse]($(e)) );
                    });
                }
                
                attr = xml.attr("format");
                if (attr !== undefined) {
                    datatips.format(attr);
                }
                attr = xml.attr("bgcolor");
                if (attr !== undefined) {
                    datatips.bgcolor(RGBColor.parse(attr));
                }
                attr = xml.attr("bgalpha");
                if (attr !== undefined) {
                    datatips.bgalpha(attr);
                }
                attr = xml.attr("border");
                if (attr !== undefined) {
                    datatips.border(parseInt(attr, 10));
                }
                attr = xml.attr("bordercolor");
                if (attr !== undefined) {
                    datatips.bordercolor(RGBColor.parse(attr));
                }
                attr = xml.attr("pad");
                if (attr !== undefined) {
                    datatips.pad(parseInt(attr, 10));
                }
            }
            return datatips;
        };

    });

});
