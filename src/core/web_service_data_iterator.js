var jermaine = require('../../lib/jermaine/src/jermaine.js');

/**
 * An iterator for stepping through data values stored in a linked list of
 * WebServiceDataCacheNodes.  The constructor takes 5 arguments:
 * 
 * @class WebServiceDataIterator
 * @for WebServiceDataIterator
 * @constructor
 *
 * @param {Array} columnIndices
 *     JavaScript array of the indices of the columns
 *     of data to return
 * @param {WebServiceDataCacheNode} initialNode
 *     Pointer to the WebServiceDataCacheNode containing the first
 *     value to iterate over
 * @param {integer} initialIndex
 *     Index, within initialNode, of the first value to iterate over
 * @param {WebServiceDataCacheNode} finalNode
 *     Pointer to the WebServiceDataCacheNode containing the last
 *     value to iterate over
 * @param {integer} finalIndex
 *     Index, within finalNode, of the last value to iterate over
 */
var WebServiceDataCacheNode = require('./web_service_data_cache_node.js'),
    ValidationFunctions = require('../util/validationFunctions.js');

var WebServiceDataIterator = new jermaine.Model(function () {
    var WebServiceDataIterator = this;

    this.hasA("currentNode").which.validatesWith(function(x) {
        return x instanceof WebServiceDataCacheNode;
    });
    this.hasA("currentIndex").which.isA("integer");
    this.hasA("columnIndices").which.validatesWith(function(x) {
        return ValidationFunctions.typeOf(x) === "array";
    });
    
    this.hasA("initialNode").which.validatesWith(function(x) {
        return x instanceof WebServiceDataCacheNode;
    });
    this.hasA("finalNode").which.validatesWith(function(x) {
        return x instanceof WebServiceDataCacheNode;
    });
    this.hasA("initialIndex").which.isA("integer");
    this.hasA("finalIndex").which.isA("integer");

    this.isBuiltWith("columnIndices", "initialNode", "initialIndex", "finalNode", "finalIndex", function() {
        this.currentNode(this.initialNode());
        this.currentIndex(this.initialIndex());
    });

    this.respondsTo("hasNext", function() {
        if (this.currentNode() === null || this.currentIndex() < 0) { return false; }
        if (this.currentNode() !== this.finalNode()) {
            return true;
        }
        return this.currentIndex() <= this.finalIndex();
    });

    this.respondsTo("next", function() {
        var vals = [],
            columnIndices = this.columnIndices(),
            currentIndex = this.currentIndex(),
            finalIndex = this.finalIndex(),
            currentNode = this.currentNode(),
            i;

        if (currentNode === this.finalNode()) {
            if (currentIndex > finalIndex) { return null; }
            for (i=0; i<columnIndices.length; ++i) {
                vals.push(currentNode.data()[currentIndex][columnIndices[i]]);
            }
            this.currentIndex(++currentIndex);
            return vals;
        } else {
            for (i=0; i<columnIndices.length; ++i) {
                vals.push(currentNode.data()[currentIndex][columnIndices[i]]);
            }
            this.currentIndex(++currentIndex);
            if (currentIndex >= currentNode.data().length) {
                this.currentNode(currentNode.dataNext());
                this.currentIndex(0);
            }
            return vals;
        }
    });

});

module.exports = WebServiceDataIterator;
