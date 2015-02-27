var Model = require('../../lib/jermaine/src/core/model.js');

/**
 * A WebServiceDataCacheNode represents a single node in the
 * doubly-linked list holding the data for a WebServiceDataCache.
 * The WebServiceDataCacheNode has an array of data (which may
 * actually be null, if the node's data has not yet been loaded),
 * next and prev pointers to the next and previous nodes in the
 * linked list, and coveredMin and coveredMax values that indicate
 * the min and max values of the "covered" range of data for this
 * node.
 * 
 * The "covered" range is the interval of the data number line for
 * which this node is responsible for storing data; Multigraph
 * uses range this to avoid requesting the same data twice --- it
 * never requests data for a range already covered by an existing
 * cache node.
 * 
 * Initially, when the WebServiceDataCacheNode is created, the
 * limits of the covered range are specified in the constructor.
 * Later on, when the node's data is actually populated, the
 * limits are potentially adjusted outward, if the range of data
 * received is larger than the initially specified covered range.
 * So in all cases, the covered range indicates the range for
 * which no more data is needed, because it's covered by this
 * node.
 * 
 * Note that the covered range is never adjusted to be smaller.
 * 
 * The WebServiceDataCacheNode does not actually fetch any data
 * --- it is simply a storage container for fetched data; it's up
 * to other code outside of this object to fetch and populate the
 * data.
 *
 * @class WebServiceDataCacheNode
 * @for WebServiceDataCacheNode
 * @constructor
 * @param {DataValue} coveredMin
 * @param {DataValue} coveredMax
 */
var DataValue = require('./data_value.js'),
    ArrayData = require('./array_data.js');

