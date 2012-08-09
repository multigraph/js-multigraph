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


            //window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
        });

    ns.Labeler = Labeler;

});
