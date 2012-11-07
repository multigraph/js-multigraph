window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Plotarea[parse] = function (xml) {
            var plotarea = new ns.core.Plotarea();
            if (xml) {
                if (xml.attr("marginbottom") !== undefined) {
                    plotarea.margin().bottom(parseInt(xml.attr("marginbottom"), 10));
                }
                if (xml.attr("marginleft") !== undefined) {
                    plotarea.margin().left(parseInt(xml.attr("marginleft"), 10));
                }
                if (xml.attr("margintop") !== undefined) {
                    plotarea.margin().top(parseInt(xml.attr("margintop"), 10));
                }
                if (xml.attr("marginright") !== undefined) {
                    plotarea.margin().right(parseInt(xml.attr("marginright"), 10));
                }
                if (xml.attr("border") !== undefined) {
                    plotarea.border(parseInt(xml.attr("border"), 10));
                }
                if (xml.attr("color") !== undefined) {
                    plotarea.color(ns.math.RGBColor.parse(xml.attr("color")));
                }
                plotarea.bordercolor(ns.math.RGBColor.parse(xml.attr("bordercolor")));
            }
            return plotarea;
        };
        
    });

});
