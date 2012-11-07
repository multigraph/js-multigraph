window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Datatips[parse] = function (xml) {
            var datatips = new ns.core.Datatips();
            if (xml) {
                if (xml.find("variable").length > 0) {
                    window.multigraph.jQuery.each(xml.find("variable"), function (i, e) {
                        datatips.variables().add( ns.core.DatatipsVariable[parse](window.multigraph.jQuery(e)) );
                    });
                }
                datatips.format(xml.attr("format"));
                datatips.bgcolor(window.multigraph.math.RGBColor.parse(xml.attr("bgcolor")));
                datatips.bgalpha(xml.attr("bgalpha"));
                if (xml.attr("border") !== undefined) {
                    datatips.border(parseInt(xml.attr("border"), 10));
                }
                datatips.bordercolor(window.multigraph.math.RGBColor.parse(xml.attr("bordercolor")));
                if (xml.attr("pad") !== undefined) {
                    datatips.pad(parseInt(xml.attr("pad"), 10));
                }

            }
            return datatips;
        };

    });

});
