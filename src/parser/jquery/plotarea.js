window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Plotarea[parse] = function (xml) {
            var plotarea = new ns.core.Plotarea(),
                margin = plotarea.margin(),
                RGBColor = ns.math.RGBColor,
                attr;
            if (xml) {
                attr = xml.attr("marginbottom");
                if (attr !== undefined) {
                    margin.bottom(parseInt(attr, 10));
                }
                attr = xml.attr("marginleft");
                if (attr !== undefined) {
                    margin.left(parseInt(attr, 10));
                }
                attr = xml.attr("margintop");
                if (attr !== undefined) {
                    margin.top(parseInt(attr, 10));
                }
                attr = xml.attr("marginright");
                if (attr !== undefined) {
                    margin.right(parseInt(attr, 10));
                }
                attr = xml.attr("border");
                if (attr !== undefined) {
                    plotarea.border(parseInt(attr, 10));
                }
                attr = xml.attr("color");
                if (attr !== undefined) {
                    plotarea.color(RGBColor.parse(attr));
                }
                attr = xml.attr("bordercolor");
                if (attr !== undefined) {
                    plotarea.bordercolor(RGBColor.parse(attr));
                }
            }
            return plotarea;
        };
        
    });

});
