window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var toRGBA = function (color, alpha) {
            if (!(color instanceof window.multigraph.math.RGBColor)) {
                throw new Error("graphics.raphael.toRGBA: first argument must be an RGBColor instance");
            }
            if (alpha === undefined) {
                alpha = 1.0;
            }
            if (typeof(alpha) !== "number") {
                throw new Error("graphics.raphael.toRGBA: second argument, if present, must be a number");
            }
            return "rgba(" + (255*color.r()) + ", " + (255*color.g()) + ", " + (255*color.b()) + ", " + alpha + ")";
        };

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.BarRenderer.hasA("settings");

        ns.BarRenderer.respondsTo("begin", function (graphicsContext) {
            var settings = {
                "paper"         : graphicsContext.paper,
                "set"           : graphicsContext.set,
                "path"          : "",
                "barpixelwidth" : this.getOptionValue("barwidth") * this.plot().horizontalaxis().axisToDataRatio(),
                "baroffset"     : this.getOptionValue("baroffset"),
                "barpixelbase"  : this.getOptionValue("barbase")?this.plot().verticalaxis().dataValueToAxisValue(this.getOptionValue("barbase")):0,
                "fillcolor"     : this.getOptionValue("fillcolor"),
                "linecolor"     : this.getOptionValue("linecolor"),
                "hidelines"     : this.getOptionValue("hidelines")
            };

            this.settings(settings);
        });

        ns.BarRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                return;
            }
            p = this.transformPoint(datap);

            settings.path += this.generateBar(p[0] + settings.baroffset, settings.barpixelbase, settings.barpixelwidth, p[1] - settings.barpixelbase);
        });

        ns.BarRenderer.respondsTo("end", function () {
            var settings = this.settings(),
                raphaelAttrs = {
                    "fill": settings.fillcolor.getHexString("#")
                };
            
            if (settings.barpixelwidth > settings.hidelines) {
                raphaelAttrs["stroke-width"] = 1;
                raphaelAttrs.stroke          = settings.linecolor.getHexString("#");
            } else {
                raphaelAttrs["stroke-width"] = 0.00001; //stroke width of 0 still draws lines                
            }

            settings.set.push( settings.paper.path(settings.path)
                               .attr(raphaelAttrs)
                             );

        });


        ns.BarRenderer.respondsTo("generateBar", function (x, y, width, height) {
            var path = "M" + x + "," + y;
            path    += "L" + x + "," + (y + height); 
            path    += "L" + (x + width) + "," + (y + height); 
            path    += "L" + (x + width) + "," + y; 
            path    += "Z";
            return path; 
        });

    });

});
