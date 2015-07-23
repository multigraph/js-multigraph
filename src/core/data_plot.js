var jermaine = require('../../lib/jermaine/src/jermaine.js');

var Plot = require('./plot.js'),
    DataVariable = require('./data_variable.js'),
    Filter = require('./filter.js'),
    Datatips = require('./datatips.js'),
    Data = require('./data.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot);

var graphCoordsToPixelCoords = function (graphCoords, graph, height) {
    return [
        graphCoords[0] + graph.x0(),
        height - (graphCoords[1] + graph.y0())
    ];
};

var DataPlot = new jermaine.Model("DataPlot", function () {
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

        if (!this.visible()) { return; }

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


    this.respondsTo("getDatatipsData", function (loc, graphWidth, graphHeight, graph, testElem) {
        var datatips = this.datatips();
        if (!datatips) {
            return;
        }

        var data = this.data();

        if (!data) { return; }

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

        for (i = 0; i < variables.size(); i++) {
            variableIds.push( variables.at(i).id() );
        }

        var iter        = data.getIterator(variableIds, haxis.dataMin(), haxis.dataMax(), 1),
            renderer    = this.renderer(),
            points      = [],
            x           = loc.x(),
            y           = loc.y(),
            maxDistance = 20,
            curDist,
            datap;

        while (iter.hasNext()) {
            datap = renderer.transformPoint(iter.next());
            curDist = window.multigraph.math.util.l2dist(x, y, datap[0], datap[1]);
            if (curDist < maxDistance) {
                points.push({
                    "datap"  : datap,
                    "dist"   : curDist
                });
            }
        }

        if (points.length === 0) {
            return;
        }

        var minIndex = 0,
            minDist  = points[0].dist;

        // determine index of closest point to mouse
        for (i = 1; i < points.length; i++) {
            if (points[i].dist < minDist) {
                minIndex = i;
                minDist = points[i].dist;
            }
        }

        // cache closest point to mouse
        var point      = points[minIndex],
            axisValues = [];

        // cache data for point
        datap = point.datap;

        // determine pixel location of data point
        point.pixelp = graphCoordsToPixelCoords(datap, graph, graphHeight);

        // determine real DataValues for the datapoint
        axisValues[0] = haxis.axisValueToDataValue(datap[0]);
        for (i = 1; i < datap.length; i++) {
            axisValues[i] = vaxis.axisValueToDataValue(datap[i]);
        }

        var content    = datatips.format(axisValues),
            dimensions = datatips.computeDimensions(content, testElem);

        point.content = content;
        point.dimensions = dimensions;

        // for now just use the first item in the results
        point.type = datatips.computeOrientation(point, graphWidth, graphHeight)[0];

        return point;
    });

    this.respondsTo("createDatatip", function (data) {
        var $           = window.multigraph.jQuery,
            content     = data.content,
            type        = data.type,
            dimensions  = data.dimensions,
            pixelp      = data.pixelp,
            w           = dimensions.width,
            h           = dimensions.height,
            x           = pixelp[0],
            y           = pixelp[1],
            arrowLength = data.arrow,
            offset      = determineOffsets(type, x, y, w, h, arrowLength),
            datatips    = this.datatips(),
            bordercolor = datatips.bordercolor().getHexString("#");

        var box     = $("<div>" + content + "</div>"),
            arrow   = $("<div>&nbsp</div>"),
            datatip = $("<div></div>");

        switch (type) {
        case Datatips.DOWN:
            arrow.css({
                "left"          : ((w/2) - 5) + "px",
                "border-bottom" : arrowLength + "px solid " + bordercolor,
                "border-left"   : "5px solid transparent",
                "border-right"  : "5px solid transparent",
                "border-top"    : "0px"
            });
            datatip.append(arrow);
            datatip.append(box);
            break;
        case Datatips.RIGHT:
            arrow.css({
                "top"           : ((h/2) - 5) + "px",
                "border-bottom" : "5px solid transparent",
                "border-top"    : "5px solid transparent",
                "border-right"  : arrowLength + "px solid " + bordercolor,
                "border-left"   : "0px",
                "float"         : "left"
            });
            box.css("float", "left");
            datatip.append(arrow);
            datatip.append(box);
            break;
        case Datatips.UP:
            arrow.css({
                "left"          : ((w/2) - 5) + "px",
                "border-top"    : arrowLength + "px solid " + bordercolor,
                "border-left"   : "5px solid transparent",
                "border-right"  : "5px solid transparent",
                "border-bottom" : "0px"
            });
            datatip.append(box);
            datatip.append(arrow);
            break;
        case Datatips.LEFT:
            arrow.css({
                "top"           : ((h/2) - 5) + "px",
                "border-bottom" : "5px solid transparent",
                "border-top"    : "5px solid transparent",
                "border-left"   : arrowLength + "px solid " + bordercolor,
                "border-right"  : "0px",
                "float"         : "left"
            });
            box.css("float", "left");
            datatip.append(box);
            datatip.append(arrow);
            break;
        }

        datatip.css({
            "text-align" : "left",
            "position"   : "absolute",
            "clear"      : "both",
            "left"       : offset[0] + "px",
            "top"        : offset[1] + "px",
            "margin"     : "0px",
            "padding"    : "0px"
        });

        box.css({
            "display"          : "inline-block",
            "position"         : "relative",
            "background-color" : datatips.bgcolor().toRGBA(datatips.bgalpha()),
            "text-align"       : "left",
            "margin"           : "0px",
            "padding-left"     : "5px",
            "padding-right"    : "5px",
            "padding-top"      : "1px",
            "padding-bottom"   : "1px",
            "border"           : datatips.border() + "px solid " + bordercolor,
            "border-radius"    : "5px"
        }),

        arrow.css({
            "height"     : "0px",
            "width"      : "0px",
            "position"   : "relative",
            "text-align" : "left",
            "margin"     : "0px",
            "padding"    : "0px"
        });

        return datatip;
    });

    var determineOffsets = function (type, x, y, w, h, arrowLength) {
        switch (type) {
        case Datatips.DOWN:
            return [x - w/2, y];
        case Datatips.RIGHT:
            return [x, y - h/2];
        case Datatips.UP:
            return [x - w/2, y - h - arrowLength];
        case Datatips.LEFT:
            return [x - w - arrowLength, y - h/2];
        }
    };


});

module.exports = DataPlot;
