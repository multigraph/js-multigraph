window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var Axis = ns.Axis;

        Axis.hasA("logger");

        Axis.respondsTo("dumpLog", function () {
            var logger = this.logger(),
                output = "",
                i,
                j;

            output += "setLineColor(" + logger.color + ");\n";
            output += "moveTo(" + logger.x + "," + logger.y + ");\n";
            if (logger.orientation === ns.Axis.HORIZONTAL.toString()) {
                output += "lineTo(" + (logger.x + logger.length) + "," + logger.y + ");\n";
            } else {
                output += "lineTo(" + logger.x + "," + (logger.y + logger.length) + ");\n";
            }

            for (i = 0; i < logger.ticks.length; i++) {
                for (j = 0; j < logger.ticks[i].length; j++) {
                    output += logger.ticks[i][j].command;
                    output += "(";
                    output += logger.ticks[i][j].x;
                    output += ",";
                    output += logger.ticks[i][j].y;
                    output += ");\n";
                }
            }

            if (this.currentLabeler()) {
                output += this.currentLabeler().dumpLog();
            }

            return output;
        });

        Axis.respondsTo("render", function (graph) {
            this.logger({
                "orientation" : this.orientation().toString(),
                "length"      : this.pixelLength(),
                "color"       : this.color().getHexString("#"),
                "ticks"       : []
            });

            this.prepareRender(undefined);

            // NOTE: axes are drawn relative to the graph's plot area (plotBox); the coordinates
            //   below are relative to the coordinate system of that box.
            if (this.orientation() === ns.Axis.HORIZONTAL) {
                this.logger().x = this.parallelOffset();
                this.logger().y = this.perpOffset();
            } else {
                this.logger().x = this.perpOffset();
                this.logger().y = this.parallelOffset();
            }


            //
            // Render the tick marks and labels
            //
            if (this.hasDataMin() && this.hasDataMax()) { // but skip if we don't yet have data values
                if (this.currentLabeler()) {
                    this.currentLabeler().prepare(this.dataMin(), this.dataMax());
                    while (this.currentLabeler().hasNext()) {
                        var v = this.currentLabeler().next();
                        var a = this.dataValueToAxisValue(v);
                        if (this.orientation() === ns.Axis.HORIZONTAL) {
                            this.logger().ticks.push([
                                {
                                    "command" : "moveTo",
                                    "x"       : a,
                                    "y"       : this.perpOffset() + this.tickmin()
                                },
                                {
                                    "command" : "lineTo",
                                    "x"       : a,
                                    "y"       : this.perpOffset() + this.tickmax()
                                }
                            ]);
                        } else {
                            this.logger().ticks.push([
                                {
                                    "command" : "moveTo",
                                    "x"       : this.perpOffset() + this.tickmin(),
                                    "y"       : a
                                },
                                {
                                    "command" : "lineTo",
                                    "x"       : this.perpOffset() + this.tickmax(),
                                    "y"       : a
                                }
                            ]);
                        }
                        this.currentLabeler().renderLabel({}, v);
                    }
                }
            }

        });

    });

});
