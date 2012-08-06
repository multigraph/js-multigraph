window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Axis,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis);

    Axis = new window.jermaine.Model( "Axis", function () {
        this.hasA("title").which.validatesWith(function (title) {
            return title instanceof ns.AxisTitle;
        });
        this.hasA("labels").which.validatesWith(function (labels) {
            return labels instanceof ns.Labels;
        });
        this.hasMany("labelers").which.validatesWith(function (labelers) {
            return labelers instanceof ns.Labeler;
        });
        this.hasA("grid").which.validatesWith(function (grid) {
            return grid instanceof ns.Grid;
        });
        this.hasA("pan").which.validatesWith(function (pan) {
            return pan instanceof ns.Pan;
        });
        this.hasA("zoom").which.validatesWith(function (zoom) {
            return zoom instanceof ns.Zoom;
        });
        this.hasA("binding").which.validatesWith(function (binding) {
            return binding instanceof ns.Binding;
        });
        this.hasA("axiscontrols").which.validatesWith(function (axiscontrols) {
            return axiscontrols instanceof ns.AxisControls;
        });
        this.hasAn("id").which.validatesWith(function (id) {
            return typeof(id) === "string";
        });
        this.hasA("type").which.isOneOf(ns.DataValue.types());
        this.hasA("length").which.validatesWith(function (length) {
            return length instanceof window.multigraph.math.Displacement;
        });
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof window.multigraph.math.Point;
        });
        this.hasA("pregap").which.isA("number");
        this.hasA("postgap").which.isA("number");
        this.hasAn("anchor").which.isA("number");
        this.hasA("base").which.validatesWith(function (base) {
            return base instanceof window.multigraph.math.Point;
        });



        // The "min" attribute stores the "min" value from the mugl file, if there was one -- as a string!!!
        this.hasA("min").which.isA("string");

        // The "dataMin" attribute is the current min DataValue for the axis
        this.hasA("dataMin").which.validatesWith(function (x) {
            return ns.DataValue.isInstance(x);
        });
        // Convenience method for checking to see if dataMin has been set or not
        this.respondsTo("hasDataMin", function () {
            return this.dataMin() !== undefined;
        });

                                             
        this.hasA("minoffset").which.isA("number");
        this.hasA("minposition").which.validatesWith(function (minposition) {
            return minposition instanceof window.multigraph.math.Displacement;
        });




        // The "max" attribute stores the "max" value from the mugl file, if there was one -- as a string!!!
        this.hasA("max").which.isA("string");

        // The "dataMax" attribute is the current max DataValue for the axis
        this.hasA("dataMax").which.validatesWith(function (x) {
            return ns.DataValue.isInstance(x);
        });
        // Convenience method for checking to see if dataMax has been set or not
        this.respondsTo("hasDataMax", function () {
            return this.dataMax() !== undefined;
        });



        this.hasA("maxoffset").which.isA("number");
        this.hasA("maxposition").which.validatesWith(function (maxposition) {
            return maxposition instanceof window.multigraph.math.Displacement;
        });





        this.hasA("positionbase").which.validatesWith(function (positionbase) {
            //deprecated
            return typeof(positionbase) === "string";
        });
        this.hasA("color").which.validatesWith(function (color) {
            return color instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("tickmin").which.isA("integer");
        this.hasA("tickmax").which.isA("integer");
        this.hasA("highlightstyle").which.validatesWith(function (highlightstyle) {
            return typeof(highlightstyle) === "string";
        });
        this.hasA("linewidth").which.isA("integer");
        this.hasA("orientation").which.validatesWith(function (orientation) {
            return (orientation === Axis.HORIZONTAL) || (orientation === Axis.VERTICAL);
        });
        this.isBuiltWith("orientation");

        this.hasA("pixelLength").which.isA("number");
        this.hasA("parallelOffset").which.isA("number");
        this.hasA("perpOffset").which.isA("number");

        this.hasA("axisToDataRatio").which.isA("number");

        this.respondsTo("initializeGeometry", function (graph) {
            if (this.orientation() === Axis.HORIZONTAL) {
                this.pixelLength(this.length().calculateLength( graph.plotBox().width() ));
                this.parallelOffset( this.position().x() + (this.base().x() + 1) * graph.plotBox().width()/2 - (this.anchor() + 1) * this.pixelLength() / 2 );
                this.perpOffset( this.position().y() + (this.base().y() + 1) * graph.plotBox().height() / 2 );
            } else {
                this.pixelLength( this.length().calculateLength( graph.plotBox().height() ) );
                this.parallelOffset( this.position().y() + (this.base().y() + 1) * graph.plotBox().height()/2 - (this.anchor() + 1) * this.pixelLength() / 2 );
                this.perpOffset( this.position().x() + (this.base().x() + 1) * graph.plotBox().width() / 2 );
            }
            this.minoffset(this.minposition().calculateCoordinate(this.pixelLength()));
            this.maxoffset(this.pixelLength() - this.maxposition().calculateCoordinate(this.pixelLength()));
            if (this.hasDataMin() && this.hasDataMax()) {
                this.computeAxisToDataRatio();
            }
/*
            if (_orientation == AxisOrientation.HORIZONTAL) {
                _pixelLength = _length.calculateLength( _graph.plotBox.width );
                _parallelOffset = _position.x + (_base.x + 1) * _graph.plotBox.width/2 - (_anchor + 1) * _pixelLength / 2;
                _perpOffset = _position.y + (_base.y + 1) * _graph.plotBox.height/2;
            } else {
                _pixelLength = _length.calculateLength( _graph.plotBox.height );
                _parallelOffset = _position.y + (_base.y + 1) * _graph.plotBox.height/2 - (_anchor + 1) * _pixelLength / 2;
                _perpOffset = _position.x + (_base.x + 1) * _graph.plotBox.width/2;
            }
            _minOffset = _minposition.calculateCoordinate(_pixelLength);
            _maxOffset = _pixelLength - _maxposition.calculateCoordinate(_pixelLength);
            _reversed = (_minOffset > _pixelLength - _maxOffset);
            if (_haveDataMin && _haveDataMax) {
                computeAxisToDataRatio();
            }
*/
        });

        this.respondsTo("computeAxisToDataRatio", function () {
            if (this.hasDataMin() && this.hasDataMax()) {
/*
console.log('pixelLength: ' + this.pixelLength());
console.log('maxoffset: ' + this.maxoffset());
console.log('minoffset: ' + this.minoffset());
console.log('dataMax: ' + this.dataMax().getRealValue());
console.log('dataMin: ' + this.dataMin().getRealValue());
*/
                this.axisToDataRatio((this.pixelLength() - this.maxoffset() - this.minoffset()) / (this.dataMax().getRealValue() - this.dataMin().getRealValue()));
            }
        });

        this.respondsTo("dataValueToAxisValue", function (v) {
            return this.axisToDataRatio() * ( v.getRealValue() - this.dataMin().getRealValue() ) + this.minoffset() + this.parallelOffset();
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis, attributes);
    });

    Axis.HORIZONTAL = "horizontal";
    Axis.VERTICAL   = "vertical";

    ns.Axis = Axis;

});
