if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Icon,
        Legend,
        defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.legend);

    if (ns.Legend && ns.Legend.Icon) {
        Icon = ns.Legend.Icon;
    }

    Legend = new ns.ModelTool.Model( 'Legend', function () {
        this.hasA("visible").which.validatesWith(function (visible) {
            return visible === 'true' || visible === 'false';
        });
        this.hasA("base").which.validatesWith(function (base) {
            return ns.utilityFunctions.validateCoordinatePair(base);
        });
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return ns.utilityFunctions.validateCoordinatePair(anchor);
        });
        this.hasA("position").which.validatesWith(function (position) {
            return ns.utilityFunctions.validateCoordinatePair(position);
        });
        this.hasA("frame").which.validatesWith(function (frame) {
            return frame === 'plot' || frame === 'padding';
        });
        this.hasA("color").which.validatesWith(function (color) {
            return ns.utilityFunctions.validateColor(color);
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return ns.utilityFunctions.validateColor(bordercolor);
        });
        this.hasA("opacity").which.validatesWith(function (opacity) {
            return ns.utilityFunctions.validateNumberRange(opacity, 0.0, 1.0);
        });
        this.hasA("border").which.validatesWith(function (border) {
            return ns.utilityFunctions.validateInteger(border);
        });
        this.hasA("rows").which.validatesWith(function (rows) {
            return ns.utilityFunctions.validateInteger(rows);
        });
        this.hasA("columns").which.validatesWith(function (columns) {
            return ns.utilityFunctions.validateInteger(columns);
        });
        this.hasA("cornerradius").which.validatesWith(function (cornerradius) {
            return ns.utilityFunctions.validateInteger(cornerradius);
        });
        this.hasA("padding").which.validatesWith(function (padding) {
            return ns.utilityFunctions.validateInteger(padding);
        });
        this.hasA("icon").which.validatesWith(function (icon) {
            return icon instanceof ns.Legend.Icon;
        });

        ns.utilityFunctions.insertDefaults(this, defaultValues.legend, attributes);
    });

    ns.Legend = Legend;

    if (Icon) {
        ns.Legend.Icon = Icon;
    }

}(window.multigraph));
