//var jermaine = require('../../lib/jermaine/src/jermaine.js');
var jermaine = require('../../lib/jermaine/src/jermaine.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis),
    Displacement = require('../math/displacement.js'),
    Point = require('../math/point.js'),
    DataMeasure = require('../core/data_measure.js'),
    RGBColor = require('../math/rgb_color.js'),
    Enum = require('../math/enum.js'),
    EventEmitter = require('./event_emitter.js'),
    Text = require('../core/text.js'),
    AxisBinding = require('./axis_binding.js'),
    AxisTitle = require('./axis_title.js'),
    DataValue = require('./data_value.js'),
    Grid = require('./grid.js'),
    Labeler = require('./labeler.js'),
    Pan = require('./pan.js'),
    Zoom = require('./zoom.js'),

    Util = require('../math/util.js'),

    Orientation = new Enum("AxisOrientation");

var Axis = new jermaine.Model("Axis", function () {

    this.isA(EventEmitter);

    this.hasA("title").which.validatesWith(function (title) {
        return title instanceof AxisTitle;
    });
    this.hasMany("labelers").eachOfWhich.validateWith(function (labelers) {
        return labelers instanceof Labeler;
    });
    this.hasA("grid").which.validatesWith(function (grid) {
        return grid instanceof Grid;
    });
    this.hasA("pan").which.validatesWith(function (pan) {
        return pan instanceof Pan;
    });
    this.hasA("zoom").which.validatesWith(function (zoom) {
        return zoom instanceof Zoom;
    });
    this.hasA("binding").which.validatesWith(function (binding) {
        return binding === null || binding instanceof AxisBinding;
    });
    this.hasAn("id").which.isA("string");
    this.hasA("type").which.isOneOf(DataValue.types());
    this.hasA("length").which.validatesWith(function (length) {
        return length instanceof Displacement;
    });
    this.hasA("position").which.validatesWith(function (position) {
        return position instanceof Point;
    });
    this.hasA("pregap").which.isA("number");
    this.hasA("postgap").which.isA("number");
    this.hasAn("anchor").which.isA("number");
    this.hasA("base").which.validatesWith(function (base) {
        return base instanceof Point;
    });

    /**
     * Stores the "min" value from the mugl file as a string, if there was one.
     * This value is stored as a string, rather than as a number or a DataValue,
     * because it might have the value "auto".
     */
    this.hasA("min").which.isA("string");

    /**
     * The current min DataValue for the axis.
     *
     * @property dataMin
     * @type {DataValue}
     * @author jrfrimme
     */
    this.hasA("dataMin").which.validatesWith(DataValue.isInstance);
    /**
     * Convenience method for checking to see if dataMin has been set or not
     *
     * @method hasDataMin
     * @author jrfrimme
     * @return {Boolean}
     */
    this.respondsTo("hasDataMin", function () {
        return this.dataMin() !== undefined;
    });

    
    this.hasA("minoffset").which.isA("number");
    this.hasA("minposition").which.validatesWith(function (minposition) {
        return minposition instanceof Displacement;
    });

    /**
     * Stores the "max" value from the mugl file as a string, if there was one.
     * This value is stored as a string, rather than as a number or a DataValue,
     * because it might have the value "auto".
     */
    this.hasA("max").which.isA("string");

    /**
     * The current max DataValue for the axis.
     *
     * @property dataMax
     * @type {DataValue}
     * @author jrfrimme
     */
    this.hasA("dataMax").which.validatesWith(DataValue.isInstance);
    /**
     * Convenience method for checking to see if dataMax has been set or not.
     *
     * @method hasDataMax
     * @author jrfrimme
     * @return {Boolean}
     */
    this.respondsTo("hasDataMax", function () {
        return this.dataMax() !== undefined;
    });



    this.hasA("maxoffset").which.isA("number");
    this.hasA("maxposition").which.validatesWith(function (maxposition) {
        return maxposition instanceof Displacement;
    });


    this.hasA("positionbase").which.isA("string"); // deprecated
    this.hasA("color").which.validatesWith(function (color) {
        return color instanceof RGBColor;
    });
    this.hasA("tickcolor").which.validatesWith(function (color) {
        return color === null || color instanceof RGBColor;
    });
    this.hasA("tickwidth").which.isA("integer");
    this.hasA("tickmin").which.isA("integer");
    this.hasA("tickmax").which.isA("integer");
    this.hasA("highlightstyle").which.validatesWith(function (highlightstyle) {
        return typeof(highlightstyle) === "string";
    });
    this.hasA("linewidth").which.isA("integer");
    this.hasA("orientation").which.validatesWith(Orientation.isInstance);
    this.isBuiltWith("orientation", function () {
        this.grid(new Grid());
        this.zoom(new Zoom());
        this.pan(new Pan());
    });

    this.hasA("pixelLength").which.isA("number");
    this.hasA("parallelOffset").which.isA("number");
    this.hasA("perpOffset").which.isA("number");

    this.hasA("axisToDataRatio").which.isA("number");

    this.respondsTo("initializeGeometry", function (graph, graphicsContext) {
        var plotBox = graph.plotBox(),
            position = this.position(),
            base     = this.base(),
            pixelLength,
            i;
        if (this.orientation() === Axis.HORIZONTAL) {
            pixelLength = this.length().calculateLength( plotBox.width() );
            this.pixelLength(pixelLength);
            this.parallelOffset( position.x() + (base.x() + 1) * plotBox.width()/2 - (this.anchor() + 1) * pixelLength / 2 );
            this.perpOffset( position.y() + (base.y() + 1) * plotBox.height() / 2 );
        } else {
            pixelLength = this.length().calculateLength( plotBox.height() );
            this.pixelLength(pixelLength);
            this.parallelOffset( position.y() + (base.y() + 1) * plotBox.height()/2 - (this.anchor() + 1) * pixelLength / 2 );
            this.perpOffset( position.x() + (base.x() + 1) * plotBox.width() / 2 );
        }
        this.minoffset(this.minposition().calculateCoordinate(pixelLength));
        this.maxoffset(pixelLength - this.maxposition().calculateCoordinate(pixelLength));
        if (this.hasDataMin() && this.hasDataMax()) {
            this.computeAxisToDataRatio();
        }
        for (i = 0; i < this.labelers().size(); ++i) {
            this.labelers().at(i).initializeGeometry(graph);
        }
        if (this.title()) {
            this.title().initializeGeometry(graph, graphicsContext);
        }
    });

    this.respondsTo("computeAxisToDataRatio", function () {
        if (this.hasDataMin() && this.hasDataMax()) {
            this.axisToDataRatio((this.pixelLength() - this.maxoffset() - this.minoffset()) / (this.dataMax().getRealValue() - this.dataMin().getRealValue()));
        }
    });

    this.respondsTo("dataValueToAxisValue", function (v) {
        return this.axisToDataRatio() * ( v.getRealValue() - this.dataMin().getRealValue() ) + this.minoffset() + this.parallelOffset();
    });

    this.respondsTo("axisValueToDataValue", function (a) {
        return DataValue.create( this.type(),
                                 ( this.dataMin().getRealValue() +
                                   ( a - this.minoffset() - this.parallelOffset() ) / this.axisToDataRatio()) );
    });

    this.hasA("currentLabeler").which.validatesWith(function (labeler) {
        return labeler===null || labeler instanceof Labeler;
    });
    this.hasA("currentLabelDensity").which.isA("number");
    this.hasA("currentLabelerIndex").which.isA("number");

    /**
     * Decides which labeler to use: take the one with the largest density <= 0.8.
     * Unless all have density > 0.8, in which case we take the first one.  This assumes
     * that the labelers list is ordered in increasing order of label density.
     * This function sets the `currentLabeler` and `currentLabelDensity` attributes.
     *
     * @method prepareRender
     * @param {Object} graphicsContext
     * @author jrfrimme
     */
    this.respondsTo("prepareRender", function (graphicsContext) {
        if (!this.hasDataMin() || !this.hasDataMax()) {
            // if either endpoint dataMin() or dataMax() hasn't been specified yet,
            // return immediately without doing anything
            return;
        }
        var currentLabeler,
            currentLabelDensity = 0,
            storedDensity = 0,
            densityThreshold = 0.8,
            labelers  = this.labelers(),
            nlabelers = labelers.size(),
            index     = this.currentLabelerIndex(),
            storedIndex;

        if (nlabelers <= 0) {
            currentLabeler = null;
        } else {
            var flag = true,
                lastLabelerIndex = labelers.size() - 1;

            if (index === undefined) {
                index = 0;
            }
            storedIndex = index;
            currentLabelDensity = labelers.at(index).getLabelDensity(graphicsContext);

            if (currentLabelDensity > densityThreshold) {
                if (index === 0) { // use labeler at position 0
                    flag = false;
                } else { // check the prior labeler
                    storedDensity = currentLabelDensity;
                    index--;
                }
            } else if (currentLabelDensity < densityThreshold) { // check the next labeler
                storedDensity = currentLabelDensity;
                if (index === lastLabelerIndex) {
                    flag = false;
                } else {
                    index++;
                }
            } else if (currentLabelDensity === densityThreshold) { // use labeler at position 0
                flag = false;
            }

            while (flag) {
                currentLabelDensity = labelers.at(index).getLabelDensity(graphicsContext);
                if (currentLabelDensity > densityThreshold) { // labeler before current one
                    if (index === 0) { // use labeler at position 0
                        break;
                    } else if (storedIndex > index) { // going backwards through labelers
                        storedIndex = index;
                        storedDensity = currentLabelDensity;
                        index--;
                    } else { // the prior labeler had density < threshold and was checking the next labeler
                        index = storedIndex;
                        currentLabelDensity = storedDensity;
                        break;
                    }
                } else if (currentLabelDensity < densityThreshold) { // this labeler or one after it
                    if (storedIndex > index) { // going backwards through labelers so prior labeler had density > threshold
                        break;
                    } else if (index === lastLabelerIndex) {
                        break;
                    } else { // check next labeler to see if it has density < threshold
                        storedIndex = index;
                        storedDensity = currentLabelDensity;
                        index++;
                    }
                } else if (currentLabelDensity === densityThreshold) {
                    break;
                }
            }
        }
        currentLabeler = labelers.at(index);

        this.currentLabeler(currentLabeler);
        this.currentLabelerIndex(index);
        this.currentLabelDensity(currentLabelDensity);
    });

    this.respondsTo("toRealValue", function (value) {
        if (typeof(value) === "number") {
            return value;
        } else if (DataValue.isInstance(value)) {
            return value.getRealValue();
        } else {
            throw new Error("unknown value type for axis value " + value);
        }
    });

    this.respondsTo("toDataValue", function (value) {
        if (typeof(value) === "number") {
            return DataValue.create(this.type(), value);
        } else if (DataValue.isInstance(value)) {
            return value;
        } else {
            throw new Error("unknown value type for axis value " + value);
        }
    });

    this.respondsTo("setDataRangeNoBind", function(min, max, dispatch) {

        // NOTE: min and max may either be plain numbers, or
        // DataValue instances.  If they're plain numbers, they
        // get converted to DataValue instances here before being
        // passed to the dataMin()/dataMax() setters below.

        var dataValueMin = this.toDataValue(min),
            dataValueMax = this.toDataValue(max);

        this.dataMin(dataValueMin);
        this.dataMax(dataValueMax);
        // if (_graph != null) { _graph.invalidateDisplayList(); }
        if (dispatch === undefined) {
            dispatch = true;
        }

        this.emit({'type' : 'dataRangeSet',
                   'min'  : dataValueMin,
                   'max'  : dataValueMax});
        /*
         if (dispatch) {
         //dispatchEvent(new AxisEvent(AxisEvent.CHANGE,min,max));  
         }
         */
    });

    this.respondsTo("setDataRange", function (min, max, dispatch) {
        if (this.binding()) {
            this.binding().setDataRange(this, min, max, dispatch);
        } else {
            this.setDataRangeNoBind(min, max, dispatch);
        }
    });

    this.respondsTo("doPan", function (pixelBase, pixelDisplacement) {
        var pan = this.pan(),
            panMin = pan.min(),
            panMax = pan.max(),
            offset,
            newRealMin,
            newRealMax;

        if (!pan.allowed()) { return; }
        offset = pixelDisplacement / this.axisToDataRatio();
        newRealMin = this.dataMin().getRealValue() - offset;
        newRealMax = this.dataMax().getRealValue() - offset;
        
        if (panMin && newRealMin < panMin.getRealValue()) {
            newRealMax += (panMin.getRealValue() - newRealMin);
            newRealMin = panMin.getRealValue();
        }
        if (panMax && newRealMax > panMax.getRealValue()) {
            newRealMin -= (newRealMax - panMax.getRealValue());
            newRealMax = panMax.getRealValue();
        }
        this.setDataRange(DataValue.create(this.type(), newRealMin),
                          DataValue.create(this.type(), newRealMax));
    });

    this.respondsTo("doZoom", function (pixelBase, pixelDisplacement) {
        var zoom = this.zoom(),
            pan  = this.pan(),
            type = this.type(),
            dataMin = this.dataMin(),
            dataMax = this.dataMax(),
            panMin  = pan.min(),
            panMax  = pan.max(),
            zoomMin = zoom.min(),
            zoomMax = zoom.max(),
            baseRealValue,
            factor,
            newMin,
            newMax,
            d;
        if (!zoom.allowed()) {
            return;
        }
        baseRealValue = this.axisValueToDataValue(pixelBase).getRealValue();
        if (DataValue.isInstance(zoom.anchor())) {
            baseRealValue = zoom.anchor().getRealValue();
        }
        factor = 10 * Math.abs(pixelDisplacement / (this.pixelLength() - this.maxoffset() - this.minoffset()));
        /*TODO: uncomment after this.reversed() has been implemented
         if (this.reversed()) { factor = -factor; }
         */
        if (pixelDisplacement <= 0) {
            newMin = DataValue.create(type,
                                      (dataMin.getRealValue() - baseRealValue) * ( 1 + factor ) + baseRealValue);
            newMax = DataValue.create(type,
                                      (dataMax.getRealValue() - baseRealValue) * ( 1 + factor ) + baseRealValue);
        } else {
            newMin = DataValue.create(type,
                                      (dataMin.getRealValue() - baseRealValue) * ( 1 - factor ) + baseRealValue);
            newMax = DataValue.create(type,
                                      (dataMax.getRealValue() - baseRealValue) * ( 1 - factor ) + baseRealValue);
        }
        if (panMin && newMin.lt(panMin)) {
            newMin = panMin;
        }
        if (panMax && newMax.gt(panMax)) {
            newMax = panMax;
        }
        
        if ((dataMin.le(dataMax) && newMin.lt(newMax)) ||
            (dataMin.ge(dataMax) && newMin.gt(newMax))) {
            if (zoomMax && (newMax.gt(newMin.add(zoomMax)))) {
                d = (newMax.getRealValue() - newMin.getRealValue() - zoomMax.getRealValue()) / 2;
                newMax = newMax.addRealValue(-d);
                newMin = newMin.addRealValue(d);
            } else if (zoomMin && (newMax.lt(newMin.add(zoomMin)))) {
                d = (zoomMin.getRealValue() - (newMax.getRealValue() - newMin.getRealValue())) / 2;
                newMax = newMax.addRealValue(d);
                newMin = newMin.addRealValue(-d);
            }
            this.setDataRange(newMin, newMax);
        }
    });

    /**
     * Compute the distance from an axis to a point.  The point
     * (x,y) is expressed in pixel coordinates in the same
     * coordinate system as the axis.
     * 
     * We use two different kinds of computations depending on
     * whether the point lies inside or outside the region bounded
     * by the two lines perpendicular to the axis through its
     * endpoints.  If the point lies inside this region, the
     * distance is simply the difference in the perpendicular
     * coordinate of the point and the perpendicular coordinate of
     * the axis.
     * 
     * If the point lies outside the region, then the distance is
     * the L2 distance between the point and the closest endpoint
     * of the axis.
     *
     * @method distanceToPoint
     * @param {} x
     * @param {} y
     * @author jrfrimme
     */
    this.respondsTo("distanceToPoint", function (x, y) {
        var perpCoord     = (this.orientation() === Axis.HORIZONTAL) ? y : x,
            parallelCoord = (this.orientation() === Axis.HORIZONTAL) ? x : y,
            parallelOffset = this.parallelOffset(),
            perpOffset     = this.perpOffset(),
            pixelLength    = this.pixelLength(),
            l2dist         = Util.l2dist;

        if (parallelCoord < parallelOffset) {
            // point is under or left of the axis; return L2 distance to bottom or left axis endpoint
            return l2dist(parallelCoord, perpCoord, parallelOffset, perpOffset);
        }
        if (parallelCoord > parallelOffset + pixelLength) {
            // point is above or right of the axis; return L2 distance to top or right axis endpoint
            return l2dist(parallelCoord, perpCoord, parallelOffset + pixelLength, perpOffset);
        }
        // point is between the axis endpoints; return difference in perpendicular coords
        return Math.abs(perpCoord - perpOffset);
    });


    this.respondsTo("normalize", function (graph) {
        var i,
            title,
            label;

        //
        // Handles title tags
        //
        if (this.title() && this.title().content() === undefined) {
            this.title().content(new Text(this.id()));
        }

        //
        // Handles missing labelers
        //
        if (this.labelers().size() === 0) {
            var defaultValues = (utilityFunctions.getDefaultValuesFromXSD()).horizontalaxis.labels,
                spacingString = this.type() === DataValue.NUMBER ?
                    defaultValues.defaultNumberSpacing :
                    defaultValues.defaultDatetimeSpacing,
                spacingStrings = spacingString.split(/\s+/);

            for (i = 0; i < spacingStrings.length; i++) {
                label = new Labeler(this);
                label.spacing(DataMeasure.parse(this.type(), spacingStrings[i]));
                this.labelers().add(label);
            }
        }

        //
        // normalizes the labelers
        //
        for (i = 0; i < this.labelers().size(); i++) {
            this.labelers().at(i).normalize();
        }

    });

    utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis, attributes);
});

Axis.HORIZONTAL = new Orientation("horizontal");
Axis.VERTICAL   = new Orientation("vertical");

Axis.Orientation = Orientation;

module.exports = Axis;
