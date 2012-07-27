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
        this.isBuiltWith("type");

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.renderer, attributes);
    });

    ns.Renderer = Renderer;
});
