var NormalizerMixin = require('./normalizer_mixin.js');

NormalizerMixin.add(function () {
    var Axis = require('../core/axis.js'),
        Text = require('../core/text.js'),
        DataValue = require('../core/data_value.js'),
        Labeler = require('../core/labeler.js'),
        DataMeasure = require('../core/data_measure.js'),
        utilityFunctions = require('../util/utilityFunctions.js');

    Axis.respondsTo("normalize", function (graph) {
        var i,
            title,
            label;

        //
        // Handles title tags
        //
        if (this.title() && this.title().content() === undefined) {
            this.title().content(new Text(this.id()));
        }

        //
        // Handles missing labelers
        //
        if (this.labelers().size() === 0) {
            var defaultValues = (utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels,
                spacingString = this.type() === DataValue.NUMBER ?
                    defaultValues.defaultNumberSpacing :
                    defaultValues.defaultDatetimeSpacing,
                spacingStrings = spacingString.split(/\s+/);

            for (i = 0; i < spacingStrings.length; i++) {
                label = new Labeler(this);
                label.spacing(DataMeasure.parse(this.type(), spacingStrings[i]));
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
