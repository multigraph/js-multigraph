if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Axis,
        Title,
        Labels,
        Label,
        Grid,
        Pan,
        Zoom,
        Binding,
        AxisControls;

    if (ns.Axis) {
        if (ns.Axis.Title) {
            Title = ns.Axis.Title;
        }
        if (ns.Axis.Labels) {
            Labels = ns.Axis.Labels;
        }
        if (ns.Axis.Label) {
            Label = ns.Axis.Label;
        }
        if (ns.Axis.Grid) {
            Grid = ns.Axis.Grid;
        }
        if (ns.Axis.Pan) {
            Pan = ns.Axis.Pan;
        }
        if (ns.Axis.Zoom) {
            Zoom = ns.Axis.Zoom;
        }
        if (ns.Axis.Binding) {
            Binding = ns.Axis.Binding;
        }
        if (ns.Axis.AxisControls) {
            AxisControls = ns.Axis.AxisControls;
        }
    }

    Axis = new ns.ModelTool.Model( 'Axis', function () {
        this.hasA("title").which.validatesWith(function (title) {
            return title instanceof ns.Axis.Title;
        });
        this.hasA("labels").which.validatesWith(function (labels) {
            return labels instanceof ns.Axis.Labels;
        });
        this.hasA("grid").which.validatesWith(function (grid) {
            return grid instanceof ns.Axis.Grid;
        });
        this.hasA("pan").which.validatesWith(function (pan) {
            return pan instanceof ns.Axis.Pan;
        });
        this.hasA("zoom").which.validatesWith(function (zoom) {
            return zoom instanceof ns.Axis.Zoom;
        });
        this.hasA("binding").which.validatesWith(function (binding) {
            return binding instanceof ns.Axis.Binding;
        });
        this.hasA("axiscontrols").which.validatesWith(function (axiscontrols) {
            return axiscontrols instanceof ns.Axis.AxisControls;
        });
        this.hasAn("id").which.validatesWith(function (id) {
            return typeof(id) === 'string';
        });
        this.hasA("type").which.validatesWith(function (type) {
            return typeof(type) === 'string' && ((type.toLowerCase() === 'number') || (type.toLowerCase() === 'datetime'));
        });
        this.hasA("length").which.validatesWith(function (length) {
            return typeof(length) === 'string';
        });
        this.hasA("position").which.validatesWith(function (position) {
            return ns.utilityFunctions.validateCoordinatePair(position);
        });
        this.hasA("pregap").which.validatesWith(function (pregap) {
            return typeof(pregap) === 'string';
        });
        this.hasA("postgap").which.validatesWith(function (postgap) {
            return typeof(postgap) === 'string';
        });
        this.hasAn("anchor").which.validatesWith(function (anchor) {
            return ns.utilityFunctions.validateCoordinatePair(anchor);
        });
        this.hasA("base").which.validatesWith(function (base) {
            return ns.utilityFunctions.validateCoordinatePair(base);
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === 'string';
        });
        this.hasA("minoffset").which.validatesWith(function (minoffset) {
            return typeof(minoffset) === 'string';
        });
        this.hasA("minposition").which.validatesWith(function (minposition) {
            return typeof(minposition) === 'string';
        });
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === 'string';
        });
        this.hasA("maxoffset").which.validatesWith(function (maxoffset) {
            return typeof(maxoffset) === 'string';
        });
        this.hasA("maxposition").which.validatesWith(function (maxposition) {
            return typeof(maxposition) === 'string';
        });
        this.hasA("positionbase").which.validatesWith(function (positionbase) {
            return typeof(positionbase) === 'string';
        });
        this.hasA("color").which.validatesWith(function (color) {
            return ns.utilityFunctions.validateCoordinatePair(color);
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === 'string';
        });
        this.hasA("tickmin").which.validatesWith(function (tickmin) {
            return typeof(tickmin) === 'string';
        });
        this.hasA("tickmax").which.validatesWith(function (tickmax) {
            return typeof(tickmax) === 'string';
        });
        this.hasA("highlightstyle").which.validatesWith(function (highlightstyle) {
            return typeof(highlightstyle) === 'string';
        });
        this.hasA("linewidth").which.validatesWith(function (linewidth) {
            return typeof(linewidth) === 'string';
        });
        this.hasA("orientation").which.validatesWith(function (orientation) {
            return typeof(orientation) === 'string' && ((orientation.toLowerCase() === 'horizontal') || (orientation.toLowerCase() === 'vertical'));
        });

    });

    ns.Axis = Axis;
    if (Title) {
        ns.Axis.Title = Title;
    }
    if (Labels) {
        ns.Axis.Labels = Labels;
    }
    if (Label) {
        ns.Axis.Label = Label;
    }
    if (Grid) {
        ns.Axis.Grid = Grid;
    }
    if (Pan) {
        ns.Axis.Pan = Pan;
    }
    if (Zoom) {
        ns.Axis.Zoom = Zoom;
    }
    if (Binding) {
        ns.Axis.Binding = Binding;
    }
    if (AxisControls) {
        ns.Axis.AxisControls = AxisControls;
    }

}(window.multigraph));
