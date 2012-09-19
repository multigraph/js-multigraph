window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Plot,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot);

    Plot = new window.jermaine.Model( "Plot", function () {
        this.hasA("legend").which.validatesWith(function (legend) {
            return legend instanceof ns.PlotLegend;
        });
        this.hasA("horizontalaxis").which.validatesWith(function (axis) {
            return axis instanceof ns.Axis;
        });
        this.hasA("verticalaxis").which.validatesWith(function (axis) {
            return axis instanceof ns.Axis;
        });
        this.hasMany("variable").which.validatesWith(function (variable) {
            return variable instanceof ns.DataVariable;
        });
        this.hasA("filter").which.validatesWith(function (filter) {
            return filter instanceof ns.Filter;
        });
        this.hasA("renderer").which.validatesWith(function (renderer) {
            return renderer instanceof ns.Renderer;
        });
        this.hasA("datatips").which.validatesWith(function (datatips) {
            return datatips instanceof ns.Datatips;
        });
        this.hasA("data").which.validatesWith(function (data) {
            return data instanceof ns.Data;
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot, attributes);

        this.respondsTo("render", function (graph, graphicsContext) {
            // graphicsContext is an optional argument passed to Plot.render() by the
            // graphics driver, and used by that driver's implementation of Renderer.begin().
            // It can be any objectded by the driver -- usually some kind of graphics
            // context object.  It can also be omitted if a driver does not need it.
            //var data = this.data().arraydata();
            var data = this.data();
            if (! data) { return; }

            var haxis = this.horizontalaxis();
            var vaxis = this.verticalaxis();

            var variableIds = [];
            var i;
            for (i=0; i<this.variable().size(); ++i) {
                variableIds.push( this.variable().at(i).id() );
            }

            var iter = data.getIterator(variableIds, haxis.dataMin(), haxis.dataMax(), 0);

            var renderer = this.renderer();
            renderer.setUpMissing(); //TODO: this is awkward -- figure out a better way!
            renderer.begin(graphicsContext);
            while (iter.hasNext()) {
                var datap = iter.next();
                renderer.dataPoint(datap);
            }
            renderer.end();

        });


    });

    ns.Plot = Plot;
});
