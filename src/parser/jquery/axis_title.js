window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.AxisTitle[parse] = function (xml) {
            var title = new ns.core.AxisTitle();
            if (xml) {
                title.content(xml.text());
                if (xml.attr("anchor") !== undefined) {
                    title.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("position") !== undefined) {
                    title.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
                if (xml.attr("angle") !== undefined) {
                    title.angle(parseFloat(xml.attr("angle")));
                }
            }
            return title;
        };
        
    });

});
