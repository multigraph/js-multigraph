window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var DataPlot,
        utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot);

    var graphCoordsToPixelCoords = function (graphCoords, graph, height) {
        return [
            graphCoords[0] + graph.x0(),
            height - (graphCoords[1] + graph.y0())
        ];
    };

    DataPlot = new window.jermaine.Model("DataPlot", function () {
        this.isA(ns.Plot);
        this.hasMany("variable").eachOfWhich.validateWith(function (variable) {
            return variable instanceof ns.DataVariable || variable === null;
        });
        this.hasA("filter").which.validatesWith(function (filter) {
            return filter instanceof ns.Filter;
        });
        this.hasA("datatips").which.validatesWith(function (datatips) {
            return datatips instanceof ns.Datatips;
        });
        this.hasA("data").which.validatesWith(function (data) {
            return data instanceof ns.Data;
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

        this.respondsTo("getDatatipsData", function (loc, graphWidth, graphHeight, graph, testElem) {
            if (!this.datatips()) {
                return;
            }
            var x = loc.x(),
                y = loc.y(),
                maxDistance = 20,
                i;

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
                variableIds = [];

            for (i = 0; i < variables.size(); i++) {
                variableIds.push( variables.at(i).id() );
            }

            var iter = data.getIterator(variableIds, haxis.dataMin(), haxis.dataMax(), 1),
                renderer = this.renderer(),
                points = [],
                curDist,
                datap, pixelp;

            while (iter.hasNext()) {
                datap = renderer.transformPoint(iter.next());
                curDist = window.multigraph.math.util.l2dist(x, y, datap[0], datap[1]);
                if (curDist < maxDistance) {
                    pixelp = graphCoordsToPixelCoords(datap, graph, graphHeight);
                    points.push({
                        "datap"  : datap,
                        "pixelp" : pixelp,
                        "dist"   : curDist
                    });
                }
            }

            if (points.length === 0) {
                return;
            }
            
            var minIndex = 0,
                minDist  = points[0].dist;

            for (i = 1; i < points.length; i++) {
                if (points[i].dist < minDist) {
                    minIndex = i;
                    minDist = points[i].dist;
                }
            }

            var content = this.datatips().format(datap);
            points[minIndex].content = content;

            var dimensions = this.datatips().computeDimensions(content, testElem);
            points[minIndex].dimensions = dimensions;

            // for now just use the first item in the results
            points[minIndex].type = this.datatips().computeOrientation(points[minIndex], graphWidth, graphHeight)[0];

            return points[minIndex];
        });

        this.respondsTo("createDatatip", function (data, arrowLength) {
            var $ = window.multigraph.jQuery;

            var content = data.content,
                w = data.dimensions.width,
                h = data.dimensions.height,
                x = data.pixelp.x,
                y = data.pixelp.y;
//                arrowLength = data.arrowLength,
//                offset = determineOffsets (type, x, y, w, h, arrowLength);

            var datatip = $("<div></div>").css({
                position : "absolute",
                clear    : "both",
                left     : x + "px",
                top      : y + "px"
            }),
                box = $("<div>" + content + "</div>").css({
                    "display"          : "inline-block",
                    "background-color" : "white",
                    "padding-left"     : "2px",
                    "padding-right"    : "2px",
                    "border-top"       : "2px solid black",
                    "border-bottom"    : "2px solid black",
                    "border-left"      : "2px solid black",
                    "border-right"     : "2px solid black",
                    "border-radius"    : "5px"
                }),
                arrow = $("<div></div>").css({
                    width    : "0px",
                    position : "relative"
                });

            datatip.append(box);

            return datatip;
        });

    });

    ns.DataPlot = DataPlot;
});
