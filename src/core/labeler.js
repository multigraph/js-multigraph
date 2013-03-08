window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.labels.label),
        Axis = ns.Axis,
        DataValue = ns.DataValue,

        Labeler = new window.jermaine.Model("Labeler", function () {

            var getValue = function (valueOrFunction) {
                if (typeof(valueOrFunction) === "function") {
                    return valueOrFunction();
                } else {
                    return valueOrFunction;
                }
            };

            this.hasA("axis").which.validatesWith(function (axis) {
                return axis instanceof ns.Axis;
            });
            this.hasA("formatter").which.validatesWith(ns.DataFormatter.isInstance);
            this.hasA("start").which.validatesWith(ns.DataValue.isInstance);
            this.hasA("angle").which.isA("number");
            this.hasA("position").which.validatesWith(function (position) {
                return position instanceof window.multigraph.math.Point;
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return anchor instanceof window.multigraph.math.Point;
            });
            this.hasA("spacing").which.validatesWith(ns.DataMeasure.isInstance);
            this.hasA("densityfactor").which.isA("number");

            this.hasA("color").which.validatesWith(function (color) {
                return color instanceof window.multigraph.math.RGBColor;
            });

            this.isBuiltWith("axis", function () {
                if (this.axis().type() === DataValue.DATETIME) {
                    this.start( getValue(defaultValues.horizontalaxis.labels['start-datetime']) );
                } else {
                    this.start( getValue(defaultValues.horizontalaxis.labels['start-number']) );
                }
            });

            this.respondsTo("initializeGeometry", function (graph) {
                var labelDefaults = defaultValues.horizontalaxis.labels.label;

                if (this.position() === undefined) {
                    if (this.axis().orientation() === Axis.HORIZONTAL) {
                        if (this.axis().perpOffset() > graph.plotBox().height()/2) {
                            this.position( getValue(labelDefaults["position-horizontal-top"]) );
                        } else {
                            this.position( getValue(labelDefaults["position-horizontal-bottom"]) );
                        }
                    } else {
                        if (this.axis().perpOffset() > graph.plotBox().width()/2) {
                            this.position( getValue(labelDefaults["position-vertical-right"]) );
                        } else {
                            this.position( getValue(labelDefaults["position-vertical-left"]) );
                        }
                    }
                }

                if (this.anchor() === undefined) {
                    if (this.axis().orientation() === Axis.HORIZONTAL) {
                        if (this.axis().perpOffset() > graph.plotBox().height()/2) {
                            this.anchor( getValue(labelDefaults["anchor-horizontal-top"]) );
                        } else {
                            this.anchor( getValue(labelDefaults["anchor-horizontal-bottom"]) );
                        }
                    } else {
                        if (this.axis().perpOffset() > graph.plotBox().width()/2) {
                            this.anchor( getValue(labelDefaults["anchor-vertical-right"]) );
                        } else {
                            this.anchor( getValue(labelDefaults["anchor-vertical-left"]) );
                        }
                    }
                }


            });

            this.respondsTo("isEqualExceptForSpacing", function (labeler) {
                // return true iff the given labeler and this labeler are equal in every way
                // except for their spacing values
                return ((this.axis()                         ===   labeler.axis()                            ) &&
                        (this.formatter().getFormatString()  ===   labeler.formatter().getFormatString()     ) &&
                        (this.start()                        .eq(  labeler.start()                         ) ) &&
                        (this.angle()                        ===   labeler.angle()                           ) &&
                        (this.position()                     .eq(  labeler.position()                      ) ) &&
                        (this.anchor()                       .eq(  labeler.anchor()                        ) ) &&
                        (this.densityfactor()                ===   labeler.densityfactor()                   )
                       );
            });


            this.hasA("iteratorNextValue").which.validatesWith(ns.DataValue.isInstanceOrNull).and.which.defaultsTo(null);
            this.hasA("iteratorMinValue").which.validatesWith(ns.DataValue.isInstance);
            this.hasA("iteratorMaxValue").which.validatesWith(ns.DataValue.isInstance);

            this.respondsTo("prepare", function (minDataValue, maxDataValue) {
                this.iteratorMinValue(minDataValue);
                this.iteratorMaxValue(maxDataValue);
                this.iteratorNextValue( this.spacing().firstSpacingLocationAtOrAfter(minDataValue, this.start()) );
            });
            this.respondsTo("hasNext", function () {
                if (this.iteratorNextValue() === null || this.iteratorNextValue() === undefined) {
                    return false;
                }
                return this.iteratorNextValue().le(this.iteratorMaxValue());
            });
            this.respondsTo("peekNext", function () {
                var value = this.iteratorNextValue();
                if (value === null || value === undefined) {
                    return undefined;
                }
                if (this.iteratorMaxValue() !== undefined && value.gt(this.iteratorMaxValue())) {
                    return undefined;
                }
                return value;
            });
            this.respondsTo("next", function () {
                var value = this.iteratorNextValue();
                if (value === null || value === undefined) {
                    return undefined;
                }
                if (this.iteratorMaxValue() !== undefined && value.gt(this.iteratorMaxValue())) {
                    return undefined;
                }
                this.iteratorNextValue( value.add( this.spacing() ) );
                return value;
            });

            this.respondsTo("getLabelDensity", function (graphicsContext) {
                var pixelSpacing              = this.spacing().getRealValue() * this.axis().axisToDataRatio(),
                    axis                      = this.axis(),
                    minRealValue              = axis.dataMin().getRealValue(),
                    maxRealValue              = axis.dataMax().getRealValue(),
                    representativeRealValue   = minRealValue + 0.51234567 * (maxRealValue - minRealValue),
                    representativeValue       = DataValue.create(axis.type(), representativeRealValue ),
                    representativeValueString = this.formatter().format(representativeValue);

                // length of the formatted axis representative value, in pixels
                var pixelFormattedValue = (
                    (this.axis().orientation() === Axis.HORIZONTAL) ?
                        this.measureStringWidth(graphicsContext, representativeValueString) :
                        this.measureStringHeight(graphicsContext, representativeValueString)
                );
                // return the ratio -- the fraction of the spacing taken up by the formatted string
                return pixelFormattedValue / pixelSpacing;
            });


            this.respondsTo("measureStringWidth", function (graphicsContext, string) {
                // Graphics drivers should replace this method with an actual implementation; this
                // is just a placeholder.  The implementation should return the width, in pixels,
                // of the given string.  Of course this is dependent on font choice, size, etc,
                // but we gloss over that at the moment.  Just return the width of the string
                // using some reasonable default font for now.  Later on, we'll modify this
                // function to use font information.
                return string.length*30;
            });
            this.respondsTo("measureStringHeight", function (graphicsContext, string) {
                // see comment for measureStringWidth() above
                return string.length*30;
            });
            this.respondsTo("renderLabel", function (graphicsContext, value) {
                // Graphics drivers should replace this method with an actual implementation; this
                // is just a placeholder.  The implementation should draw the string for the given
                // value, formatted by the labeler's DataFormatter, in the location along the axis
                // determined by the value itself, and the labeler's position, anchor, and angle
                // attributes.
            });


            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
        });

    ns.Labeler = Labeler;

});
