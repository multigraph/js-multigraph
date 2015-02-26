var Plot = require('./plot.js'),
    DataVariable = require('./data_variable.js'),
    Filter = require('./filter.js'),
    Datatips = require('./datatips.js'),
    Data = require('./data.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot);

var DataPlot = new window.jermaine.Model("DataPlot", function () {
    this.isA(Plot);
    this.hasMany("variable").eachOfWhich.validateWith(function (variable) {
        return variable instanceof DataVariable || variable === null;
    });
    this.hasA("filter").which.validatesWith(function (filter) {
        return filter instanceof Filter;
    });
    this.hasA("datatips").which.validatesWith(function (datatips) {
        return datatips instanceof Datatips;
    });
    this.hasA("data").which.validatesWith(function (data) {
        return data instanceof Data;
    });

    utilityFunctions.insertDefaults(this, defaultValues.plot, attributes);

    this.respondsTo("render", function (graph, graphicsContext) {
        // graphicsContext is an optional argument passed to DataPlot.render() by the
        // graphics driver, and used by that driver's implementation of Renderer.begin().
        // It can be any objectded by the driver -- usually some kind of graphics
        // context object.  It can also be omitted if a driver does not need it.
        //var data = this.data().arraydata();
        var data = this.data();
        if (! data) { return; }

        var haxis = this.horizontalaxis(),
            vaxis = this.verticalaxis();

        if (!haxis.hasDataMin() || !haxis.hasDataMax()) {
            // if this plot's horizontal axis does not have a min or max value yet,
            // return immediately without doing anything
            return;
        }

        var variables   = this.variable(),
            variableIds = [],
            i;
        for (i = 0; i < variables.size(); ++i) {
            variableIds.push( variables.at(i).id() );
        }

        var iter = data.getIterator(variableIds, haxis.dataMin(), haxis.dataMax(), 1),
            renderer = this.renderer();

        renderer.setUpMissing(); //TODO: this is awkward -- figure out a better way!
        renderer.begin(graphicsContext);
        while (iter.hasNext()) {
            var datap = iter.next();
            renderer.dataPoint(datap);
        }
        renderer.end();

    });


});

module.exports = DataPlot;
