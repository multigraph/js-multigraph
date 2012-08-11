window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.labels.label),
        Labeler = new window.jermaine.Model( "Labeler", function () {

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

            this.isBuiltWith("axis");

            this.respondsTo("isEqualExceptForSpacing", function(labeler) {
                // return true iff the given labeler and this labeler are equal in every way
                // except for their spacing values
                return ((this.axis()                         ===   labeler.axis()                            )
                        &&
                        (this.formatter().getFormatString()  ===   labeler.formatter().getFormatString()     )
                        &&
                        (this.start()                        .eq(  labeler.start()                         ) )
                        &&
                        (this.angle()                        ===   labeler.angle()                           )
                        &&
                        (this.position()                     .eq(  labeler.position()                      ) )
                        &&
                        (this.anchor()                       .eq(  labeler.anchor()                        ) )
                        &&
                        (this.densityfactor()                ===   labeler.densityfactor()                   )
                       );
            });


            this.hasA("iteratorNextValue").which.validatesWith(ns.DataValue.isInstance).and.which.defaultsTo(null);
            this.hasA("iteratorMinValue").which.validatesWith(ns.DataValue.isInstance);
            this.hasA("iteratorMaxValue").which.validatesWith(ns.DataValue.isInstance);

            this.respondsTo("prepare", function(minDataValue, maxDataValue) {
                this.iteratorMinValue(minDataValue);
                this.iteratorMaxValue(maxDataValue);
                this.iteratorNextValue( this.spacing().firstSpacingLocationAtOrAfter(minDataValue, this.start()) );
            });
            this.respondsTo("hasNext", function() {
                if (this.iteratorNextValue() === null || this.iteratorNextValue() === undefined) {
                    return false;
                }
                return this.iteratorNextValue().le(this.iteratorMaxValue());
            });
            this.respondsTo("peekNext", function() {
                var value = this.iteratorNextValue();
                if (value === null || value === undefined) {
                    return undefined;
                }
                if (this.iteratorMaxValue() !== undefined && value.gt(this.iteratorMaxValue())) {
                    return undefined;
                }
                return value;
            });
            this.respondsTo("next", function() {
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


            this.respondsTo("getLabelDensity", function() {
                // Graphics drivers should replace this method with an actual implementation; this
                // is just a placeholder
                return 0.9;
            });
            this.respondsTo("renderLabel", function(value) {
                // Graphics drivers should replace this method with an actual implementation; this
                // is just a placeholder.  The implementation should draw the string for the given
                // value, formatted by the labeler's DataFormatter, in the location along the axis
                // determined by the value itself, and the labeler's position, anchor, and angle
                // attributes.
            });


            //window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
        });

    ns.Labeler = Labeler;

});
