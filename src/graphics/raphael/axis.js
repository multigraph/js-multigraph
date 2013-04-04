window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Axis = ns.Axis;

        Axis.hasAn("axisElem");
        Axis.hasAn("gridElem");
        Axis.hasAn("tickmarkElem");
//        Axis.hasMany("labelElems");

        var computeGridPath = function (axis, graph) {
            var currentLabeler = axis.currentLabeler(),
                perpOffset     = axis.perpOffset(),
                orientation    = axis.orientation(),
                plotBox        = graph.plotBox(),
                path = "",
                offset,
                a, v;

            if (orientation === Axis.HORIZONTAL) {
                offset = plotBox.height() - perpOffset;
            } else {
                offset = plotBox.width()  - perpOffset;
            }

            while (currentLabeler.hasNext()) {
                v = currentLabeler.next();
                a = axis.dataValueToAxisValue(v);
                if (orientation === Axis.HORIZONTAL) {
                    path = path +
                        "M" + a + "," + perpOffset +
                        "L" + a + "," + offset;
                } else {
                    path = path +
                        "M" + perpOffset + "," + a +
                        "L" + offset + "," + a;
                }
            }
            return path;
        };

        var computeAxisPath = function (axis) {
            // NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //   below are relative to the coordinate system of that box.
            if (axis.orientation() === Axis.HORIZONTAL) {
                return "M " + axis.parallelOffset() + ", " + axis.perpOffset() +
                    " l " + axis.pixelLength() + ", 0";
            } else {
                return "M " + axis.perpOffset() + ", " + axis.parallelOffset() +
                    " l 0, " + axis.pixelLength();
            }
        };

        var computeTickmarkPath = function (axis, value) {
            var perpOffset = axis.perpOffset();

            if (axis.orientation() === ns.Axis.HORIZONTAL) {
                return "M" + value + "," + (perpOffset + axis.tickmax()) +
                    "L" + value + "," + (perpOffset + axis.tickmin());
            } else {
                return "M" + (perpOffset + axis.tickmin()) + "," + value +
                    "L" + (perpOffset + axis.tickmax()) + "," + value;
            }
        };

        var prepareRaphaelRender = function (axis, text) {
            var previousLabeler = axis.currentLabeler();
            axis.prepareRender(text);
            if (axis.currentLabeler() !== previousLabeler && previousLabeler !== undefined) {
                axis.currentLabeler().elems(previousLabeler.elems());
                previousLabeler.elems([]);
            }
        };

        Axis.respondsTo("renderGrid", function (graph, paper, set) {
            var text = paper.text(100, 100, "foo");

            prepareRaphaelRender(this, text);

            // draw the grid lines
            if (this.hasDataMin() && this.hasDataMax()) { // skip if we don't yet have data values
                if (this.grid().visible()) { // skip if grid lines aren't turned on
                    if (this.labelers().size() > 0 && this.currentLabelDensity() <= 1.5) {
                        this.currentLabeler().prepare(this.dataMin(), this.dataMax());
                        var grid = paper.path(computeGridPath(this, graph))
                                .attr({
                                    "stroke-width" : 1,
                                    "stroke"       : this.grid().color().getHexString("#")
                                });
                        
                        this.gridElem(grid);
                        set.push(grid);
                    }
                }
            }

            text.remove();
        });

        Axis.respondsTo("redrawGrid", function (graph, paper) {
            var text = paper.text(100, 100, "foo");

            prepareRaphaelRender(this, text);
//            this.prepareRender(text);

            // redraw the grid lines
            if (this.hasDataMin() && this.hasDataMax()) { // skip if we don't yet have data values
                if (this.grid().visible()) { // skip if grid lines aren't turned on
                    if (this.labelers().size() > 0 && this.currentLabelDensity() <= 1.5) {
                        this.currentLabeler().prepare(this.dataMin(), this.dataMax());
                        this.gridElem().attr("path", computeGridPath(this, graph));
                    }
                }
            }

            text.remove();
        });

        Axis.respondsTo("render", function (graph, paper, set) {
            var text = paper.text(100, 100, "foo"),
                currentLabeler = this.currentLabeler(),
                tickcolor = this.tickcolor(),
                tickmarkPath = "";

            //
            // Render the axis line
            //
            var axis = paper.path(computeAxisPath(this))
                           .attr("stroke", this.color().getHexString("#"));

            this.axisElem(axis);
            set.push(axis);

            //
            // Render the tick marks and labels
            //
            if (this.hasDataMin() && this.hasDataMax()) { // but skip if we don't yet have data values
                if (currentLabeler) {
                    var v, a;
                    currentLabeler.prepare(this.dataMin(), this.dataMax());
                    // removes existing labels, if any, for redraw
                    if (currentLabeler.elems().length > 0) {
                        var i, j;
                        for (i = 0, j = currentLabeler.elems().length; i < j; i++) {
                            currentLabeler.elems().pop().elem.remove();
                        }
                    }

                    while (currentLabeler.hasNext()) {
                        v = currentLabeler.next();
                        a = this.dataValueToAxisValue(v);
                        tickmarkPath += computeTickmarkPath(this, a);
                        currentLabeler.renderLabel({ "paper"    : paper,
                                                     "set"      : set,
                                                     "textElem" : text
                                                   }, v);
                    }
                    var tickmarks = paper.path(tickmarkPath)
                        .attr("stroke",
                              (tickcolor !== undefined && tickcolor !== null) ?
                                  tickcolor.getHexString('#') :
                                  "#000"
                             );

                    this.tickmarkElem(tickmarks);
                    set.push(tickmarks);
                }
            }

            //
            // Render the title
            //
            if (this.title()) {
                this.title().render(paper, set);
            }

            text.remove();
        });

        Axis.respondsTo("redraw", function (graph, paper) {
            var text = paper.text(100, 100, "foo"),
                currentLabeler = this.currentLabeler(),
                tickmarkPath = "";

            //
            // Render the axis line
            //
            this.axisElem().attr("path", computeAxisPath(this));

            //
            // Render the tick marks and labels
            //
            if (this.hasDataMin() && this.hasDataMax()) { // but skip if we don't yet have data values
                if (currentLabeler) {
                    var v, a,
                        values = [];
                    this.currentLabeler().prepare(this.dataMin(), this.dataMax());
                    while (currentLabeler.hasNext()) {
                        v = currentLabeler.next();
                        a = this.dataValueToAxisValue(v);
                        tickmarkPath = tickmarkPath + computeTickmarkPath(this, a);
                        values.push(v);
                    }
                    currentLabeler.redraw(graph, paper, values);
                    this.tickmarkElem().attr("path", tickmarkPath);
                }
            }

            //
            // Redraw the title
            //
            if (this.title()) {
                this.title().redraw();
            }
            text.remove();
        });

    });

});
