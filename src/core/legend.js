window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Icon,
        Legend,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.legend);

    Legend = new window.jermaine.Model( "Legend", function () {
        this.hasA("visible").which.isA("boolean");
        this.hasA("base").which.validatesWith(function (base) {
            return base instanceof window.multigraph.math.Point;
        });
        this.hasAn("anchor").which.validatesWith(function (anchor) {
            return anchor instanceof window.multigraph.math.Point;
        });
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof window.multigraph.math.Point;
        });
        this.hasA("frame").which.validatesWith(function (frame) {
            return frame === "plot" || frame === "padding";
        });
        this.hasA("color").which.validatesWith(function (color) {
            return color instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return bordercolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("opacity").which.validatesWith(function (opacity) {
            return window.multigraph.utilityFunctions.validateNumberRange(opacity, 0.0, 1.0);
        });
        this.hasA("border").which.isA("integer");
        this.hasA("rows").which.isA("integer").and.isGreaterThan(0);
        this.hasA("columns").which.isA("integer").and.isGreaterThan(0);
        this.hasA("cornerradius").which.isA("integer");
        this.hasA("padding").which.isA("integer");
        this.hasAn("icon").which.validatesWith(function (icon) {
            return icon instanceof ns.Icon;
        });

        this.hasMany("plots").which.validatesWith(function (plot) {
            return plot instanceof ns.Plot;
        });

        this.hasA("iconOffset").which.defaultsTo(5);
        this.hasA("labelOffset").which.defaultsTo(5);
        this.hasA("labelEnding").which.defaultsTo(15);

        this.hasA("width");
        this.hasA("height");

        this.hasA("x");
        this.hasA("y");

        this.hasA("blockWidth");
        this.hasA("blockHeight");

        this.hasA("maxLabelWidth");
        this.hasA("maxLabelHeight");

        this.respondsTo("initializeGeometry", function (graph) {
            var widths = [],
                heights = [],
                i;

            if (this.visible() === false) {
                return;
            }

            for (i = 0; i < graph.plots().size(); i++) {
                if (graph.plots().at(i).legend() && graph.plots().at(i).legend().visible() !== false) {
                    this.plots().add(graph.plots().at(i));
                }
            }

            if (this.visible() === undefined) {
                if (this.plots().size() > 1) {
                    this.visible(true);
                } else {
                    this.visible(false);
                    return;
                }
            }

            // if neither rows nor cols is specified, default to 1 col
            if (this.rows() === undefined && this.columns() === undefined) {
                this.columns(1);
            }

            // if only one of rows/cols is specified, compute the other
            if (this.columns() === undefined) {
                this.columns(parseInt(this.plots().size() / this.rows() + ( (this.plots().size() % this.rows()) > 0 ? 1 : 0 ), 10));
            } else if  (this.rows() === undefined) {
                this.rows(parseInt(this.plots().size() / this.columns() + ( (this.plots().size() % this.columns()) > 0 ? 1 : 0 ), 10));
            }

            for (i = 0; i < this.plots().size(); i++) {
                if (this.plots().at(i).legend().label() !== undefined) {
                    widths.push(this.measureLabelWidth(this.plots().at(i).legend().label()));
                    heights.push(this.measureLabelHeight(this.plots().at(i).legend().label()));
                }
            }

            widths.sort(function (a, b) {
                return b - a;
            });
            heights.sort(function (a, b) {
                return b - a;
            });
            this.maxLabelWidth(widths[0]);
            this.maxLabelHeight(Math.max(heights[0], this.icon().height()));

            this.blockWidth(this.iconOffset() + this.icon().width() + this.labelOffset() + this.maxLabelWidth() + this.labelEnding());
            this.blockHeight(this.iconOffset() + this.maxLabelHeight());

// TODO: find out whether or not padding needs to be taken into consideration
            this.width((2 * this.border()) + (this.columns() * this.blockWidth()));
            this.height((2 * this.border()) + (this.rows() * this.blockHeight()) + this.iconOffset());

            if (this.frame() === "padding") {
                this.x(((this.base().x() + 1) * graph.paddingBox().width()/2) - ((this.anchor().x() + 1) * this.width()/2) + this.position().x());
                this.y(((this.base().y() + 1) * graph.paddingBox().height()/2) - ((this.anchor().y() + 1) * this.height()/2) + this.position().y());
            } else {
                this.x(((this.base().x() + 1) * graph.plotBox().width()/2) - ((this.anchor().x() + 1) * this.width()/2) + this.position().x());
                this.y(((this.base().y() + 1) * graph.plotBox().height()/2) - ((this.anchor().y() + 1) * this.height()/2) + this.position().y());
            }

        });

        this.respondsTo("render", function (graphicsContext) {
            var blockx, blocky,
                iconx, icony,
                labelx, labely,
                plotCount = 0,
                r, c;

            if (this.visible() === false) {
                return;
            }

            // preform any neccesary setup
            this.begin(graphicsContext);

            // Draw the legend box
            this.renderLegend(graphicsContext);

            for (r = 0; r < this.rows(); r++) {
                if (plotCount >= this.plots().size()) {
                    break;
                }
                blocky = this.border() + ((this.rows() - r - 1) * this.blockHeight());
                icony  = blocky + this.iconOffset();
                labely = icony;
                for (c = 0; c < this.columns(); c++) {
                    if (plotCount >= this.plots().size()) {
                        break;
                    }
                    blockx = this.border() + (c * this.blockWidth());
                    iconx  = blockx + this.iconOffset();
                    labelx = iconx + this.icon().width() + this.labelOffset();

                    // Draw the icon
                    this.plots().at(plotCount).renderer().renderLegendIcon(graphicsContext, iconx, icony, this.icon(), this.opacity());
                    
                    // Draw the icon border
                    if (this.icon().border() > 0) {
                        this.icon().renderBorder(graphicsContext, iconx, icony, this.opacity());
                    }
                    
                    // Write the text
                    this.renderLabel(this.plots().at(plotCount).legend().label(), graphicsContext, labelx, labely);

                    plotCount++;
                }
            }

            // preform any neccesary steps at the end of rendering
            this.end(graphicsContext);

        });

// TODO: replace these functions with ones that properly measure the width/height of text.
//       This will most likely be done in an abstract text class which has knowledge of the
//       rendering environment.
        this.respondsTo("measureLabelWidth", function (string) {
                // Graphics drivers should replace this method with an actual implementation; this
                // is just a placeholder.  The implementation should return the width, in pixels,
                // of the given string.  Of course this is dependent on font choice, size, etc,
                // but we gloss over that at the moment.  Just return the width of the string
                // using some reasonable default font for now.  Later on, we'll modify this
                // function to use font information.
                return string.length*30;
        });

        this.respondsTo("measureLabelHeight", function (string) {
                // Graphics drivers should replace this method with an actual implementation; this
                // is just a placeholder.  The implementation should return the height, in pixels,
                // of the given string.  Of course this is dependent on font choice, size, etc,
                // but we gloss over that at the moment.  Just return the height of the string
                // using some reasonable default font for now.  Later on, we'll modify this
                // function to use font information.
                return 12;
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.legend, attributes);
    });

    ns.Legend = Legend;

});
