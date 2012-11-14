window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Labeler.respondsTo("normalize", function () {
            var i,
                defaultNumberFormat   = "%.1f",
                defaultDatetimeFormat = "%Y-%M-%D %H:%i",
                labelerFormat,
                type = this.axis().type();

            //
            // Determines default values of labeler attributes based on axis type
            //
            if (type === ns.DataValue.DATETIME) {
                labelerFormat = defaultDatetimeFormat;
            } else {
                labelerFormat = defaultNumberFormat;
            }

            //
            // Inserts labeler defaults
            //
            if (this.formatter() === undefined) {
                this.formatter(ns.DataFormatter.create(type, labelerFormat));
            }

        });

    });

});
