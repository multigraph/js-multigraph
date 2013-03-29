window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.AxisTitle[parse] = function (xml, axis) {
            var title = new ns.core.AxisTitle(axis),
                nonEmptyTitle = false,
                Point = ns.math.Point,
                attr;
            if (xml) {
                attr = xml.text();
                if (attr !== "") {
                    title.content(new ns.core.Text(attr));
                    nonEmptyTitle = true;
                }
                attr = xml.attr("anchor");
                if (attr !== undefined) {
                    title.anchor(Point.parse(attr));
                    nonEmptyTitle = true;
                }
                attr = xml.attr("base");
                if (attr !== undefined) {
                    title.base(parseFloat(attr));
                    nonEmptyTitle = true;
                }
                attr = xml.attr("position");
                if (attr !== undefined) {
                    title.position(Point.parse(attr));
                    nonEmptyTitle = true;
                }
                attr = xml.attr("angle");
                if (attr !== undefined) {
                    title.angle(parseFloat(attr));
                    nonEmptyTitle = true;
                }
            }

            if (nonEmptyTitle === true) { 
                return title;
            }
            return undefined;
        };
        
    });

});
