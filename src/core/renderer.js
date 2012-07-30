window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Renderer,
        RendererOption,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.renderer);

    Renderer = new window.jermaine.Model( "Renderer", function () {
        this.hasA("type").which.validatesWith(function (type) {
            return type === "line" || type === "bar" ||
                   type === "fill" || type === "point" ||
                   type === "barerror" || type === "lineerror" ||
                   type === "pointline";
        });
        this.hasMany("options").which.validatesWith(function (option) {
            return option instanceof ns.RendererOption;
        });

        this.hasA("horizontalaxis").which.validatesWith(function (a) {
            return a instanceof ns.Axis;
        });
        this.hasA("verticalaxis").which.validatesWith(function (a) {
            return a instanceof ns.Axis;
        });


        this.isBuiltWith("type");

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.renderer, attributes);

        this.respondsTo("transformPoint", function(input) {
            var output = [],
                haxis = this.horizontalaxis(),
                vaxis = this.verticalaxis(),
                i;

            output[0] = haxis.dataValueToAxisValue(input[0]);
            for (i = 1; i<input.length; ++i) {
                output[i] = vaxis.dataValueToAxisValue(input[i]);
            }
            return output;
        });

        // method must be overridden by subclass:
        this.respondsTo("begin", function() {
        });
        // method must be overridden by subclass:
        this.respondsTo("dataPoint", function(point) {
        });
        // method must be overridden by subclass:
        this.respondsTo("end", function() {
        });

    });

    ns.Renderer = Renderer;
});
