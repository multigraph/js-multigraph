window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var PointlineRenderer,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.renderer);

    PointlineRenderer = new window.jermaine.Model( "PointlineRenderer", function () {
        this.isA(ns.Renderer);

        //TODO: this doesn't seem to work at the moment:
        //this.isBuiltWith(this.parent);

    });

    ns.Renderer.addType({'type'  : "pointline",
			 'model' : PointlineRenderer});
    ns.Renderer.addType({'type'  : "line",
			 'model' : PointlineRenderer});

    ns.PointlineRenderer = PointlineRenderer;
});
