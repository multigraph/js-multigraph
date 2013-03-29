window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Title[parse] = function (xml, graph) {
            var title,
                Point    = ns.math.Point,
                RGBColor = ns.math.RGBColor,
                attr;
            if (xml) {
                attr = xml.text();
                if (attr !== "") {
                    title = new ns.core.Title(new window.multigraph.core.Text(attr), graph);
                } else {
                    return undefined;
                }                
                attr = xml.attr("frame");
                if (attr !== undefined) {
                    title.frame(attr.toLowerCase());
                }
                attr = xml.attr("border");
                if (attr !== undefined) {
                    title.border(parseInt(attr, 10));
                }
                attr = xml.attr("color");
                if (attr !== undefined) {
                    title.color(RGBColor.parse(attr));
                }
                attr = xml.attr("bordercolor");
                if (attr !== undefined) {
                    title.bordercolor(RGBColor.parse(attr));
                }
                attr = xml.attr("opacity");
                if (attr !== undefined) {
                    title.opacity(parseFloat(attr));
                }
                attr = xml.attr("padding");
                if (attr !== undefined) {
                    title.padding(parseInt(attr, 10));
                }
                attr = xml.attr("cornerradius");
                if (attr !== undefined) {
                    title.cornerradius(parseInt(attr, 10));
                }
                attr = xml.attr("anchor");
                if (attr !== undefined) {
                    title.anchor(Point.parse(attr));
                }
                attr = xml.attr("base");
                if (attr !== undefined) {
                    title.base(Point.parse(attr));
                }
                attr = xml.attr("position");
                if (attr !== undefined) {
                    title.position(Point.parse(attr));
                }
            }
            return title;
        };

    });

});
