window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Title[parse] = function (xml) {
            var title = new ns.core.Title();
            if (xml) {
                title.content(xml.text());
                title.border(xml.attr("border"));
                title.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                title.bordercolor(window.multigraph.math.RGBColor.parse(xml.attr("bordercolor")));
                if (xml.attr("opacity") !== undefined) {
                    title.opacity(parseFloat(xml.attr("opacity")));
                }
                title.padding(xml.attr("padding"));
                title.cornerradius(xml.attr("cornerradius"));
                if (xml.attr("anchor") !== undefined) {
                    title.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("base") !== undefined) {
                    title.base(window.multigraph.math.Point.parse(xml.attr("base")));
                }
                if (xml.attr("position") !== undefined) {
                    title.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
            }
            return title;
        };

    });

});
