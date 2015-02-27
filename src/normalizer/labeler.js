var NormalizerMixin = require('./normalizer_mixin.js');

NormalizerMixin.add(function () {
    var Labeler = require('../core/labeler.js'),
        DataValue = require('../core/data_value.js'),
        DataFormatter = require('../data_formatter.js');

    Labeler.respondsTo("normalize", function () {
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

});
