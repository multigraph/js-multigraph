window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.AxisTitle[parse] = function (xml, axis) {
            var title = new ns.core.AxisTitle(axis);
            var nonEmptyTitle = false;
            if (xml) {
                if (xml.text() !== "") {
                    title.content(new window.multigraph.core.Text(xml.text()));
                    nonEmptyTitle = true;
                }
                if (xml.attr("anchor") !== undefined) {
                    title.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                    nonEmptyTitle = true;
                }
                if (xml.attr("base") !== undefined) {
                    title.base(parseFloat(xml.attr("base")));
                    nonEmptyTitle = true;
                }
                if (xml.attr("position") !== undefined) {
                    title.position(window.multigraph.math.Point.parse(xml.attr("position")));
                    nonEmptyTitle = true;
                }
                if (xml.attr("angle") !== undefined) {
                    title.angle(parseFloat(xml.attr("angle")));
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
