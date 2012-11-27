window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Title[parse] = function (xml, graph) {
            var title;
            if (xml) {
                if (xml.text() !== "") {
                    title = new ns.core.Title(new window.multigraph.core.Text(xml.text()), graph);
                } else {
                    return undefined;
                }                
                if (xml.attr("frame") !== undefined) {
                    title.frame(xml.attr("frame").toLowerCase());
                }
                if (xml.attr("border") !== undefined) {
                    title.border(parseInt(xml.attr("border"), 10));
                }
                if (xml.attr("color") !== undefined) {
                    title.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                }
                if (xml.attr("bordercolor") !== undefined) {
                    title.bordercolor(window.multigraph.math.RGBColor.parse(xml.attr("bordercolor")));
                }
                if (xml.attr("opacity") !== undefined) {
                    title.opacity(parseFloat(xml.attr("opacity")));
                }
                if (xml.attr("padding") !== undefined) {
                    title.padding(parseInt(xml.attr("padding"), 10));
                }
                if (xml.attr("cornerradius") !== undefined) {
                    title.cornerradius(parseInt(xml.attr("cornerradius"), 10));
                }
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
