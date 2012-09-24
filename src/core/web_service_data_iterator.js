window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var WebServiceDataIterator,
        WebServiceData = ns.WebServiceData,
        WebServiceDataCacheNode = ns.WebServiceDataCacheNode,
        Data = ns.Data,
        ArrayData = ns.ArrayData,
        DataValue = ns.DataValue,
        DataFormatter = ns.DataFormatter,
        typeOf = window.multigraph.utilityFunctions.typeOf;

    /**
     * An iterator for stepping through data values stored in a linked list of
     * WebServiceDataCacheNodes.  The constructor takes 5 arguments:
     * 
     * @param {Array} columnIndices:
     *     JavaScript array of the indices of the columns
     *     of data to return
     * @param {WebServiceDataCacheNode} initialNode: 
     *     Pointer to the WebServiceDataCacheNode containing the first
     *     value to iterate over
     * @param {integer} initialIndex: 
     *     Index, within initialNode, of the first value to iterate over
     * @param {WebServiceDataCacheNode} finalNode: 
     *     Pointer to the WebServiceDataCacheNode containing the last
     *     value to iterate over
     * @param {integer} finalIndex: 
     *     Index, within finalNode, of the last value to iterate over
     */
    WebServiceDataIterator = window.jermaine.Model(function () {
        var WebServiceDataIterator = this;

        this.hasA("currentNode").which.validatesWith(function(x) {
            return x instanceof ns.WebServiceDataCacheNode;
        });
        this.hasA("currentIndex").which.isA("integer");
        this.hasA("columnIndices").which.validatesWith(function(x) {
            return typeOf(x) === "array";
        });
    
        this.hasA("initialNode").which.validatesWith(function(x) {
            return x instanceof ns.WebServiceDataCacheNode;
        });
        this.hasA("finalNode").which.validatesWith(function(x) {
            return x instanceof ns.WebServiceDataCacheNode;
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
                currentNode = this.currentNode();

            if (currentNode === this.finalNode()) {
                if (currentIndex > finalIndex) { return null; }
                for (var i=0; i<columnIndices.length; ++i) {
                    vals.push(currentNode.data()[currentIndex][columnIndices[i]]);
                }
                this.currentIndex(++currentIndex);
                return vals;
            } else {
                for (var i=0; i<columnIndices.length; ++i) {
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

    ns.WebServiceDataIterator = WebServiceDataIterator;

});
