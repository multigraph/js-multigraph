window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Datatips,
        utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot.datatips);

    Datatips = new window.jermaine.Model("Datatips", function () {
        this.hasMany("variables").eachOfWhich.validateWith(function (variable) {
            return variable instanceof ns.DatatipsVariable;
        });
        this.hasA("formatString").which.isA("string");
        this.hasA("bgcolor").which.validatesWith(function (bgcolor) {
            return bgcolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("bgalpha").which.isA("number");
        this.hasA("border").which.isA("integer");
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return bordercolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("pad").which.isA("integer");

        // DOM elements
        this.hasMany("elems");

        this.respondsTo("format", function (data) {
            var formattedData = [],
                replacementPatterns = [],
                output = this.formatString(),
                i, l = data.length;

            for (i = 0; i < l; i++) {
                formattedData.push(this.variables().at(i).formatter().format(data[i]));
                replacementPatterns.push(new RegExp("\\{" + i + "\\}", "g"));
            }

            for (i = 0; i < l; i++) {
                output = output.replace(replacementPatterns[i], formattedData[i]);
            }

            output = output.replace(/[\n|\r]/g, "<br/>");

            return output;
        });

        this.respondsTo("computeDimensions", function (content, elem) {
            var paddingWidth  = parseInt(elem.css("padding-left"), 10) + parseInt(elem.css("padding-right"), 10),
                paddingHeight = parseInt(elem.css("padding-top"), 10)  + parseInt(elem.css("padding-bottom"), 10),
                border        = 2 * this.border();

            elem.html(content);

            return {
                "width"  : elem.width()  + border + paddingWidth,
                "height" : elem.height() + border + paddingHeight
            };
        });

        this.respondsTo("computeOrientation", function (data, graphWidth, graphHeight) {
            var datatipWidth  = data.dimensions.width,
                datatipHeight = data.dimensions.height,
                baseX = data.pixelp[0],
                baseY = data.pixelp[1],
                offset       = 20,
                offsetWidth  = datatipWidth  + offset,
                offsetHeight = datatipHeight + offset;

            baseY = graphHeight - baseY; // remove this line when baseY is taken from the lower left corner being the origin

            if ( // center
                baseX       - offsetWidth  >= 0 &&
                graphWidth  - baseX        >= offsetWidth &&
                baseY       - offsetHeight >= 0 &&
                graphHeight - baseY        >= offsetHeight
            ) {
                return [Datatips.UP, Datatips.DOWN, Datatips.RIGHT, Datatips.LEFT];
            } else if ( // top
                baseX       - offsetWidth  >= 0 &&
                graphWidth  - baseX        >= offsetWidth &&
                baseY                      >= graphHeight - offsetHeight &&
                graphHeight                >= baseY
            ) {
                return [Datatips.DOWN, Datatips.RIGHT, Datatips.LEFT, Datatips.UP];
            } else if ( // bottom
                baseX      - offsetWidth >= 0 &&
                graphWidth - baseX       >= offsetWidth &&
                offsetHeight             >= baseY &&
                baseY                    >= 0
            ) {
                return [Datatips.UP, Datatips.RIGHT, Datatips.LEFT, Datatips.DOWN];
            } else if ( // left
                baseX                      >= 0 &&
                offsetWidth                >= baseX &&
                baseY       - offsetHeight >= 0 &&
                graphHeight - baseY        >= offsetHeight
            ) {
                return [Datatips.RIGHT, Datatips.UP, Datatips.DOWN, Datatips.LEFT];
            } else if ( // right
                graphWidth                 >= baseX &&
                offsetWidth                >= graphWidth - baseX &&
                baseY       - offsetHeight >= 0 &&
                graphHeight - baseY        >= offsetHeight
            ) {
                return [Datatips.LEFT, Datatips.UP, Datatips.DOWN, Datatips.RIGHT];
            } else {
                var preferences = [];
                if (baseX < graphWidth / 2) { // left side of graph
                    if (baseY > graphHeight / 2) { // top-left corner of graph
                        if (baseX - datatipWidth/2 < (graphHeight - baseY) - datatipHeight/2) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.RIGHT);
                            preferences.push(Datatips.DOWN);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.DOWN);
                            preferences.push(Datatips.RIGHT);
                        }
                        if (baseX - offsetWidth < (graphHeight - baseY) - offsetHeight) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.UP);
                            preferences.push(Datatips.LEFT);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.LEFT);
                            preferences.push(Datatips.UP);
                        }
                    } else { // bottom-left corner of graph
                        if (baseX - datatipWidth/2 < baseY - datatipHeight/2) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.RIGHT);
                            preferences.push(Datatips.UP);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.UP);
                            preferences.push(Datatips.RIGHT);
                        }
                        if (baseX - offsetWidth < baseY - offsetHeight) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.DOWN);
                            preferences.push(Datatips.LEFT);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.LEFT);
                            preferences.push(Datatips.DOWN);
                        }
                    }
                } else { // right side of graph
                    if (baseY > graphHeight / 2) { // top-right corner of graph
                        if ((graphWidth - baseX) - datatipWidth/2 < (graphHeight - baseY) - datatipHeight/2) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.LEFT);
                            preferences.push(Datatips.DOWN);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.DOWN);
                            preferences.push(Datatips.LEFT);
                        }
                        if ((graphWidth - baseX) - offsetWidth < (graphHeight - baseY) - offsetHeight) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.UP);
                            preferences.push(Datatips.RIGHT);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.RIGHT);
                            preferences.push(Datatips.UP);
                        }
                    } else { // bottom-right corner of graph
                        if ((graphWidth - baseX) - datatipWidth/2 < baseY - datatipHeight/2) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.LEFT);
                            preferences.push(Datatips.UP);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.UP);
                            preferences.push(Datatips.LEFT);
                        }
                        if ((graphWidth - baseX) - offsetWidth < baseY - offsetWidth) {
                            // more is lost off the horizontal side than the vertical side
                            preferences.push(Datatips.DOWN);
                            preferences.push(Datatips.RIGHT);
                        } else {
                            // more is lost off the vertical side than the horizontal side
                            preferences.push(Datatips.RIGHT);
                            preferences.push(Datatips.DOWN);
                        }
                    }
                }
                return preferences;
            }
        });

        utilityFunctions.insertDefaults(this, defaultValues.plot.datatips, attributes);
    });

    Datatips.UP    = "u";
    Datatips.DOWN  = "d";
    Datatips.LEFT  = "l";
    Datatips.RIGHT = "r";

    ns.Datatips = Datatips;
});
