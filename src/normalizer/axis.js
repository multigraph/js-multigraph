window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Axis.respondsTo("normalize", function (graph) {
            var i,
                title,
                label;

            //
            // Handles title tags
            //
            if (this.title() && this.title().content() === undefined) {
                this.title().content(new ns.Text(this.id()));
            }

            //
            // Handles missing labelers
            //
            if (this.labelers().size() === 0) {
                var defaultValues = (window.multigraph.utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels,
                    spacingString = this.type() === ns.DataValue.NUMBER ?
                        defaultValues.defaultNumberSpacing :
                        defaultValues.defaultDatetimeSpacing,
                    spacingStrings = spacingString.split(/\s+/);

                for (i = 0; i < spacingStrings.length; i++) {
                    label = new ns.Labeler(this);
                    label.spacing(ns.DataMeasure.parse(this.type(), spacingStrings[i]));
                    this.labelers().add(label);
                }
            }

            //
            // normalizes the labelers
            //
            for (i = 0; i < this.labelers().size(); i++) {
                this.labelers().at(i).normalize();
            }

        });

    });

});
