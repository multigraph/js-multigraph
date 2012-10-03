window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Axis.respondsTo("normalize", function (graph) {
            var i,
                defaultNumberSpacing = "10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001",
                defaultDatetimeSpacing = "1000Y 500Y 200Y 100Y 50Y 20Y 10Y 5Y 2Y 1Y 6M 3M 2M 1M 7D 3D 2D 1D 12H 6H 3H 2H 1H",
                spacingStrings,
                title,
                label;

            //
            // Handles title tags
            //
            if (this.title() === undefined) {
                // TODO: once axis title stuff has been merged in then the axis title
                // will require a pointer to the axis.
                title = new ns.AxisTitle();
                title.content(this.id());
                this.title(title);
            }

            //
            // Handles missing labelers
            //
            if (this.labelers().size() === 0) {
                if (this.type() === ns.DataValue.DATETIME) {
                    spacingStrings = defaultDatetimeSpacing.split(/\s+/);
                } else {
                    spacingStrings = defaultNumberSpacing.split(/\s+/);
                }

                for (i = 0; i < spacingStrings.length; i++) {
                    label = new ns.Labeler(this);
                    label.spacing(ns.DataMeasure.parse(this.type(), spacingStrings[i]));
                    this.labelers().add(label);
                }
            }

        });

    });

});