var WebServiceDataCacheNode = Model(function () {

    /**
     * The actual data for this node.
     *
     * @property data
     * @type {Array|null}
     * @author jrfrimme
     */
    this.hasA("data").which.defaultsTo(null).and.validatesWith(function (data) {
        var ValidationFunctions = require('../util/validationFunctions.js');
        // accept null
        if (data === null) { return true; }
        // only accept arrays
        if (validationFunctions.typeOf(data) !== "array") {
            this.message = "WebServiceDataCacheNode's data attribute is not an Array";
            return false;
        }
        // if the array contains anything, do a cursory check that it looks
        // like an array of DataValue arrays (just check the first row)
        if (data.length > 0) {
            var firstRow = data[0],
                i;
            if (validationFunctions.typeOf(firstRow) !== "array") {
                this.message = "WebServiceDataCacheNode's data attribute is not an Array of Arrays";
                return false;
            }
            for (i = 0; i < firstRow.length; ++i) {
                if (!DataValue.isInstance(firstRow[i])) {
                    this.message = "WebServiceDataCacheNode's data attribute is not an Array of Arrays of DataValues (bad value in position " + i + " of first row";
                    return false;
                }
            }
        }
        return true;
    });

    /**
     * The next node in the cache's linked list
     *
     * @property next
     * @type {WebServiceDataCacheNode|null}
     * @author jrfrimme
     */
    this.hasA("next").which.defaultsTo(null).and.validatesWith(function (x) {
        return x === null || x instanceof WebServiceDataCacheNode;
    });

    /**
     * The previous node in the cache's linked list
     *
     * @property prev
     * @type {WebServiceDataCacheNode|null}
     * @author jrfrimme
     */
    this.hasA("prev").which.defaultsTo(null).and.validatesWith(function (x) {
        return x === null || x instanceof WebServiceDataCacheNode;
    });

    /**
     * The min of the covered value range
     *
     * @property coveredMin
     * @type {DataValue}
     * @author jrfrimme
     */
    this.hasA("coveredMin").which.validatesWith(DataValue.isInstance);

    /**
     * The max of the covered value range
     *
     * @property coveredMax
     * @type {DataValue}
     * @author jrfrimme
     */
    this.hasA("coveredMax").which.validatesWith(DataValue.isInstance);

    /**
     * Return the next node in the cache that actually has data,
     * or null if none exists.
     *
     * @method dataNext
     * @author jrfrimme
     * @return {WebServiceDataCacheNode|null}
     */
    this.respondsTo("dataNext", function () {
        var node = this.next();
        while (node !== null && !node.hasData()) {
            node = node.next();
        }
        return node;
    });

    /**
     * Return the previous node in the cache that actually has data,
     * or null if none exists.
     *
     * @method dataPrev
     * @author jrfrimme
     * @return {WebServiceDataCacheNode|null}
     */
    this.respondsTo("dataPrev", function () {
        var node = this.prev();
        while (node !== null && !node.hasData()) {
            node = node.prev();
        }
        return node;
    });

    /**
     * Return the minimum (column 0) data value for this node.  Returns null
     * if the node has no data yet.
     *
     * @method dataMin
     * @author jrfrimme
     * @return {DataValue|null}
     */
    this.respondsTo("dataMin", function () {
        var data = this.data();
        if (data === null) { return null; }
        if (data.length === 0) { return null; }
        if (data[0] === null) { return null; }
        if (data[0].length === 0) { return null; }
        return data[0][0];
    });

    /**
     * Return the maximum (column 0) data value for this node.    Returns null
     * if the node has no data yet.
     *
     * @method dataMax
     * @author jrfrimme
     * @return {DataValue|null}
     */
    this.respondsTo("dataMax", function() {
        var data = this.data();
        if (data === null) { return null; }
        if (data.length === 0) { return null; }
        if (data[data.length-1] === null) { return null; }
        if (data[data.length-1].length === 0) { return null; }
        return data[data.length-1][0];
    });

    /**
     * Return true if this node has data; false if not.
     *
     * @method hasData
     * @author jrfrimme
     * @return Boolean
     */
    this.respondsTo("hasData", function() {
        return this.data() !== null;
    });

    this.isBuiltWith("coveredMin", "coveredMax");

    /**
     * Populate this node's data array by parsing the values
     * contained in the 'dataText' string, which should be a
     * string of comma-separated values of the same sort expected
     * by ArrayData and CSVData.  The first argument, `columns`,
     * should be a plain javascript array of DataVariable instances,
     * of the sort returned by `Data.getColumns()`.
     * 
     * This method examines other nodes in the cache in order
     * insure that values included in this node's data array
     * are (a) strictly greater than the maximum value present in the
     * cache prior to this node, and (b) strictly less than the
     * minimum value present in the cache after this node.
     * This guarantees that there is no overlap between the
     * data in this node and other nodes in the cache.
     *
     * @method parseData
     * @param {DataVariable Attr_List} columns
     * @param {String} dataText
     * @author jrfrimme
     */
    this.respondsTo("parseData", function (columns, dataText) {
        var i, b,
            maxPrevValue = null,
            minNextValue = null,
            arrayDataArray,
            data,
            row;

        // set maxPrevValue to the max value in column0 in the cache prior to this block, if any:
        b = this.dataPrev();
        if (b !== null) {
            maxPrevValue = b.dataMax();
        }

        // set minNextValue to the min value in column0 in the cache after this block, if any:
        b = this.dataNext();
        if (b !== null) {
            minNextValue = b.dataMin();
        }

        // convert the csv dataText string to an array
        arrayDataArray = ArrayData.textToDataValuesArray(columns, dataText);

        // populate the data array by copying values from the converted array, skipping any
        // values that are already within the range covered by the rest of the cache
        data = [];
        for (i = 0; i < arrayDataArray.length; ++i) {
            row = arrayDataArray[i];
            if ((maxPrevValue === null || row[0].gt(maxPrevValue)) &&
                (minNextValue === null || row[0].lt(minNextValue))) {
                data.push( row );
            }
        }

        // if we didn't get any new values, we're done
        if (data.length === 0) {
            return;
        }
        
        // lower the coveredMin value if the actual data received is lower than the current coveredMin value
        if (data[0][0].lt(this.coveredMin())) {
            this.coveredMin(data[0][0]);
        }

        // raise the coveredMax value if the actual data received is higher than the current coveredMax value
        if (data[data.length-1][0].gt(this.coveredMax())) {
            this.coveredMax(data[data.length-1][0]);
        }

        // load the data
        this.data( data );
    });
});

module.exports = WebServiceDataCacheNode;
