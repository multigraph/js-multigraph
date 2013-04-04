window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Labeler = ns.Labeler;

        Labeler.hasAn("elems").which.defaultsTo(function () { return []; });

        var computeTransformString = function (base, anchor, position, angle) {
            return "t" + base.x() + "," + base.y() +
                "s1,-1" +
                "t" + position.x() + "," + (-position.y()) +
                "r" + (-angle) +
                "t" + (-anchor.x()) + "," + anchor.y();
        };

        var computePixelBasePoint = function (axis, value) {
            var a = axis.dataValueToAxisValue(value),
                perpOffset = axis.perpOffset();

            if (axis.orientation() === ns.Axis.HORIZONTAL) {
                return {
                    x : function () { return a; },
                    y : function () { return perpOffset; }
                };
            } else {
                return {
                    x : function () { return perpOffset; },
                    y : function () { return a; }
                };
            }
        };

        var drawText = function (text, graphicsContext, base, anchor, position, angle, color) {
            var pixelAnchor     = new window.multigraph.math.Point(0.5 * text.origWidth() * anchor.x(), 0.5 * text.origHeight() * anchor.y()),
                transformString = computeTransformString(base, pixelAnchor, position, angle);

            var elem = graphicsContext.paper.text(0, 0, text.string())
                .transform(transformString)
                .attr("fill", color.getHexString("#"));

            graphicsContext.set.push(
                elem
            );
            return elem;
        };

        Labeler.respondsTo("measureStringWidth", function (elem, string) {
            if (window.Raphael.svg) {
                return (new ns.Text(string)).initializeGeometry({
                        "elem"  : elem,
                        "angle" : this.angle()
                    }).rotatedWidth();
            } else {
                elem.attr("text", string);
                return elem.W;
            }
        });

        Labeler.respondsTo("measureStringHeight", function (elem, string) {
            if (window.Raphael.svg) {
                return (new ns.Text(string)).initializeGeometry({
                        "elem"  : elem,
                        "angle" : this.angle()
                    }).rotatedHeight();
            } else {
                elem.attr("text", string);
                return elem.H;
            }
        });

        Labeler.respondsTo("renderLabel", function (graphicsContext, value) {
            var formattedString = new ns.Text(this.formatter().format(value)),
                basePoint = computePixelBasePoint(this.axis(), value);

            formattedString.initializeGeometry({
                    "elem"  : graphicsContext.textElem,
                    "angle" : this.angle()
                });

            this.elems().push({
                "elem" : drawText(formattedString, graphicsContext, basePoint, this.anchor(), this.position(), this.angle(), this.color()),
                "base" : basePoint
            });
        });

        Labeler.respondsTo("redraw", function (graph, paper, values) {
            var axis  = this.axis(),
                elems = this.elems(),
                newLabels     = [],
                missingValues = [],
                elem, basePoint, storedBase,
                flag,
                i, j;

            // move existing text elements to new position
            var formattedString,
                deltaX, deltaY,
                x, y;
            for (i = 0; i < values.length; i++) {
                flag = false;
                formattedString = this.formatter().format(values[i]);
                for (j = 0; j < elems.length; j++) {
                    elem = elems[j].elem;
                    if (formattedString === elem.attr("text")) {
                        basePoint  = computePixelBasePoint(axis, values[i]);
                        storedBase = elems[j].base;

                        deltaX = basePoint.x() - storedBase.x();
                        deltaY = basePoint.y() - storedBase.y();
                        x      = elem.attr("x");
                        y      = elem.attr("y");

                        elem.transform("t" + deltaX + " " + deltaY + "...");
                        elems[j].base = basePoint;
                        newLabels.push(elems.splice(j, 1)[0]);
                        flag = true;
                        break;
                    }
                }
                if (flag === false) {
                    missingValues.push(values[i]);
                }
            }

            // use remaining text elems if they exist, create new ones otherwise
            for (i = 0; i < missingValues.length; i++) {
                formattedString = new ns.Text(this.formatter().format(missingValues[i]));
                basePoint = computePixelBasePoint(axis, missingValues[i]);

                if (elems.length > 0) {
                    elem = elems.pop().elem;
                    elem.transform("")
                        .attr({
                            "text" : formattedString.string(),
                            "x"    : 0,
                            "y"    : 0
                        });
                } else {
                    elem = paper.text(0, 0, formattedString.string())
                        .attr("fill", this.color().getHexString("#"));
                }

                formattedString.initializeGeometry({
                    "elem"  : elem,
                    "angle" : this.angle()
                });
                var ax = 0.5 * formattedString.origWidth()  * this.anchor().x(),
                    ay = 0.5 * formattedString.origHeight() * this.anchor().y(),
                    pixelAnchor = {
                        x : function () { return ax; },
                        y : function () { return ay; }
                    },
                    transformString = computeTransformString(basePoint, pixelAnchor, this.position(), this.angle());

                elem.transform(graph.transformString() + transformString);

                newLabels.push({
                    "elem" : elem,
                    "base" : basePoint
                });
            }

            var length = elems.length;
            for (i = 0; i < length; i++) {
                elems.pop().elem.remove();
            }

            this.elems(newLabels);
        });

    });

});
