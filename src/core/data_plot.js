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

            var content = this.datatips().format(datap, this.variable());
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
                type = data.type,
                w = data.dimensions.width,
                h = data.dimensions.height,
                x = data.pixelp[0],
                y = data.pixelp[1];
//                arrowLength = data.arrowLength,
            var offset = determineOffsets(type, x, y, w, h, arrowLength);

            var datatip = $("<div></div>").css({
                position : "absolute",
                clear    : "both",
                left     : offset[0] + "px",
                top      : offset[1] + "px"
            }),
                box = $("<div>" + content + "</div>"),
                arrow = $("<div>&nbsp</div>");

            var Datatips = ns.Datatips;
            switch (type) {
                case Datatips.DOWN:
                    arrow.css({
//                        "left"          : (w/2) + "px",
                        "border-bottom" : arrowLength + "px solid " + this.datatips().bordercolor().getHexString("#"),
                        "border-left"   : "5px solid transparent",
                        "border-right"  : "5px solid transparent"
                    });
                    datatip.append(arrow);
                    datatip.append(box);
                    break;
                case Datatips.RIGHT:
                    arrow.css({
                        "top"           : ((h/2) - 5) + "px",
                        "border-bottom" : "5px solid transparent",
                        "border-top"    : "5px solid transparent",
                        "border-right"  : arrowLength + "px solid " + this.datatips().bordercolor().getHexString("#"),
                        "float"         : "left"
                    });
                    box.css("float", "left");
                    datatip.append(arrow);
                    datatip.append(box);
                    break;
                case Datatips.UP:
                    arrow.css({
//                        "left"         : (w/2) + "px",
                        "border-top"   : arrowLength + "px solid " + this.datatips().bordercolor().getHexString("#"),
                        "border-left"  : "5px solid transparent",
                        "border-right" : "5px solid transparent"
                    });
                    datatip.append(box);
                    datatip.append(arrow);
                    break;
                case Datatips.LEFT:
                    arrow.css({
                        "top"           : ((h/2) - 5) + "px",
                        "border-bottom" : "5px solid transparent",
                        "border-top"    : "5px solid transparent",
                        "border-left"   : arrowLength + "px solid " + this.datatips().bordercolor().getHexString("#"),
                        "float"         : "left"
                    });
                    box.css("float", "left");
                    datatip.append(box);
                    datatip.append(arrow);
                    break;
            }

            box.css({
                "display"          : "inline-block",
                "background-color" : this.datatips().bgcolor().toRGBA(this.datatips().bgalpha()),
                "padding-left"     : "2px",
                "padding-right"    : "2px",
                "border"           : this.datatips().border() + "px solid " + this.datatips().bordercolor().getHexString("#"),
                "border-radius"    : "5px"
            }),
            arrow.css({
                height   : "0px",
                width    : "0px",
                position : "relative"
            });

//            datatip.append(box);

            return datatip;
        });

        function determineOffsets (type, x, y, w, h, arrowLength) {
            var Datatips = ns.Datatips;
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

    ns.DataPlot = DataPlot;
});
