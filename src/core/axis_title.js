window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule core
     */

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues    = utilityFunctions.getDefaultValuesFromXSD(),
        attributes       = utilityFunctions.getKeys(defaultValues.horizontalaxis.title),
        AxisTitle;

    /**
     * Axis Title is a Jermaine model that supports the rendering of Axis Titles.
     *
     * @class AxisTitle
     * @for AxisTitle
     * @constructor
     * @param {Axis} axis
     */
    AxisTitle = new window.jermaine.Model("AxisTitle", function () {
        /**
         * Pointer to the Title's parent Axis jermiane model.
         *
         * @property axis
         * @type {Axis}
         * @author jrfrimme
         */
        this.hasA("axis").which.validatesWith(function (axis) {
            return axis instanceof window.multigraph.core.Axis;
        });
        /**
         * The value which is used as the title string.
         *
         * @property content
         * @type {Text}
         * @author jrfrimme
         */
        this.hasA("content").which.validatesWith(function (content) {
            return content instanceof window.multigraph.core.Text;
        });
        /**
         * The value which gives the location of the Title's anchor point to be attached to the
         * base point.
         *
         * @property anchor
         * @type {Point}
         * @author jrfrimme
         */
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return anchor instanceof window.multigraph.math.Point;
        });
        /**
         * The value which gives the location of the base point relative to the Title's Axis.
         *
         * @property base
         * @type {Number}
         * @author jrfrimme
         */
        this.hasA("base").which.isA("number");
        /**
         * A coordinate pair of pixel offsets for the base point.
         *
         * @property position
         * @type {Point}
         * @author jrfrimme
         */
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof window.multigraph.math.Point;
        });
        /**
         * The value which determines the rotation of the Title in degrees.
         *
         * @property angle
         * @type {Number}
         * @author jrfrimme
         */
        this.hasA("angle").which.isA("number");

        this.isBuiltWith("axis");

        /**
         * Determines values for the `position` and `anchor` attributes if they were not set; determines the
         * geometry of the `content` attribute. Called by `Axis.initializeGeometry()`.
         *
         * @method initializeGeometry
         * @param {Graph} graph
         * @param {Object} graphicsContext
         * @chainable
         * @author jrfrimme
         */
        this.respondsTo("initializeGeometry", function (graph, graphicsContext) {
            var titleDefaults = defaultValues.horizontalaxis.title,
                axis     = this.axis(),
                position = this.position,
                anchor   = this.anchor,
                plotBox  = graph.plotBox(),
                axisPerpOffset   = axis.perpOffset(),
                axisIsHorizontal = (axis.orientation() === ns.Axis.HORIZONTAL);

            var getValue = function (valueOrFunction) {
                if (typeof(valueOrFunction) === "function") {
                    return valueOrFunction();
                } else {
                    return valueOrFunction;
                }
            };

            if (position() === undefined) {
                if (axisIsHorizontal) {
                    if (axisPerpOffset > plotBox.height()/2) {
                        position( getValue(titleDefaults["position-horizontal-top"]) );
                    } else {
                        position( getValue(titleDefaults["position-horizontal-bottom"]) );
                    }
                } else {
                    if (axisPerpOffset > plotBox.width()/2) {
                        position( getValue(titleDefaults["position-vertical-right"]) );
                    } else {
                        position( getValue(titleDefaults["position-vertical-left"]) );
                    }
                }
            }

            if (anchor() === undefined) {
                if (axisIsHorizontal) {
                    if (axisPerpOffset > plotBox.height()/2) {
                        anchor( getValue(titleDefaults["anchor-horizontal-top"]) );
                    } else {
                        anchor( getValue(titleDefaults["anchor-horizontal-bottom"]) );
                    }
                } else {
                    if (axisPerpOffset > plotBox.width()/2) {
                        anchor( getValue(titleDefaults["anchor-vertical-right"]) );
                    } else {
                        anchor( getValue(titleDefaults["anchor-vertical-left"]) );
                    }
                }
            }

            graphicsContext.angle = this.angle();
            this.content().initializeGeometry(graphicsContext);

            return this;
        });

        /**
         * Renders the Axis Title. Overridden by implementations in graphics drivers.
         *
         * @method render
         * @private
         * @author jrfrimme
         */
        this.respondsTo("render", function () {});

        utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.title, attributes);
    });

    ns.AxisTitle = AxisTitle;

});
