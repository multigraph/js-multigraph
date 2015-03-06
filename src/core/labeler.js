var jermaine = require('../../lib/jermaine/src/jermaine.js');

var DataValue = require('./data_value.js'),
    DataFormatter = require('./data_formatter.js'),
    DataMeasure = require('./data_measure.js'),
    Point = require('../math/point.js'),
    RGBColor = require('../math/rgb_color.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis.labels.label);

var Labeler = new jermaine.Model("Labeler", function () {

    var getValue = function (valueOrFunction) {
        if (typeof(valueOrFunction) === "function") {
            return valueOrFunction();
        } else {
            return valueOrFunction;
        }
    };

    this.hasA("axis").which.validatesWith(function (axis) {
        var Axis = require('./axis.js');
        return axis instanceof Axis;
    });
    this.hasA("formatter").which.validatesWith(DataFormatter.isInstance);
    this.hasA("start").which.validatesWith(DataValue.isInstance);
    this.hasA("angle").which.isA("number");
    this.hasA("position").which.validatesWith(function (position) {
        return position instanceof Point;
    });
    this.hasA("anchor").which.validatesWith(function (anchor) {
        return anchor instanceof Point;
    });
    this.hasA("spacing").which.validatesWith(DataMeasure.isInstance);
    this.hasA("densityfactor").which.isA("number").and.which.defaultsTo(1.0);

    this.hasA("color").which.validatesWith(function (color) {
        return color instanceof RGBColor;
    });

    this.hasA("visible").which.isA("boolean").and.which.defaultsTo(true);

    this.isBuiltWith("axis", function () {
        var labelsDefaults = defaultValues.horizontalaxis.labels;
        if (this.axis().type() === DataValue.DATETIME) {
            this.start( getValue(labelsDefaults['start-datetime']) );
        } else {
            this.start( getValue(labelsDefaults['start-number']) );
        }
    });

    this.respondsTo("initializeGeometry", function (graph) {
        var axis    = this.axis(),
            plotBox = graph.plotBox(),
            labelDefaults = defaultValues.horizontalaxis.labels.label,
            Axis = require('./axis.js');

        if (this.position() === undefined) {
            if (axis.orientation() === Axis.HORIZONTAL) {
                if (axis.perpOffset() > plotBox.height()/2) {
                    this.position( getValue(labelDefaults["position-horizontal-top"]) );
                } else {
                    this.position( getValue(labelDefaults["position-horizontal-bottom"]) );
                }
            } else {
                if (axis.perpOffset() > plotBox.width()/2) {
                    this.position( getValue(labelDefaults["position-vertical-right"]) );
                } else {
                    this.position( getValue(labelDefaults["position-vertical-left"]) );
                }
            }
        }

        if (this.anchor() === undefined) {
            if (axis.orientation() === Axis.HORIZONTAL) {
                if (axis.perpOffset() > plotBox.height()/2) {
                    this.anchor( getValue(labelDefaults["anchor-horizontal-top"]) );
                } else {
                    this.anchor( getValue(labelDefaults["anchor-horizontal-bottom"]) );
                }
            } else {
                if (axis.perpOffset() > plotBox.width()/2) {
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


    this.hasA("iteratorNextValue").which.validatesWith(DataValue.isInstanceOrNull).and.which.defaultsTo(null);
    this.hasA("iteratorMinValue").which.validatesWith(DataValue.isInstance);
    this.hasA("iteratorMaxValue").which.validatesWith(DataValue.isInstance);

    this.respondsTo("prepare", function (minDataValue, maxDataValue) {
        this.iteratorMinValue(minDataValue);
        this.iteratorMaxValue(maxDataValue);
        this.iteratorNextValue( this.spacing().firstSpacingLocationAtOrAfter(minDataValue, this.start()) );
    });

    this.respondsTo("hasNext", function () {
        var value = this.iteratorNextValue();
        if (value === null || value === undefined) {
            return false;
        }
        return value.le(this.iteratorMaxValue());
    });

    this.respondsTo("peekNext", function () {
        var value    = this.iteratorNextValue(),
            maxValue = this.iteratorMaxValue();
        if (value === null || value === undefined) {
            return undefined;
        }
        if (maxValue !== undefined && value.gt(maxValue)) {
            return undefined;
        }
        return value;
    });

    this.respondsTo("next", function () {
        var value = this.iteratorNextValue(),
            maxValue = this.iteratorMaxValue();
        if (value === null || value === undefined) {
            return undefined;
        }
        if (maxValue !== undefined && value.gt(maxValue)) {
            return undefined;
        }
        this.iteratorNextValue( value.add( this.spacing() ) );
        return value;
    });

    this.respondsTo("getLabelDensity", function (graphicsContext) {
        var axis                      = this.axis(),
            pixelSpacing              = this.spacing().getRealValue() * axis.axisToDataRatio(),
            minRealValue              = axis.dataMin().getRealValue(),
            maxRealValue              = axis.dataMax().getRealValue(),
            representativeRealValue   = minRealValue + 0.51234567 * (maxRealValue - minRealValue),
            representativeValue       = DataValue.create(axis.type(), representativeRealValue ),
            representativeValueString = this.formatter().format(representativeValue),
            Axis                      = require('./axis.js');

        // length of the formatted axis representative value, in pixels
        var pixelFormattedValue = (
            (axis.orientation() === Axis.HORIZONTAL) ?
                this.measureStringWidth(graphicsContext, representativeValueString) :
                this.measureStringHeight(graphicsContext, representativeValueString)
        );
        // return the ratio -- the fraction of the spacing taken up by the formatted string
        return pixelFormattedValue / ( pixelSpacing * this.densityfactor() );
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

    this.respondsTo("normalize", function () {
        var defaultNumberFormat   = "%.1f",
            defaultDatetimeFormat = "%Y-%M-%D %H:%i",
            labelerFormat,
            type = this.axis().type();

        //
        // Determines default values of labeler attributes based on axis type
        //
        if (type === DataValue.DATETIME) {
            labelerFormat = defaultDatetimeFormat;
        } else {
            labelerFormat = defaultNumberFormat;
        }

        //
        // Inserts labeler defaults
        //
        if (this.formatter() === undefined) {
            this.formatter(DataFormatter.create(type, labelerFormat));
        }

    });

    utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
});

module.exports = Labeler;
